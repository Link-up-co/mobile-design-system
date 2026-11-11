"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import { Button, type ButtonVariant } from "./Button";

export type FixedBottomButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  /** 주 블록 버튼 문구 */
  children: ReactNode;
  variant?: ButtonVariant;
  loading?: boolean;
  icon?: ReactNode;
  /** 좌측 보조 아이콘 슬롯 (예: 상품 상세 찜하기 버튼) */
  leading?: ReactNode;
  /** 좌측 보조 블록 버튼 (예: "장바구니", "이전") */
  secondaryAction?: {
    label: ReactNode;
    onClick?: () => void;
    variant?: ButtonVariant;
    disabled?: boolean;
    loading?: boolean;
  };
  /** 버튼 상단 보조 요약 영역 (예: 총 결제예정금액 한 줄 요약) */
  topSlot?: ReactNode;
  /** `"fixed"`: 뷰포트 하단 고정(기본) · `"sticky"`: 스크롤 컨테이너 하단 점착 · `"static"`: 문서 흐름 내 배치 */
  position?: "fixed" | "sticky" | "static";
  /** `position="fixed"`일 때 본문 하단이 가려지지 않도록 동일 높이 스페이서를 함께 렌더링할지 여부 (기본 `true`) */
  reserveSpace?: boolean;
  /** 모바일 컨테이너 최대 폭 클래스 (기본 `"max-w-[412px]"`) */
  maxWidthClassName?: string;
  className?: string;
};

/**
 * 모바일 하단 고정 블록 버튼 (`52px` lg 블록 CTA + Safe Area 대응).
 * - 단일 블록 버튼, `[보조 버튼 + 주 버튼]` 2분할, `[좌측 찜 아이콘 + 주 버튼]`, 상단 금액 요약 슬롯 모두 지원
 * - `position="fixed"` 시 본문 가림 방지 스페이서(`reserveSpace`) 자동 확보
 */
export function FixedBottomButton({
  children,
  variant = "primary",
  loading = false,
  disabled,
  icon,
  leading,
  secondaryAction,
  topSlot,
  position = "fixed",
  reserveSpace = true,
  maxWidthClassName = "max-w-[412px]",
  className,
  ...buttonRest
}: FixedBottomButtonProps) {
  const barInner = (
    <div
      data-bottom-action-inner=""
      className={clsx(
        "mx-auto w-full border-t border-line bg-surface/92 px-5 pt-3 backdrop-blur-md",
        position === "static"
          ? "pb-3"
          : "pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]",
        position === "fixed" && maxWidthClassName,
        className
      )}
    >
      {topSlot && <div className="mb-2.5">{topSlot}</div>}

      <div className="flex w-full items-center gap-2">
        {leading && <div className="flex shrink-0 items-center">{leading}</div>}

        {secondaryAction && (
          <Button
            size="lg"
            variant={secondaryAction.variant ?? "secondary"}
            disabled={secondaryAction.disabled}
            loading={secondaryAction.loading}
            onClick={secondaryAction.onClick}
            className="flex-1"
          >
            {secondaryAction.label}
          </Button>
        )}

        <Button
          size="lg"
          variant={variant}
          loading={loading}
          disabled={disabled}
          icon={icon}
          className={clsx(secondaryAction ? "flex-[1.6]" : "flex-1")}
          {...buttonRest}
        >
          {children}
        </Button>
      </div>
    </div>
  );

  if (position === "static") {
    return (
      <div data-bottom-action-bar="" data-position="static" className="w-full">
        {barInner}
      </div>
    );
  }

  if (position === "sticky") {
    return (
      <div
        data-bottom-action-bar=""
        data-position="sticky"
        className="sticky bottom-0 z-30 w-full"
      >
        {barInner}
      </div>
    );
  }

  return (
    <>
      {reserveSpace && (
        <div
          aria-hidden="true"
          data-bottom-action-spacer=""
          className={clsx(
            "w-full shrink-0",
            topSlot
              ? "h-[calc(108px+env(safe-area-inset-bottom,0px))]"
              : "h-[calc(76px+env(safe-area-inset-bottom,0px))]"
          )}
        />
      )}
      <div
        data-bottom-action-bar=""
        data-position="fixed"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center"
      >
        <div className={clsx("pointer-events-auto w-full", maxWidthClassName)}>
          {barInner}
        </div>
      </div>
    </>
  );
}
