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
import { formatCurrency } from "../tokens";
import { computeDiscountRate } from "./ProductCard";
import { Text } from "./Text";
import { CartIcon } from "./icons";

export type RankingProductItem = {
  id: string;
  /** 순위 번호 (미지정 시 배열 순서 기준 `1, 2, 3...` 자동 부여) */
  rank?: number;
  /** 순위 변동 (`양수`: 상승 ▲N, `음수`: 하락 ▼N, `"NEW"`: 신규 진입, `0`/`undefined`: 변동 미표시) */
  rankChange?: number | "NEW";
  name: string;
  /** 용량·도수·주종 등 짧은 보조 정보 */
  subtitle?: string;
  /** 판매량 지표 문구 (예: `"주간 840병 판매"`) */
  salesLabel?: string;
  price: number;
  originalPrice?: number;
  imageSrc?: string;
  imageAlt?: string;
  thumbnail?: ReactNode;
  href?: string;
  onClick?: () => void;
  soldOut?: boolean;
  onCartClick?: () => void;
};

export type RankingCategoryTab = {
  key: string;
  label: string;
  items: readonly RankingProductItem[];
  /** 카테고리별 전체보기 링크/핸들러가 다를 때 선택 지정 */
  moreHref?: string;
  onMoreClick?: () => void;
};

export type CategoryRankingProps = {
  /** 섹션 상단 타이틀 (생략 시 탭 바부터 바로 시작) */
  title?: ReactNode;
  /** 섹션 상단 보조 서브타이틀 */
  subtitle?: ReactNode;
  /** 카테고리 탭 및 각 탭의 순위 상품 목록 */
  categories: readonly RankingCategoryTab[];
  /** 제어형 활성 카테고리 key */
  activeKey?: string;
  defaultActiveKey?: string;
  onActiveChange?: (key: string, index: number) => void;
  /** 공통 우측 전체보기 링크 */
  moreHref?: string;
  onMoreClick?: () => void;
  moreLabel?: string;
  /** 부모 좌우 패딩(`px-5`) 바깥까지 풀폭 플랫 레이아웃으로 확장할지 여부 (기본 `true`) */
  bleed?: boolean;
  className?: string;
};

export function resolveCategoryIndex(
  categories: readonly { key: string }[],
  targetKey?: string
): number {
  if (categories.length === 0 || !targetKey) return 0;
  const idx = categories.findIndex((c) => c.key === targetKey);
  return idx >= 0 ? idx : 0;
}

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

function ChevronRightSmall() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5 shrink-0">
      <path
        d="M6 3.5L10.5 8 6 12.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RankBadge({
  rank,
  rankChange,
}: {
  rank: number;
  rankChange?: number | "NEW";
}) {
  const isTop3 = rank <= 3;
  return (
    <div className="flex w-7 shrink-0 flex-col items-center justify-center pt-0.5 text-center">
      <span
        className={clsx(
          "text-section leading-none font-extrabold tabular-nums",
          isTop3 ? "text-primary" : "text-ink"
        )}
      >
        {rank}
      </span>
      {rankChange === "NEW" ? (
        <span className="mt-1 text-[10px] leading-none font-bold tracking-tight text-danger">
          NEW
        </span>
      ) : typeof rankChange === "number" && rankChange !== 0 ? (
        <span
          aria-label={
            rankChange > 0
              ? `${rankChange}단계 상승`
              : `${Math.abs(rankChange)}단계 하락`
          }
          className={clsx(
            "mt-1 text-[10px] leading-none font-semibold tabular-nums",
            rankChange > 0 ? "text-danger" : "text-ink-muted"
          )}
        >
          {rankChange > 0 ? `▲${rankChange}` : `▼${Math.abs(rankChange)}`}
        </span>
      ) : (
        <span aria-hidden="true" className="mt-1 text-[10px] leading-none text-ink-muted/60">
          -
        </span>
      )}
    </div>
  );
}

