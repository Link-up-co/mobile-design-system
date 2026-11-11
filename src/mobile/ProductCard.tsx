"use client";

import { useState, type ReactNode } from "react";
import clsx from "clsx";
import { formatCurrency } from "../tokens";
import { TagList, type ProductTagInput } from "./Tag";
import { CartIcon, HeartIcon } from "./icons";

export function computeDiscountRate(price: number, originalPrice?: number): number {
  if (!originalPrice || originalPrice <= price || originalPrice <= 0) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

const SPARK_ANGLES = [
  { deg: 0, color: "#EF4444" },
  { deg: 45, color: "#FB7185" },
  { deg: 90, color: "#F59E0B" },
  { deg: 135, color: "#F43F5E" },
  { deg: 180, color: "#EF4444" },
  { deg: 225, color: "#FB923C" },
  { deg: 270, color: "#FB7185" },
  { deg: 315, color: "#F59E0B" },
] as const;

function WishToggleButton({
  wished,
  burstSeq,
  onToggle,
  className,
}: {
  wished: boolean;
  burstSeq: number;
  onToggle: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={wished ? "찜 해제" : "찜하기"}
      aria-pressed={wished}
      onClick={onToggle}
      className={clsx(
        "pressable relative inline-flex cursor-pointer select-none items-center justify-center outline-transparent focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary",
        wished ? "text-danger" : "text-ink-secondary hover:text-ink",
        className
      )}
    >
      {/* 찜 ON 시 넓게 퍼져 나가는 원형 쇼크웨이브 링 + 8방향 스파클 폭죽 */}
      {burstSeq > 0 && wished && (
        <span
          key={`fx-${burstSeq}`}
          aria-hidden="true"
          data-wish-burst=""
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center overflow-visible motion-reduce:hidden"
        >
          <span
            style={{ animation: "mds-heart-ring 700ms cubic-bezier(0.22, 1, 0.36, 1) forwards" }}
            className="absolute size-6 rounded-full border-[1.5px] border-danger/65"
          />
          {SPARK_ANGLES.map((s) => (
            <span
              key={s.deg}
              style={{ transform: `rotate(${s.deg}deg)` }}
              className="absolute flex items-center justify-center"
            >
              <span
                style={{
                  backgroundColor: s.color,
                  animation: "mds-heart-spark 720ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
                }}
                className="size-1.5 rounded-full"
              />
            </span>
          ))}
        </span>
      )}

      <span
        key={`icon-${burstSeq}`}
        style={
          burstSeq > 0
            ? {
                animation: wished
                  ? "mds-heart-pop 640ms cubic-bezier(0.25, 0.8, 0.25, 1)"
                  : "mds-heart-unpop 320ms cubic-bezier(0.25, 0.8, 0.25, 1)",
              }
            : undefined
        }
        className="relative z-10 inline-flex motion-reduce:animate-none!"
      >
        <HeartIcon filled={wished} className="size-[21px]" />
      </span>
    </button>
  );
}

export type ProductCardProps = {
  /** `grid`: 1/2 폭 세로형 카드 · `list`: 가로 전체 풀폭 리스트형 카드 */
  variant?: "grid" | "list";
  name: string;
  /** 주종·용량·원산지 등 짧은 보조 정보 (예: "싱글몰트 · 700ml") */
  subtitle?: string;
  price: number;
  /** 정가(할인 전 가격). `price`보다 크면 취소선과 할인율(%) 자동 표시 */
  originalPrice?: number;
  /** 상품 강조 라벨 태그 목록 (`"베스트"`, `"인기"`, `"행사"`, `"추천"` 등 문자열 또는 `{ label, variant, color }`) */
  tags?: readonly ProductTagInput[];
  imageSrc?: string;
  imageAlt?: string;
  /** 커스텀 썸네일 요소(`imageSrc` 대신 SVG·일러스트 렌더링 시 사용) */
  thumbnail?: ReactNode;
  href?: string;
  onClick?: () => void;
  soldOut?: boolean;
  wished?: boolean;
  defaultWished?: boolean;
  /** 전달 시 찜(하트) 토글 버튼 노출 */
  onWishToggle?: (wished: boolean) => void;
  /** 전달 시 장바구니 빠른 담기 버튼 노출 */
  onCartClick?: () => void;
  className?: string;
};

/**
 * 모바일 상품 카드 (`grid` 1/2 카드 · `list` 가로 전체 카드).
 * - 스트레치드 링크 패턴으로 `<a>`/`<button>` 중첩 없이 카드 본체 터치와 찜·장바구니 버튼 터치를 분리
 */
export function ProductCard({
  variant = "grid",
  name,
  subtitle,
  price,
  originalPrice,
  tags,
  imageSrc,
  imageAlt,
  thumbnail,
  href,
  onClick,
  soldOut = false,
  wished: controlledWished,
  defaultWished = false,
  onWishToggle,
  onCartClick,
  className,
}: ProductCardProps) {
  const [innerWished, setInnerWished] = useState(defaultWished);
  const [burstSeq, setBurstSeq] = useState(0);
  const isWished = controlledWished ?? innerWished;
  const discount = computeDiscountRate(price, originalPrice);

  function toggleWish() {
    const next = !isWished;
    setBurstSeq((n) => n + 1);
    if (controlledWished === undefined) setInnerWished(next);
    onWishToggle?.(next);
  }

  const media = imageSrc ? (
    <img
      src={imageSrc}
      alt={imageAlt ?? name}
      loading="lazy"
      className="size-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
    />
  ) : (
    thumbnail ?? <div className="size-full bg-canvas" />
  );

  const soldOutOverlay = soldOut && (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40">
      <span className="rounded-full bg-black/70 px-2.5 py-1 text-caption font-semibold tracking-wide text-white">
        일시품절
      </span>
    </div>
  );

  const titleNode = href ? (
    <a
      href={href}
      onClick={onClick}
      className="card-link line-clamp-2 text-body-sm leading-[1.4] font-medium text-ink outline-transparent after:absolute after:inset-0 focus-visible:underline"
    >
      {name}
    </a>
  ) : onClick ? (
    <button
      type="button"
      onClick={onClick}
      className="card-link line-clamp-2 cursor-pointer text-left text-body-sm leading-[1.4] font-medium text-ink outline-transparent after:absolute after:inset-0 focus-visible:underline"
    >
      {name}
    </button>
  ) : (
    <span className="line-clamp-2 text-body-sm leading-[1.4] font-medium text-ink">{name}</span>
  );

  const priceBlock = (
    <div className="flex flex-col">
      {discount > 0 && originalPrice && (
        <span className="text-caption tabular-nums text-ink-muted line-through">
          {formatCurrency(originalPrice)}
        </span>
      )}
      <div className="flex items-baseline gap-1">
        {discount > 0 && (
          <span className="text-body font-bold tabular-nums text-danger">{discount}%</span>
        )}
        <span
          className={clsx(
            "text-section font-bold tabular-nums",
            soldOut ? "text-ink-muted" : "text-ink"
          )}
        >
          {formatCurrency(price)}
        </span>
      </div>
    </div>
  );

  if (variant === "list") {
    return (
      <article
        data-variant="list"
        className={clsx(
          "group relative flex w-full items-center gap-3.5 px-4 py-3.5 transition-colors duration-150 ease-out has-[.card-link:active]:bg-canvas/70",
          className
        )}
      >
        <div className="relative size-24 shrink-0 overflow-hidden rounded-card bg-canvas/70 transition-[scale] duration-135 ease-out group-has-[.card-link:active]:scale-[0.97] motion-reduce:transition-none">
          {media}
          {soldOutOverlay}
        </div>

        <div className="flex min-h-24 min-w-0 flex-1 flex-col justify-between">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1 space-y-0.5">
              {subtitle && <p className="truncate text-caption text-ink-muted">{subtitle}</p>}
              {titleNode}
            </div>
            {onWishToggle && (
              <WishToggleButton
                wished={isWished}
                burstSeq={burstSeq}
                onToggle={toggleWish}
                className="z-20 -mt-2 -mr-2.5 size-11 shrink-0 rounded-full"
              />
            )}
          </div>

          <div className="mt-2 flex items-end justify-between gap-2">
            <div className="min-w-0 space-y-1.5">
              {priceBlock}
              <TagList tags={tags} />
            </div>
            {onCartClick && (
              <button
                type="button"
                aria-label="장바구니 담기"
                disabled={soldOut}
                onClick={onCartClick}
                className="pressable relative z-10 inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-line bg-surface text-ink outline-transparent hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-40"
              >
                <CartIcon className="size-[18px]" />
              </button>
            )}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      data-variant="grid"
      className={clsx(
        "group relative flex min-w-0 flex-col transition-[scale] duration-135 ease-out has-[.card-link:active]:scale-[0.98] motion-reduce:transition-none",
        className
      )}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-card bg-canvas/70">
        {media}
        {soldOutOverlay}
      </div>

      {(onWishToggle || onCartClick) && (
        <div
          data-card-actions=""
          className="relative z-10 mt-2 flex h-10 w-full rounded-control border border-line bg-surface"
        >
          {onWishToggle && (
            <WishToggleButton
              wished={isWished}
              burstSeq={burstSeq}
              onToggle={toggleWish}
              className={clsx(
                "z-20 h-full hover:bg-surface-subtle active:bg-canvas",
                onCartClick
                  ? "w-12 shrink-0 rounded-l-[7px] border-r border-line"
                  : "w-full rounded-[7px]"
              )}
            />
          )}
          {onCartClick && (
            <button
              type="button"
              disabled={soldOut}
              onClick={onCartClick}
              className={clsx(
                "pressable inline-flex h-full flex-1 cursor-pointer select-none items-center justify-center gap-1.5 px-2.5 text-body-sm font-semibold text-ink outline-transparent hover:bg-surface-subtle active:bg-canvas focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-45",
                onWishToggle ? "rounded-r-[7px]" : "rounded-[7px]"
              )}
            >
              <CartIcon className="size-[18px]" />
              담기
            </button>
          )}
        </div>
      )}

      <div className="mt-2 flex min-w-0 flex-col gap-1">
        {subtitle && <p className="truncate text-caption text-ink-muted">{subtitle}</p>}
        {titleNode}
        <div className="mt-0.5">{priceBlock}</div>
        <TagList tags={tags} className="mt-0.5" />
      </div>
    </article>
  );
}
