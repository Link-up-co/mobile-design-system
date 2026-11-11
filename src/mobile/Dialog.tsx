"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import clsx from "clsx";
import { Button } from "./Button";

export type DialogProps = {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  /** 확인(우측 주 액션) 버튼 문구 (기본 `"확인"`) */
  confirmLabel?: string;
  /** 취소(좌측 보조 액션) 버튼 문구 — 생략하면 1버튼 알림(Alert) 모달로 동작 */
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  /** 주 액션 버튼 스타일 (`"danger"`는 주문 취소·계정 삭제 등 파괴적 작업용) */
  confirmVariant?: "primary" | "danger";
  loading?: boolean;
  /** 백드롭 클릭 시 닫기 허용 여부 (기본 `true`) */
  closeOnBackdrop?: boolean;
  className?: string;
};

const EXIT_MS = 240;

/**
 * 모바일 중앙 확인·경고 모달 (`Dialog` — `AlertDialog` / `ConfirmDialog` 겸용).
 * - `BottomSheet`와 일관된 `backdrop-blur-[3px]` 디밍 애니메이션 + 스프링 팝인/아웃
 * - `cancelLabel` 유무에 따라 1버튼(알럿) / 2버튼(확인·취소) 레이아웃 자동 전환
 */
export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  confirmLabel = "확인",
  cancelLabel,
  onConfirm,
  onCancel,
  confirmVariant = "primary",
  loading = false,
  closeOnBackdrop = true,
  className,
}: DialogProps) {
  const [rendered, setRendered] = useState(open);
  const titleId = useId();
  const descId = useId();

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
      if (e.key === "Escape" && !loading) onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose, loading]);

  if (!open && !rendered) return null;

  const hasCancel = Boolean(cancelLabel);
  const hasDesc = description !== undefined && description !== null && description !== "";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
      <div
        aria-hidden="true"
        data-dialog-backdrop=""
        onClick={() => {
          if (closeOnBackdrop && !loading) onClose();
        }}
        style={{
          animation: closing
            ? `mds-backdrop-out ${EXIT_MS}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`
            : "mds-backdrop-in 280ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
        }}
        className="absolute inset-0 bg-black/45 backdrop-blur-[3px] motion-reduce:animate-none!"
      />

      <div
        role={confirmVariant === "danger" ? "alertdialog" : "dialog"}
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={hasDesc ? descId : undefined}
        data-dialog-panel=""
        style={{
          animation: closing
            ? `mds-dialog-out ${EXIT_MS}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`
            : "mds-dialog-in 300ms cubic-bezier(0.22, 1.18, 0.36, 1) forwards",
        }}
        className={clsx(
          "relative z-10 w-full max-w-[332px] overflow-hidden rounded-[16px] bg-surface p-5 text-ink shadow-2xl motion-reduce:animate-none!",
          className
        )}
      >
        <div className="space-y-2 text-center">
          <h2 id={titleId} className="break-keep text-[17px] leading-[1.35] font-bold tracking-tight text-ink">
            {title}
          </h2>
          {hasDesc && (
            <p id={descId} className="break-keep text-body-sm leading-[1.5] text-ink-secondary">
              {description}
            </p>
          )}
        </div>

        {children && <div className="mt-3.5">{children}</div>}

        <div
          className={clsx(
            "mt-5 grid gap-2",
            hasCancel ? "grid-cols-2" : "grid-cols-1"
          )}
        >
          {hasCancel && (
            <Button
              variant="secondary"
              fullWidth
              disabled={loading}
              onClick={() => {
                onCancel?.();
                onClose();
              }}
            >
              {cancelLabel}
            </Button>
          )}
          <Button
            variant={confirmVariant === "danger" ? "danger" : "primary"}
            fullWidth
            loading={loading}
            onClick={() => {
              if (onConfirm) {
                onConfirm();
              } else {
                onClose();
              }
            }}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