function RankingRow({
  item,
  fallbackRank,
}: {
  item: RankingProductItem;
  fallbackRank: number;
}) {
  const rank = item.rank ?? fallbackRank;
  const discount = computeDiscountRate(item.price, item.originalPrice);

  const media = item.imageSrc ? (
    <img
      src={item.imageSrc}
      alt={item.imageAlt ?? item.name}
      loading="lazy"
      draggable={false}
      className="pointer-events-none size-full object-cover select-none transition-transform duration-300 ease-out group-hover:scale-[1.03]"
    />
  ) : (
    item.thumbnail ?? <div className="size-full bg-canvas" />
  );

  const titleNode = item.href ? (
    <a
      href={item.href}
      draggable={false}
      onClick={item.onClick}
      className="ranking-link line-clamp-2 text-body-sm leading-[1.38] font-medium text-ink outline-transparent after:absolute after:inset-0 focus-visible:underline"
    >
      {item.name}
    </a>
  ) : item.onClick ? (
    <button
      type="button"
      onClick={item.onClick}
      className="ranking-link line-clamp-2 cursor-pointer text-left text-body-sm leading-[1.38] font-medium text-ink outline-transparent after:absolute after:inset-0 focus-visible:underline"
    >
      {item.name}
    </button>
  ) : (
    <span className="line-clamp-2 text-body-sm leading-[1.38] font-medium text-ink">
      {item.name}
    </span>
  );

  const subMeta = [item.subtitle, item.salesLabel].filter(Boolean).join(" · ");

  return (
    <article className="group relative flex w-full items-center gap-3 px-5 py-3.5 transition-colors duration-150 ease-out has-[.ranking-link:active]:bg-canvas/70">
      <RankBadge rank={rank} rankChange={item.rankChange} />

      <div className="relative size-[72px] shrink-0 overflow-hidden rounded-control bg-canvas/70 transition-[scale] duration-135 ease-out group-has-[.ranking-link:active]:scale-[0.97] motion-reduce:transition-none">
        {media}
        {item.soldOut && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/45">
            <span className="rounded-full bg-black/75 px-2 py-0.5 text-[11px] font-semibold text-white">
              일시품절
            </span>
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-1.5">
        <div className="min-w-0 space-y-0.5">
          {subMeta && <p className="truncate text-caption text-ink-muted">{subMeta}</p>}
          {titleNode}
        </div>

        <div className="flex items-baseline gap-1.5">
          {discount > 0 && (
            <span className="text-body font-bold tabular-nums text-danger">{discount}%</span>
          )}
          <span
            className={clsx(
              "text-body font-bold tabular-nums",
              item.soldOut ? "text-ink-muted" : "text-ink"
            )}
          >
            {formatCurrency(item.price)}
          </span>
          {discount > 0 && item.originalPrice && (
            <span className="text-caption tabular-nums text-ink-muted line-through">
              {formatCurrency(item.originalPrice)}
            </span>
          )}
        </div>
      </div>

      {item.onCartClick && (
        <button
          type="button"
          data-ranking-action=""
          aria-label={`${item.name} 장바구니 담기`}
          disabled={item.soldOut}
          onClick={item.onCartClick}
          className="pressable relative z-10 inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-line bg-surface text-ink outline-transparent hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          <CartIcon className="size-[18px]" />
        </button>
      )}
    </article>
  );
}

/**
 * 카테고리별 판매량 순위 탭 슬라이드 컴포넌트.
 * - 1px 구분선 기반 풀폭 플랫 탭 바 + 선택된 탭 자동 중앙 정렬 + 언더라인 슬라이드
 * - 본문 좌우 터치/포인터 드래그 슬라이드로 카테고리 간 매끄러운 페이징 전환
 */
export function CategoryRanking({
  title,
  subtitle,
  categories,
  activeKey: controlledKey,
  defaultActiveKey,
  onActiveChange,
  moreHref,
  onMoreClick,
  moreLabel = "전체보기",
  bleed = true,
  className,
}: CategoryRankingProps) {
  const baseId = useId();
  const count = categories.length;

  const [innerIndex, setInnerIndex] = useState(() =>
    resolveCategoryIndex(categories, controlledKey ?? defaultActiveKey)
  );
  const activeIndex =
    controlledKey !== undefined
      ? resolveCategoryIndex(categories, controlledKey)
      : Math.min(innerIndex, Math.max(0, count - 1));

  const [dragOffsetPx, setDragOffsetPx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number } | null>(
    null
  );

  const tabBarRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const suppressClickRef = useRef(false);
  const mountedRef = useRef(false);

  const dragStateRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    startTime: number;
    width: number;
    lockedAxis: "x" | "y" | null;
  } | null>(null);

  const selectIndex = useCallback(
    (nextIdx: number) => {
      if (nextIdx < 0 || nextIdx >= count) return;
      if (controlledKey === undefined) {
        setInnerIndex(nextIdx);
      }
      if (nextIdx !== activeIndex) {
        onActiveChange?.(categories[nextIdx].key, nextIdx);
      }
    },
    [activeIndex, categories, controlledKey, count, onActiveChange]
  );

  // 선택된 탭 언더라인 측정 + 탭 바 중앙 정렬 스크롤
  const syncTabPosition = useCallback((smooth: boolean) => {
    const bar = tabBarRef.current;
    const btn = tabRefs.current[activeIndex];
    if (!bar || !btn) return;

    setIndicatorStyle({
      left: btn.offsetLeft,
      width: btn.offsetWidth,
    });

    const targetScrollLeft = Math.max(
      0,
      btn.offsetLeft + btn.offsetWidth / 2 - bar.clientWidth / 2
    );
    if (typeof bar.scrollTo === "function") {
      bar.scrollTo({
        left: targetScrollLeft,
        behavior: smooth ? "smooth" : "auto",
      });
    } else {
      bar.scrollLeft = targetScrollLeft;
    }
  }, [activeIndex]);

  useIsoLayoutEffect(() => {
    const isInitial = !mountedRef.current;
    mountedRef.current = true;
    syncTabPosition(!isInitial);
  }, [syncTabPosition]);

  useEffect(() => {
    const onResize = () => syncTabPosition(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [syncTabPosition]);

  function handleTabKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (count <= 1) return;
    let next = activeIndex;
    if (e.key === "ArrowRight") next = (activeIndex + 1) % count;
    else if (e.key === "ArrowLeft") next = (activeIndex - 1 + count) % count;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = count - 1;
    else return;

    e.preventDefault();
    selectIndex(next);
    tabRefs.current[next]?.focus();
  }

  function handlePointerDown(e: PointerEvent<HTMLDivElement>) {
    if (count <= 1) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    if ((e.target as HTMLElement).closest("[data-ranking-action]")) return;

    suppressClickRef.current = false;
    dragStateRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      startTime: performance.now(),
      width: viewportRef.current?.clientWidth || 1,
      lockedAxis: null,
    };
  }

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    const st = dragStateRef.current;
    if (!st || st.pointerId !== e.pointerId) return;

    const dx = e.clientX - st.startX;
    const dy = e.clientY - st.startY;

    if (!st.lockedAxis) {
      if (Math.abs(dx) < 7 && Math.abs(dy) < 7) return;
      st.lockedAxis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      if (st.lockedAxis === "x") {
        setDragging(true);
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {
          // ignore
        }
      }
    }

    if (st.lockedAxis !== "x") return;
    if (Math.abs(dx) > 8) {
      suppressClickRef.current = true;
    }

    // 양 끝 경계에서는 저항감(rubber-band 0.32x) 부여
    const atStart = activeIndex === 0 && dx > 0;
    const atEnd = activeIndex === count - 1 && dx < 0;
    setDragOffsetPx(atStart || atEnd ? dx * 0.32 : dx);
  }

  function finishDrag(e: PointerEvent<HTMLDivElement>, cancelled: boolean) {
    const st = dragStateRef.current;
    if (!st || st.pointerId !== e.pointerId) return;
    dragStateRef.current = null;

    if (st.lockedAxis !== "x") {
      setDragging(false);
      setDragOffsetPx(0);
      return;
    }

    const dx = cancelled ? 0 : e.clientX - st.startX;
    const elapsed = Math.max(1, performance.now() - st.startTime);
    const velocity = dx / elapsed;

    setDragging(false);
    setDragOffsetPx(0);

    const threshold = st.width * 0.18;
    if ((dx <= -threshold || velocity < -0.35) && activeIndex < count - 1) {
      selectIndex(activeIndex + 1);
    } else if ((dx >= threshold || velocity > 0.35) && activeIndex > 0) {
      selectIndex(activeIndex - 1);
    }
  }

  if (count === 0) return null;

  const activeCategory = categories[activeIndex];
  const resolvedMoreHref = activeCategory.moreHref ?? moreHref;
  const resolvedMoreClick = activeCategory.onMoreClick ?? onMoreClick;
  const showHeader = Boolean(title || subtitle || resolvedMoreHref || resolvedMoreClick);

  const moreClassName =
    "pressable inline-flex shrink-0 cursor-pointer items-center gap-0.5 rounded-control py-1 pl-2 pr-1 text-body-sm font-medium text-ink-secondary outline-transparent hover:text-ink focus-visible:outline-2 focus-visible:outline-primary";

  return (
    <section data-category-ranking="" className={clsx("w-full", className)}>
      {showHeader && (
        <div className="mb-3 flex items-end justify-between gap-3">
          <div className="min-w-0 flex-1 space-y-0.5">
            {title && (
              <Text as="h2" variant="title" className="truncate">
                {title}
              </Text>
            )}
            {subtitle && (
              <Text as="p" variant="body-sm" tone="muted" className="truncate">
                {subtitle}
              </Text>
            )}
          </div>

          {(resolvedMoreHref || resolvedMoreClick) &&
            (resolvedMoreHref ? (
              <a href={resolvedMoreHref} onClick={resolvedMoreClick} className={moreClassName}>
                <span>{moreLabel}</span>
                <ChevronRightSmall />
              </a>
            ) : (
              <button type="button" onClick={resolvedMoreClick} className={moreClassName}>
                <span>{moreLabel}</span>
                <ChevronRightSmall />
              </button>
            ))}
        </div>
      )}

      <div className={clsx(bleed && "-mx-5")}>
        {/* 플랫 1px 구분선 탭 바 (선택 탭 중앙 정렬 + 슬라이딩 언더라인) */}
        <div
          ref={tabBarRef}
          role="tablist"
          aria-label={typeof title === "string" ? `${title} 카테고리` : "카테고리 순위 탭"}
          onKeyDown={handleTabKeyDown}
          className="subtle-scrollbar relative flex overflow-x-auto border-b border-line bg-surface px-5"
        >
          {categories.map((cat, idx) => {
            const selected = idx === activeIndex;
            return (
              <button
                key={cat.key}
                ref={(el) => {
                  tabRefs.current[idx] = el;
                }}
                id={`${baseId}-tab-${cat.key}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`${baseId}-panel-${cat.key}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => selectIndex(idx)}
                className={clsx(
                  "pressable relative h-11 shrink-0 cursor-pointer px-3.5 text-body-sm whitespace-nowrap transition-colors outline-transparent focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary",
                  selected
                    ? "font-bold text-ink"
                    : "font-medium text-ink-muted hover:text-ink-secondary",
                  // SSR 및 초기 측정 전 폴백 언더라인
                  selected &&
                    !indicatorStyle &&
                    "after:absolute after:right-3.5 after:bottom-0 after:left-3.5 after:h-[2px] after:bg-primary"
                )}
              >
                {cat.label}
              </button>
            );
          })}

          {indicatorStyle && (
            <span
              aria-hidden="true"
              style={{
                transform: `translate3d(${indicatorStyle.left}px, 0, 0)`,
                width: `${indicatorStyle.width}px`,
              }}
              className="pointer-events-none absolute bottom-0 left-0 h-[2px] bg-primary transition-[transform,width] duration-250 ease-out motion-reduce:transition-none"
            />
          )}
        </div>

        {/* 좌우 슬라이드 본문 트랙 (1px 구분선 플랫 순위 리스트) */}
        <div
          ref={viewportRef}
          style={{ touchAction: "pan-y" }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={(e) => finishDrag(e, false)}
          onPointerCancel={(e) => finishDrag(e, true)}
          onClickCapture={(e) => {
            if (suppressClickRef.current) {
              e.preventDefault();
              e.stopPropagation();
              suppressClickRef.current = false;
            }
          }}
          className="w-full overflow-hidden border-b border-line bg-surface"
        >
          <div
            style={{
              transform: `translate3d(calc(${-activeIndex * 100}% + ${dragOffsetPx}px), 0, 0)`,
              transition: dragging
                ? "none"
                : "transform 320ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
            className="flex w-full items-start will-change-transform motion-reduce:transition-none!"
          >
            {categories.map((cat, idx) => {
              const active = idx === activeIndex;
              return (
                <div
                  key={cat.key}
                  id={`${baseId}-panel-${cat.key}`}
                  role="tabpanel"
                  aria-labelledby={`${baseId}-tab-${cat.key}`}
                  aria-hidden={!active}
                  inert={!active ? true : undefined}
                  className="w-full shrink-0 divide-y divide-line"
                >
                  {cat.items.map((item, rowIdx) => (
                    <RankingRow
                      key={item.id}
                      item={item}
                      fallbackRank={rowIdx + 1}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
