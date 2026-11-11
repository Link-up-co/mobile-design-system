"use client";

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import clsx from "clsx";

export type TabItem = {
  key: string;
  label: string;
  /** 우측 보조 수량 표시 (예: 리뷰 128) */
  count?: number;
  disabled?: boolean;
};

export type TabsProps = {
  items: readonly TabItem[];
  activeKey?: string;
  defaultActiveKey?: string;
  onActiveChange?: (key: string) => void;
  /** `"scrollable"`: 가로 스크롤 + 선택 탭 자동 중앙 정렬(기본) · `"fixed"`: N등분 풀폭 균등 배치 */
  variant?: "scrollable" | "fixed";
  /** 모바일 좌우 여백 풀폭 확장(`-mx-5 px-5`) 여부 (기본 `false`) */
  bleed?: boolean;
  ariaLabel?: string;
  className?: string;
};

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * 범용 플랫 언더라인 탭 바 (`1px border-b` + 선택 탭 중앙 자동 정렬 + `2px bg-primary` 슬라이딩 바).
 */
export function Tabs({
  items,
  activeKey: controlledKey,
  defaultActiveKey,
  onActiveChange,
  variant = "scrollable",
  bleed = false,
  ariaLabel = "탭 메뉴",
  className,
}: TabsProps) {
  const baseId = useId();
  const [innerKey, setInnerKey] = useState<string>(
    () => controlledKey ?? defaultActiveKey ?? items[0]?.key ?? ""
  );
  const currentKey = controlledKey !== undefined ? controlledKey : innerKey;
  const rawIdx = items.findIndex((it) => it.key === currentKey);
  const activeIdx = rawIdx >= 0 ? rawIdx : 0;

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);

  const syncTabPosition = useCallback(
    (idx: number, smooth: boolean) => {
      const scroller = scrollerRef.current;
      const btn = tabRefs.current[idx];
      if (!scroller || !btn) return;

      setIndicator({
        left: btn.offsetLeft,
        width: btn.offsetWidth,
      });

      if (variant === "scrollable") {
        const targetScroll =
          btn.offsetLeft - scroller.clientWidth / 2 + btn.offsetWidth / 2;
        const maxScroll = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
        const clamped = Math.max(0, Math.min(maxScroll, targetScroll));

        if (typeof scroller.scrollTo === "function") {
          scroller.scrollTo({
            left: clamped,
            behavior: smooth ? "smooth" : "auto",
          });
        } else {
          scroller.scrollLeft = clamped;
        }
      }
    },
    [variant]
  );

  const mountedRef = useRef(false);
  useIsoLayoutEffect(() => {
    syncTabPosition(activeIdx, mountedRef.current);
    mountedRef.current = true;
  }, [activeIdx, items.length, syncTabPosition]);

  useEffect(() => {
    const onResize = () => syncTabPosition(activeIdx, false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeIdx, syncTabPosition]);

  if (items.length === 0) return null;

  function selectAt(idx: number) {
    const item = items[idx];
    if (!item || item.disabled) return;
    if (controlledKey === undefined) {
      setInnerKey(item.key);
    }
    if (item.key !== currentKey) {
      onActiveChange?.(item.key);
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      for (let step = 1; step <= items.length; step++) {
        const next = (activeIdx + step) % items.length;
        if (!items[next]?.disabled) {
          selectAt(next);
          tabRefs.current[next]?.focus();
          break;
        }
      }
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      for (let step = 1; step <= items.length; step++) {
        const prev = (activeIdx - step + items.length) % items.length;
        if (!items[prev]?.disabled) {
          selectAt(prev);
          tabRefs.current[prev]?.focus();
          break;
        }
      }
    }
  }

  return (
    <div
      ref={scrollerRef}
      role="tablist"
      aria-label={ariaLabel}
      onKeyDown={handleKeyDown}
      className={clsx(
        "subtle-scrollbar relative border-b border-line bg-surface",
        variant === "scrollable" ? "overflow-x-auto" : "overflow-hidden",
        bleed && "-mx-5 px-5",
        className
      )}
    >
      <div
        style={
          variant === "fixed"
            ? { gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }
            : undefined
        }
        className={clsx(
          "relative",
          variant === "fixed" ? "grid w-full" : "flex min-w-max items-center gap-5"
        )}
      >
        {items.map((item, idx) => {
          const selected = idx === activeIdx;
          return (
            <button
              key={item.key}
              ref={(el) => {
                tabRefs.current[idx] = el;
              }}
              id={`${baseId}-tab-${item.key}`}
              type="button"
              role="tab"
              disabled={item.disabled}
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => selectAt(idx)}
              className={clsx(
                "pressable relative inline-flex h-11 shrink-0 cursor-pointer select-none items-center justify-center gap-1 text-body transition-colors outline-transparent disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary",
                variant === "scrollable" && "px-0.5",
                selected
                  ? "font-bold text-ink"
                  : "font-medium text-ink-muted hover:text-ink-secondary"
              )}
            >
              <span>{item.label}</span>
              {item.count !== undefined && (
                <span
                  className={clsx(
                    "text-caption tabular-nums",
                    selected ? "font-bold text-primary" : "font-medium text-ink-muted"
                  )}
                >
                  {item.count}
                </span>
              )}
              {!indicator && selected && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-primary"
                />
              )}
            </button>
          );
        })}

        {indicator && (
          <span
            aria-hidden="true"
            data-tab-indicator=""
            style={{
              width: `${indicator.width}px`,
              transform: `translate3d(${indicator.left}px, 0, 0)`,
            }}
            className="pointer-events-none absolute bottom-0 left-0 h-[2px] bg-primary transition-[transform,width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none!"
          />
        )}
      </div>
    </div>
  );
}

