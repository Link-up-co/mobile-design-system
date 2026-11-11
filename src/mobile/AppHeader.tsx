"use client";

import type { ReactNode } from "react";
import clsx from "clsx";
import { IconButton } from "./Button";
import { BackIcon } from "./icons";

export type AppHeaderProps = {
  /** 뒤로가기 버튼 바로 오른쪽에 표시할 타이틀 (길면 `...` 말줄임) */
  title?: string;
  /** 좌측 뒤로가기 노출 여부 (기본 true) */
  showBack?: boolean;
  /** 뒤로가기 클릭 핸들러 (생략 시 `window.history.back()`) */
  onBack?: () => void;
  /** 우측 기능 버튼 영역 (IconButton 1개 또는 2개 권장) */
  actions?: ReactNode;
  sticky?: boolean;
  bordered?: boolean;
  className?: string;
};

/**
 * 모바일 상단 앱 헤더 (높이 52px + 상단 safe-area).
 * - 좌측 뒤로가기 버튼 + 바로 옆 좌측 정렬 타이틀(길어지면 `...` 말줄임) + 우측 기능 버튼 1~2개
 */
export function AppHeader({
  title,
  showBack = true,
  onBack,
  actions,
  sticky = true,
  bordered = true,
  className,
}: AppHeaderProps) {
  function handleBack() {
    if (onBack) {
      onBack();
    } else if (typeof window !== "undefined") {
      window.history.back();
    }
  }

  return (
    <header
      className={clsx(
        "w-full bg-surface text-ink pt-[env(safe-area-inset-top,0px)]",
        sticky && "sticky top-0 z-30",
        bordered && "border-b border-line",
        className
      )}
    >
      <div className="flex h-13 items-center justify-between gap-1 px-1.5">
        <div className="flex min-w-0 flex-1 items-center gap-0.5">
          {showBack && (
            <IconButton aria-label="뒤로가기" icon={<BackIcon />} onClick={handleBack} />
          )}
          {title && (
            <h1
              className={clsx(
                "min-w-0 flex-1 truncate text-section font-bold text-ink",
                !showBack && "pl-2.5"
              )}
            >
              {title}
            </h1>
          )}
        </div>

        {actions && <div className="flex shrink-0 items-center">{actions}</div>}
      </div>
    </header>
  );
}
