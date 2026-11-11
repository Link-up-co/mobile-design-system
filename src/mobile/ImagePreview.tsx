"use client";

import {
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
} from "react";
import clsx from "clsx";
import { CloseIcon } from "./icons";

export type PreviewImageSource =
  | string
  | {
      src: string;
      alt?: string;
      caption?: ReactNode;
    };

export type ImagePreviewProps = {
  open: boolean;
  onClose: () => void;
  images: readonly PreviewImageSource[];
  /** 열릴 때 초기 표시할 인덱스 (기본 `0`) */
  initialIndex?: number;
  activeIndex?: number;
  onIndexChange?: (index: number) => void;
  /** 우측 하단/하단 커스텀 액션 영역 (예: 이미지 삭제 버튼) */
  footerAction?: (index: number) => ReactNode;
  className?: string;
};

const EXIT_MS = 220;

function normalizePreviewItem(item: PreviewImageSource, idx: number) {
  if (typeof item === "string") {
    return { src: item, alt: `이미지 ${idx + 1}`, caption: undefined };
  }
  return {
    src: item.src,
    alt: item.alt ?? `이미지 ${idx + 1}`,
    caption: item.caption,
  };
}

/**
 * 모바일 풀스크린 이미지 미리보기 뷰어 (`ImagePreview`).
 * - 다중 이미지 좌우 스와이프 슬라이드(`translate3d`) + `1 / N` 카운터
 * - 더블탭(또는 더블클릭) `2.2x` 확대/복귀 및 확대 상태 팬(드래그 이동) 지원
 */
