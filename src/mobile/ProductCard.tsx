"use client";

import { useState, type ReactNode } from "react";
import clsx from "clsx";
import { formatCurrency } from "../tokens";
import { CartIcon, HeartIcon } from "./icons";

export function computeDiscountRate(price: number, originalPrice?: number): number {
  if (!originalPrice || originalPrice <= price || originalPrice <= 0) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
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
  const [wishPopping, setWishPopping] = useState(false);
  const isWished = controlledWished ?? innerWished;
  const discount = computeDiscountRate(price, originalPrice);

  function toggleWish() {
    const next = !isWished;
    setWishPopping(true);
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
          "group relative flex w-full items-center gap-3.5 py-3.5 transition-[scale] duration-135 ease-out has-[.card-link:active]:scale-[0.985] motion-reduce:transition-none",
          className
        )}
      >
        <div className="relative size-24 shrink-0 overflow-hidden rounded-card bg-canvas/70">
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
              <button
                type="button"
                aria-label={isWished ? "찜 해제" : "찜하기"}
                aria-pressed={isWished}
                onClick={toggleWish}
                onAnimationEnd={() => setWishPopping(false)}
                style={
                  wishPopping
                    ? { animation: "mds-radio-bounce 320ms cubic-bezier(0.22, 1, 0.36, 1)" }
                    : undefined
                }
                className={clsx(
                  "pressable relative z-10 -mt-1 -mr-1.5 inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full outline-transparent focus-visible:outline-2 focus-visible:outline-primary",
                  isWished ? "text-danger" : "text-ink-muted hover:text-ink"
                )}
              >
                <HeartIcon filled={isWished} />
              </button>
            )}
          </div>

          <div className="mt-2 flex items-end justify-between gap-2">
            {priceBlock}
            {onCartClick && (
              <button
                type="button"
                aria-label="장바구니 담기"
                disabled={soldOut}
                onClick={onCartClick}
                className="pressable relative z-10 inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-line bg-surface text-ink outline-transparent hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-40"
              >
                <CartIcon className="size-4" />
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

        {onWishToggle && (
          <button
            type="button"
            aria-label={isWished ? "찜 해제" : "찜하기"}
            aria-pressed={isWished}
            onClick={toggleWish}
            onAnimationEnd={() => setWishPopping(false)}
            style={
              wishPopping
                ? { animation: "mds-radio-bounce 320ms cubic-bezier(0.22, 1, 0.36, 1)" }
                : undefined
            }
            className={clsx(
              "pressable absolute top-2 right-2 z-10 inline-flex size-8 cursor-pointer items-center justify-center rounded-full bg-surface/85 shadow-xs backdrop-blur-xs outline-transparent focus-visible:outline-2 focus-visible:outline-primary",
              isWished ? "text-danger" : "text-ink-secondary hover:text-ink"
            )}
          >
            <HeartIcon filled={isWished} />
          </button>
        )}

        {onCartClick && (
          <button
            type="button"
            aria-label="장바구니 담기"
            disabled={soldOut}
            onClick={onCartClick}
            className="pressable absolute right-2 bottom-2 z-10 inline-flex size-8 cursor-pointer items-center justify-center rounded-full border border-line/80 bg-surface/92 text-ink shadow-xs outline-transparent hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            <CartIcon className="size-4" />
          </button>
        )}
      </div>

      <div className="mt-2.5 flex min-w-0 flex-col gap-1">
        {subtitle && <p className="truncate text-caption text-ink-muted">{subtitle}</p>}
        {titleNode}
        <div className="mt-0.5">{priceBlock}</div>
      </div>
    </article>
  );
}
