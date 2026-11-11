"use client";

import { useEffect, useState, type ReactNode } from "react";
import clsx from "clsx";
import { CheckIcon } from "./icons";

const EXIT_MS = 260;

function useAnimatedOpen(open: boolean, duration: number, onClose: () => void, triggerKey?: number | string) {
  const [rendered, setRendered] = useState(open);

  if (open && !rendered) {
    setRendered(true);
  }

  const closing = !open && rendered;

  useEffect(() => {
    if (!open || duration <= 0) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [open, duration, onClose, triggerKey]);

  useEffect(() => {
    if (!closing) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const timer = setTimeout(() => setRendered(false), reduced ? 0 : EXIT_MS);
    return () => clearTimeout(timer);
  }, [closing]);

  return { visible: open || rendered, closing };
}

export type ToastVariant = "default" | "success" | "danger";

export type ToastProps = {
  open: boolean;
  onClose: () => void;
  message: ReactNode;
  variant?: ToastVariant;
  /** 자동 닫힘 시간(ms). 0 이하이면 자동 닫힘 해제 (기본 2200ms) */
  duration?: number;
  /** 연속 호출 시 타이머·애니메이션 재시작용 키 */
  triggerKey?: number | string;
  className?: string;
};

/**
 * 모바일 상단 플로팅 토스트 메시지 (버튼 없는 가벼운 상태 알림 캡슐).
 */
export function Toast({
  open,
  onClose,
  message,
  variant = "default",
  duration = 2200,
  triggerKey,
  className,
}: ToastProps) {
  const { visible, closing } = useAnimatedOpen(open, duration, onClose, triggerKey);
  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 mx-auto flex max-w-[412px] justify-center px-4 pt-[calc(0.875rem+env(safe-area-inset-top,0px))]">
      <div
        key={triggerKey}
        role={variant === "danger" ? "alert" : "status"}
        aria-live={variant === "danger" ? "assertive" : "polite"}
        data-toast=""
        style={{
          animation: closing
            ? `mds-toast-out ${EXIT_MS}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`
            : "mds-toast-in 320ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
        }}
        className={clsx(
          "pointer-events-auto inline-flex max-w-full items-center gap-2 rounded-full bg-ink/92 px-4 py-2.5 text-body-sm font-medium text-white shadow-lg backdrop-blur-xs motion-reduce:animate-none!",
          className
        )}
      >
        {variant === "success" && (
          <span className="inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
            <CheckIcon className="size-3" />
          </span>
        )}
        {variant === "danger" && (
          <span
            aria-hidden="true"
            className="inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-danger text-[11px] leading-none font-bold text-white"
          >
            !
          </span>
        )}
        <span className="truncate">{message}</span>
      </div>
    </div>
  );
}

export type SnackbarProps = {
  open: boolean;
  onClose: () => void;
  message: ReactNode;
  /** 우측 보조 액션 문구 (예: "장바구니 보기", "실행 취소") */
  actionLabel?: string;
  onAction?: () => void;
  /** 자동 닫힘 시간(ms). 0 이하이면 자동 닫힘 해제 (기본 3200ms) */
  duration?: number;
  /** 연속 담기 시 타이머 리셋 및 재진입 모션 키 */
  triggerKey?: number | string;
  className?: string;
};

/**
 * 모바일 하단 플로팅 스낵바 (장바구니 담기·실행 취소 등 액션 동반 하단 바).
 */
export function Snackbar({
  open,
  onClose,
  message,
  actionLabel,
  onAction,
  duration = 3200,
  triggerKey,
  className,
}: SnackbarProps) {
  const { visible, closing } = useAnimatedOpen(open, duration, onClose, triggerKey);
  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 mx-auto max-w-[412px] px-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]">
      <div
        key={triggerKey}
        role="status"
        aria-live="polite"
        data-snackbar=""
        style={{
          animation: closing
            ? `mds-snackbar-out ${EXIT_MS}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`
            : "mds-snackbar-in 340ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
        }}
        className={clsx(
          "pointer-events-auto flex min-h-12 w-full items-center justify-between gap-3 rounded-card bg-ink px-4 py-3 text-body-sm text-white shadow-xl motion-reduce:animate-none!",
          className
        )}
      >
        <span className="min-w-0 flex-1 leading-[1.4] font-medium">{message}</span>
        {actionLabel && (
          <button
            type="button"
            onClick={() => {
              onAction?.();
              onClose();
            }}
            className="pressable -mr-1 shrink-0 cursor-pointer rounded-control px-2 py-1 text-body-sm font-bold text-[#60A5FA] outline-transparent hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}