export function ImagePreview({
  open,
  onClose,
  images,
  initialIndex = 0,
  activeIndex: controlledIndex,
  onIndexChange,
  footerAction,
  className,
}: ImagePreviewProps) {
  const count = images.length;
  const [rendered, setRendered] = useState(open);
  const [innerIdx, setInnerIdx] = useState(() =>
    Math.max(0, Math.min(Math.max(0, count - 1), initialIndex))
  );

  // 열릴 때 initialIndex 동기화
  const prevOpenRef = useRef(open);
  if (open && !prevOpenRef.current) {
    const clampedInit = Math.max(0, Math.min(Math.max(0, count - 1), initialIndex));
    if (controlledIndex === undefined && innerIdx !== clampedInit) {
      setInnerIdx(clampedInit);
    }
  }
  prevOpenRef.current = open;

  if (open && !rendered) {
    setRendered(true);
  }

  const closing = !open && rendered;
  const rawIdx = controlledIndex !== undefined ? controlledIndex : innerIdx;
  const currentIdx = Math.max(0, Math.min(Math.max(0, count - 1), rawIdx));

  const [zoomed, setZoomed] = useState(false);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const lastTapRef = useRef<number>(0);
  const gestureRef = useRef<{
    active: boolean;
    pointerId: number;
    startX: number;
    startY: number;
    basePanX: number;
    basePanY: number;
    startTime: number;
    width: number;
    moved: boolean;
  }>({
    active: false,
    pointerId: -1,
    startX: 0,
    startY: 0,
    basePanX: 0,
    basePanY: 0,
    startTime: 0,
    width: 1,
    moved: false,
  });

  useEffect(() => {
    if (!closing) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const timer = setTimeout(() => {
      setRendered(false);
      setZoomed(false);
      setPan({ x: 0, y: 0 });
    }, reduced ? 0 : EXIT_MS);
    return () => clearTimeout(timer);
  }, [closing]);

  function goTo(next: number) {
    const clamped = Math.max(0, Math.min(count - 1, next));
    setZoomed(false);
    setPan({ x: 0, y: 0 });
    if (controlledIndex === undefined) setInnerIdx(clamped);
    if (clamped !== currentIdx) onIndexChange?.(clamped);
  }

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight" && count > 1) goTo(currentIdx + 1);
      else if (e.key === "ArrowLeft" && count > 1) goTo(currentIdx - 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, count, currentIdx, onClose]);

  if ((!open && !rendered) || count === 0) return null;

  function toggleZoom() {
    if (zoomed) {
      setZoomed(false);
      setPan({ x: 0, y: 0 });
    } else {
      setZoomed(true);
      setPan({ x: 0, y: 0 });
    }
  }

  function handlePointerDown(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const width = viewportRef.current?.clientWidth || 1;
    gestureRef.current = {
      active: true,
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      basePanX: pan.x,
      basePanY: pan.y,
      startTime: Date.now(),
      width,
      moved: false,
    };
    setDragging(true);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore synthetic events
    }
  }

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    const g = gestureRef.current;
    if (!g.active || g.pointerId !== e.pointerId) return;
    const dx = e.clientX - g.startX;
    const dy = e.clientY - g.startY;
    if (Math.hypot(dx, dy) > 6) g.moved = true;

    if (zoomed) {
      const limitX = g.width * 0.55;
      const limitY = 260;
      setPan({
        x: Math.max(-limitX, Math.min(limitX, g.basePanX + dx)),
        y: Math.max(-limitY, Math.min(limitY, g.basePanY + dy)),
      });
    } else if (count > 1) {
      const atEdge =
        (currentIdx === 0 && dx > 0) || (currentIdx === count - 1 && dx < 0);
      setDragX(atEdge ? dx * 0.28 : dx);
    }
  }

  function handlePointerUp(e: PointerEvent<HTMLDivElement>) {
    const g = gestureRef.current;
    if (!g.active || g.pointerId !== e.pointerId) return;
    g.active = false;
    setDragging(false);

    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // ignore
    }

    if (!g.moved) {
      const now = Date.now();
      if (now - lastTapRef.current < 280) {
        lastTapRef.current = 0;
        toggleZoom();
      } else {
        lastTapRef.current = now;
      }
      setDragX(0);
      return;
    }

    if (!zoomed && count > 1) {
      const dx = e.clientX - g.startX;
      const elapsed = Math.max(1, Date.now() - g.startTime);
      const velocity = Math.abs(dx) / elapsed;
      const threshold = g.width * 0.18;
      setDragX(0);

      if (dx <= -threshold || (dx < -24 && velocity > 0.35)) {
        goTo(currentIdx + 1);
      } else if (dx >= threshold || (dx > 24 && velocity > 0.35)) {
        goTo(currentIdx - 1);
      }
    }
  }

  const activeItem = normalizePreviewItem(images[currentIdx], currentIdx);
  const trackTransform =
    dragX !== 0
      ? `translate3d(calc(${-currentIdx * 100}% + ${dragX}px), 0, 0)`
      : `translate3d(${-currentIdx * 100}%, 0, 0)`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="이미지 미리보기"
      data-image-preview=""
      style={{
        animation: closing
          ? `mds-backdrop-out ${EXIT_MS}ms ease-out forwards`
          : "mds-backdrop-in 240ms ease-out forwards",
      }}
      className={clsx(
        "fixed inset-0 z-50 flex flex-col bg-black/94 text-white select-none motion-reduce:animate-none!",
        className
      )}
    >
      {/* 상단 카운터 & 닫기 헤더 */}
      <div className="relative z-20 mx-auto flex h-14 w-full max-w-[412px] shrink-0 items-center justify-between px-4 pt-[env(safe-area-inset-top,0px)]">
        <span
          data-preview-counter=""
          className="text-body-sm font-semibold tabular-nums text-white/90"
        >
          {currentIdx + 1} / {count}
        </span>

        <button
          type="button"
          aria-label="미리보기 닫기"
          onClick={onClose}
          className="pressable -mr-1 inline-flex size-10 cursor-pointer items-center justify-center rounded-full text-white/90 outline-transparent hover:bg-white/12 focus-visible:outline-2 focus-visible:outline-white"
        >
          <CloseIcon />
        </button>
      </div>

      {/* 중앙 스와이프·줌 뷰포트 */}
      <div
        ref={viewportRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ touchAction: "none" }}
        className="relative mx-auto flex min-h-0 w-full max-w-[412px] flex-1 items-center overflow-hidden"
      >
        <div
          style={{ transform: trackTransform }}
          className={clsx(
            "flex h-full w-full items-center will-change-transform",
            !dragging &&
              "transition-transform duration-320 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none!"
          )}
        >
          {images.map((raw, idx) => {
            const item = normalizePreviewItem(raw, idx);
            const isCurrent = idx === currentIdx;
            const imgTransform =
              isCurrent && zoomed
                ? `translate3d(${pan.x}px, ${pan.y}px, 0) scale(2.2)`
                : "translate3d(0, 0, 0) scale(1)";

            return (
              <div
                key={`${item.src}-${idx}`}
                className="flex size-full shrink-0 items-center justify-center p-2"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  draggable={false}
                  style={{ transform: imgTransform }}
                  className={clsx(
                    "max-h-full max-w-full object-contain will-change-transform",
                    !dragging && "transition-transform duration-240 ease-out"
                  )}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* 하단 캡션 / 액션 바 */}
      {(activeItem.caption || footerAction) && (
        <div className="relative z-20 mx-auto flex w-full max-w-[412px] shrink-0 items-center justify-between gap-3 px-5 pt-2 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))]">
          <div className="min-w-0 flex-1 break-keep text-body-sm text-white/85">
            {activeItem.caption}
          </div>
          {footerAction && <div className="shrink-0">{footerAction(currentIdx)}</div>}
        </div>
      )}
    </div>
  );
}
