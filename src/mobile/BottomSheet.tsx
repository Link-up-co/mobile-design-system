"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import clsx from "clsx";
import { CloseIcon } from "./icons";

export type BottomSheetProps = {
  open: boolean;
  onClose: () => void;
  /** 상단 타이틀 (생략하면 타이틀 없는 시트) */
  title?: ReactNode;
  /** 상단 우측 닫기(×) 버튼 노출 여부 (기본 true) */
  showClose?: boolean;
  /** 하단 고정 액션 버튼 영역 (생략하면 하단 버튼 없는 시트) */
  footer?: ReactNode;
  /** title이 없을 때 스크린리더용 라벨 */
  "aria-label"?: string;
  children: ReactNode;
  className?: string;
};

const EXIT_MS = 360;

/**
 * 모바일 바텀시트 (`rounded-t-sheet` 20px).
 * - 배경 디밍이 서서히 어두워지고(420ms), 시트 본체가 아래에서 부드럽게 올라옴(440ms)
 * - 닫힐 때도 배경과 시트가 동시에 천천히 내려간 뒤(340ms) 언마운트됨
 * - `title` 유/무 × `showClose` 유/무 × `footer` 유/무 조합 모두 지원
 */
export function BottomSheet({
  open,
  onClose,
  title,
  showClose = true,
  footer,
  "aria-label": ariaLabel,
  children,
  className,
}: BottomSheetProps) {
  const [rendered, setRendered] = useState(open);
  const titleId = useId();

  if (open && !rendered) {
    setRendered(true);
  }

  const closing = !open && rendered;

  useEffect(() => {
    if (!closing) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const timer = setTimeout(() => setRendered(false), reduced ? 0 : EXIT_MS);
    return () => clearTimeout(timer);
  }, [closing]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open && !rendered) return null;

  const hasTitle = title !== undefined && title !== null && title !== "";
  const hasHeader = hasTitle || showClose;
  const hasFooter = footer !== undefined && footer !== null && footer !== false;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* 서서히 어두워지는 디밍 배경 */}
      <div
        aria-hidden="true"
        data-sheet-backdrop=""
        onClick={onClose}
        style={{
          animation: closing
            ? `mds-backdrop-out ${EXIT_MS}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`
            : "mds-backdrop-in 480ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
        }}
        className="absolute inset-0 bg-black/50 motion-reduce:animate-none!"
      />

      {/* 아래에서 천천히 올라오는 컨텐츠 패널 */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={hasTitle ? titleId : undefined}
        aria-label={hasTitle ? undefined : (ariaLabel ?? "바텀시트")}
        data-sheet-panel=""
        style={{
          animation: closing
            ? `mds-sheet-out ${EXIT_MS}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`
            : "mds-sheet-in 480ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
        }}
        className={clsx(
          "relative z-10 flex w-full max-w-[412px] flex-col overflow-hidden rounded-t-sheet bg-surface text-ink shadow-2xl motion-reduce:animate-none!",
          className
        )}
      >
        {hasHeader && (
          <div
            data-sheet-header=""
            className={clsx(
              "flex items-center gap-3 px-5",
              hasTitle ? "pt-5 pb-3" : "justify-end pt-3.5 pb-1"
            )}
          >
            {hasTitle && (
              <h2 id={titleId} className="min-w-0 flex-1 truncate text-title font-bold text-ink">
                {title}
              </h2>
            )}
            {showClose && (
              <button
                type="button"
                aria-label="닫기"
                onClick={onClose}
                className="pressable -mr-1.5 inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-control text-ink-muted outline-transparent hover:bg-canvas hover:text-ink focus-visible:outline-2 focus-visible:outline-primary"
              >
                <CloseIcon className="size-5" />
              </button>
            )}
          </div>
        )}

        <div
          data-sheet-body=""
          className={clsx(
            "subtle-scrollbar max-h-[72dvh] overflow-y-auto px-5",
            !hasHeader && "pt-4",
            hasFooter
              ? "pb-4"
              : "pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))]"
          )}
        >
          {children}
        </div>

        {hasFooter && (
          <div
            data-sheet-footer=""
            className="border-t border-line bg-surface px-5 pt-3 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]"
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
