"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import clsx from "clsx";
import { ProductCard, type ProductCardProps } from "./ProductCard";
import { Text } from "./Text";

export type ExhibitionProductItem = Omit<ProductCardProps, "variant"> & {
  id: string;
};

export type ExhibitionSectionProps = {
  /** 기획전 메인 타이틀 */
  title: ReactNode;
  /** 타이틀 아래 보조 서브타이틀 */
  subtitle?: ReactNode;
  /** 우측 전체보기 이동 링크 (`onMoreClick`과 택일 또는 병행) */
  moreHref?: string;
  /** 우측 전체보기 클릭 핸들러 */
  onMoreClick?: () => void;
  /** 전체보기 텍스트 (기본 `"전체보기"`) */
  moreLabel?: string;
  /** 슬라이드에 렌더링할 상품 목록 (`ProductCard` grid 변형 재사용) */
  items: readonly ExhibitionProductItem[];
  /** 부모 좌우 패딩(`px-5` 기준) 바깥까지 슬라이드 트랙을 확장할지 여부 (기본 `true`) */
  bleed?: boolean;
  /** 카드 1장 폭 CSS 클래스 (기본 `"w-[156px]"`, 약 2.3장 노출로 다음 카드 피킹 유도) */
  cardWidthClassName?: string;
  className?: string;
};

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

/**
 * 홈 화면 기획전 섹션 (타이틀 · 서브타이틀 · 전체보기 링크 + 하단 상품 카드 가로 슬라이드).
 * - 터치 스냅 스크롤(`snap-x`)과 데스크톱 마우스 드래그 스크롤 동시 지원
 */
export function ExhibitionSection({
  title,
  subtitle,
  moreHref,
  onMoreClick,
  moreLabel = "전체보기",
  items,
  bleed = true,
  cardWidthClassName = "w-[156px]",
  className,
}: ExhibitionSectionProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startScrollLeft: number;
    moved: boolean;
  } | null>(null);
  const suppressClickRef = useRef(false);

  function handlePointerDown(e: PointerEvent<HTMLDivElement>) {
    // 터치 환경은 브라우저 네이티브 관성 스크롤에 맡기고 마우스 드래그만 보강
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const el = scrollerRef.current;
    if (!el) return;
    suppressClickRef.current = false;
    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startScrollLeft: el.scrollLeft,
      moved: false,
    };
  }

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    const st = dragRef.current;
    const el = scrollerRef.current;
    if (!st || !el || st.pointerId !== e.pointerId) return;
    const dx = e.clientX - st.startX;
    if (!st.moved && Math.abs(dx) > 6) {
      st.moved = true;
      suppressClickRef.current = true;
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    }
    if (st.moved) {
      el.scrollLeft = st.startScrollLeft - dx;
    }
  }

  function handlePointerUp(e: PointerEvent<HTMLDivElement>) {
    if (dragRef.current?.pointerId === e.pointerId) {
      dragRef.current = null;
    }
  }

  const showMore = Boolean(moreHref || onMoreClick);
  const moreClassName =
    "pressable inline-flex shrink-0 cursor-pointer items-center gap-0.5 rounded-control py-1 pl-2 pr-1 text-body-sm font-medium text-ink-secondary outline-transparent hover:text-ink focus-visible:outline-2 focus-visible:outline-primary";

  return (
    <section data-exhibition-section="" className={clsx("w-full space-y-3.5", className)}>
      {/* 헤더: 좌측 타이틀·서브타이틀 + 우측 전체보기 링크 */}
      <div className="flex items-end justify-between gap-3">
        <div className="min-w-0 flex-1 space-y-0.5">
          <Text as="h2" variant="title" className="truncate">
            {title}
          </Text>
          {subtitle && (
            <Text as="p" variant="body-sm" tone="muted" className="truncate">
              {subtitle}
            </Text>
          )}
        </div>

        {showMore &&
          (moreHref ? (
            <a href={moreHref} onClick={onMoreClick} className={moreClassName}>
              <span>{moreLabel}</span>
              <ChevronRightSmall />
            </a>
          ) : (
            <button type="button" onClick={onMoreClick} className={moreClassName}>
              <span>{moreLabel}</span>
              <ChevronRightSmall />
            </button>
          ))}
      </div>

      {/* 하단 상품 카드 가로 슬라이드 */}
      <div
        ref={scrollerRef}
        role="list"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onClickCapture={(e) => {
          if (suppressClickRef.current) {
            e.preventDefault();
            e.stopPropagation();
            suppressClickRef.current = false;
          }
        }}
        className={clsx(
          "subtle-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto",
          bleed ? "-mx-5 scroll-pl-5 px-5" : "scroll-pl-0"
        )}
      >
        {items.map(({ id, className: itemClassName, ...cardProps }) => (
          <div
            key={id}
            role="listitem"
            className={clsx("shrink-0 snap-start", cardWidthClassName)}
          >
            <ProductCard variant="grid" {...cardProps} className={itemClassName} />
          </div>
        ))}
      </div>
    </section>
  );
}
