"use client";

import { useEffect, useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import clsx from "clsx";
import { ArrowUpIcon, PlusIcon } from "./icons";

export type FABProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  /** 아이콘 (기본 `<PlusIcon />`) */
  icon?: ReactNode;
  /** 텍스트 라벨 함께 표시 시 확장형 캡슐 버튼으로 렌더링 */
  label?: string;
  /** 스크린리더용 라벨 (`label` 생략 시 필수 권장, 기본 `"작성하기"`) */
  "aria-label"?: string;
  variant?: "primary" | "surface";
  /** `"fixed"`: 모바일 컨테이너 우측 하단 플로팅(기본) · `"static"`: 인라인 미리보기용 */
  position?: "fixed" | "static";
  /** 하단 바텀 네비게이션(`BottomNav`) 높이만큼 위로 띄울지 여부 (기본 `true`) */
  offsetBottomNav?: boolean;
  maxWidthClassName?: string;
};

/**
 * 우측 하단 `+` 플로팅 액션 버튼 (`FAB`).
 * - 모바일 `412px` 컨테이너 우측 안쪽에 정확히 정렬되며 하단 메뉴(`BottomNav`) 및 Safe Area 자동 회피 지원
 */
export function FAB({
  icon,
  label,
  "aria-label": ariaLabel = "작성하기",
  variant = "primary",
  position = "fixed",
  offsetBottomNav = true,
  maxWidthClassName = "max-w-[412px]",
  className,
  ...rest
}: FABProps) {
  const btn = (
    <button
      type="button"
      aria-label={label ? undefined : ariaLabel}
      data-fab=""
      className={clsx(
        "pressable inline-flex cursor-pointer select-none items-center justify-center rounded-full shadow-lg transition-[transform,background-color,box-shadow] duration-200 outline-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-45",
        label ? "h-12 gap-1.5 px-4 text-body-sm font-bold" : "size-13 [&_svg]:size-6",
        variant === "primary"
          ? "bg-primary text-primary-fg hover:bg-primary-hover shadow-primary/25"
          : "border border-line bg-surface/95 text-ink backdrop-blur-md hover:bg-surface-subtle",
        className
      )}
      {...rest}
    >
      {icon ?? <PlusIcon />}
      {label && <span>{label}</span>}
    </button>
  );

  if (position === "static") return btn;

  return (
    <div
      data-fab-container=""
      className={clsx(
        "pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center",
        offsetBottomNav
          ? "pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))]"
          : "pb-[calc(1rem+env(safe-area-inset-bottom,0px))]"
      )}
    >
      <div className={clsx(" flex w-full justify-end px-4", maxWidthClassName)}>
        <div className="pointer-events-auto">{btn}</div>
      </div>
    </div>
  );
}

export type ScrollTopFABProps = {
  /** 버튼이 나타나기 시작하는 스크롤 Y 임계값 (기본 `280px`) */
  threshold?: number;
  offsetBottomNav?: boolean;
  maxWidthClassName?: string;
  className?: string;
};

/**
 * 스크롤을 내렸을 때 우측 하단에 부드럽게 나타나는 `맨 위로` 플로팅 버튼 (`ScrollTopFAB`).
 */
export function ScrollTopFAB({
  threshold = 280,
  offsetBottomNav = true,
  maxWidthClassName = "max-w-[412px]",
  className,
}: ScrollTopFABProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return (
    <div
      aria-hidden={!visible || undefined}
      className={clsx(
        "pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center transition-[opacity,transform] duration-240 ease-out motion-reduce:transition-none!",
        offsetBottomNav
          ? "pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))]"
          : "pb-[calc(1rem+env(safe-area-inset-bottom,0px))]",
        visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      )}
    >
      <div className={clsx("flex w-full justify-end px-4", maxWidthClassName)}>
        <button
          type="button"
          tabIndex={visible ? 0 : -1}
          aria-label="맨 위로 이동"
          onClick={() => {
            const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
            window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
          }}
          className={clsx(
            "pressable inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-line bg-surface/92 text-ink shadow-md backdrop-blur-md hover:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-primary",
            visible ? "pointer-events-auto" : "pointer-events-none",
            className
          )}
        >
          <ArrowUpIcon className="size-5" />
        </button>
      </div>
    </div>
  );
}