export type SwipeTabPanel = TabItem & {
  content: ReactNode;
};

export type SwipeTabsProps = {
  tabs: readonly SwipeTabPanel[];
  activeKey?: string;
  defaultActiveKey?: string;
  onActiveChange?: (key: string) => void;
  variant?: "scrollable" | "fixed";
  bleed?: boolean;
  ariaLabel?: string;
  className?: string;
};

/**
 * 플랫 언더라인 탭 바 + 본문 좌우 슬라이드 스와이프 전환이 결합된 `SwipeTabs`.
 */
export function SwipeTabs({
  tabs,
  activeKey: controlledKey,
  defaultActiveKey,
  onActiveChange,
  variant = "fixed",
  bleed = false,
  ariaLabel = "슬라이드 탭 메뉴",
  className,
}: SwipeTabsProps) {
  const count = tabs.length;
  const [innerKey, setInnerKey] = useState<string>(
    () => controlledKey ?? defaultActiveKey ?? tabs[0]?.key ?? ""
  );
  const currentKey = controlledKey !== undefined ? controlledKey : innerKey;
  const rawIdx = tabs.findIndex((t) => t.key === currentKey);
  const activeIdx = rawIdx >= 0 ? rawIdx : 0;

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [dragOffsetPx, setDragOffsetPx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const dragRef = useRef<{
    active: boolean;
    pointerId: number;
    startX: number;
    startY: number;
    startTime: number;
    width: number;
    lockedAxis: "x" | "y" | null;
    deltaX: number;
  }>({
    active: false,
    pointerId: -1,
    startX: 0,
    startY: 0,
    startTime: 0,
    width: 1,
    lockedAxis: null,
    deltaX: 0,
  });

  if (count === 0) return null;

  function selectIndex(idx: number) {
    const clamped = Math.max(0, Math.min(count - 1, idx));
    const target = tabs[clamped];
    if (!target || target.disabled) return;
    if (controlledKey === undefined) {
      setInnerKey(target.key);
    }
    if (target.key !== currentKey) {
      onActiveChange?.(target.key);
    }
  }

  function handlePointerDown(e: PointerEvent<HTMLDivElement>) {
    if (count <= 1) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const width = viewportRef.current?.clientWidth || 1;
    dragRef.current = {
      active: true,
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      startTime: Date.now(),
      width,
      lockedAxis: null,
      deltaX: 0,
    };
  }

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    const st = dragRef.current;
    if (!st.active || st.pointerId !== e.pointerId) return;

    const dx = e.clientX - st.startX;
    const dy = e.clientY - st.startY;

    if (!st.lockedAxis) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      if (Math.abs(dx) > Math.abs(dy) * 1.15) {
        st.lockedAxis = "x";
        setIsDragging(true);
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {
          // ignore synthetic events
        }
      } else {
        st.lockedAxis = "y";
        st.active = false;
        return;
      }
    }

    if (st.lockedAxis === "x") {
      const atEdge =
        (activeIdx === 0 && dx > 0) || (activeIdx === count - 1 && dx < 0);
      const damped = atEdge ? dx * 0.28 : dx;
      st.deltaX = damped;
      setDragOffsetPx(damped);
    }
  }

  function finishDrag(e: PointerEvent<HTMLDivElement>) {
    const st = dragRef.current;
    if (!st.active || st.pointerId !== e.pointerId) return;
    st.active = false;

    if (st.lockedAxis === "x") {
      try {
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
      } catch {
        // ignore
      }

      const elapsed = Math.max(1, Date.now() - st.startTime);
      const velocity = Math.abs(st.deltaX) / elapsed;
      const threshold = st.width * 0.18;

      setIsDragging(false);
      setDragOffsetPx(0);

      if (st.deltaX <= -threshold || (st.deltaX < -24 && velocity > 0.35)) {
        selectIndex(activeIdx + 1);
      } else if (st.deltaX >= threshold || (st.deltaX > 24 && velocity > 0.35)) {
        selectIndex(activeIdx - 1);
      }
    }
  }

  const translateExpr =
    dragOffsetPx !== 0
      ? `translate3d(calc(${-activeIdx * 100}% + ${dragOffsetPx}px), 0, 0)`
      : `translate3d(${-activeIdx * 100}%, 0, 0)`;

  return (
    <div className={clsx("w-full", className)}>
      <Tabs
        items={tabs}
        activeKey={currentKey}
        onActiveChange={(key) => {
          const idx = tabs.findIndex((t) => t.key === key);
          if (idx >= 0) selectIndex(idx);
        }}
        variant={variant}
        bleed={bleed}
        ariaLabel={ariaLabel}
      />

      <div
        ref={viewportRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        style={{ touchAction: "pan-y" }}
        className={clsx("overflow-hidden select-none", bleed && "-mx-5")}
      >
        <div
          style={{ transform: translateExpr }}
          className={clsx(
            "flex w-full will-change-transform",
            !isDragging &&
              "transition-transform duration-360 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none!"
          )}
        >
          {tabs.map((tab, idx) => (
            <div
              key={tab.key}
              role="tabpanel"
              aria-hidden={!idx ? undefined : idx !== activeIdx || undefined}
              className={clsx("w-full shrink-0", bleed && "px-5")}
            >
              {tab.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
