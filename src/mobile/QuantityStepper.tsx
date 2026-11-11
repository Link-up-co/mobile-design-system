"use client";

import { useState } from "react";
import clsx from "clsx";

export function clampQuantity(value: number, min = 1, max = 99): number {
  const n = Number.isFinite(value) ? Math.trunc(value) : min;
  return Math.min(max, Math.max(min, n));
}

export type QuantityStepperProps = {
  id?: string;
  name?: string;
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  size?: "sm" | "md";
  disabled?: boolean;
  onChange?: (value: number) => void;
  className?: string;
};

/**
 * 모바일 수량 조절기 (`−` / 숫자 / `+`).
 * - 경계값(`min` / `max`)에서 해당 버튼 자동 비활성화
 * - 각 버튼은 터치하기 편한 정사각형 영역(`sm` 36×36, `md` 44×44)과 `pressable` 축소 피드백을 가짐
 */
export function QuantityStepper({
  id,
  name,
  value: controlled,
  defaultValue = 1,
  min = 1,
  max = 99,
  step = 1,
  size = "md",
  disabled = false,
  onChange,
  className,
}: QuantityStepperProps) {
  const [inner, setInner] = useState(() => clampQuantity(defaultValue, min, max));
  const current = clampQuantity(controlled ?? inner, min, max);

  function commit(next: number) {
    const clamped = clampQuantity(next, min, max);
    if (controlled === undefined) setInner(clamped);
    onChange?.(clamped);
  }

  const atMin = disabled || current <= min;
  const atMax = disabled || current >= max;
  const btnSize = size === "sm" ? "size-9" : "size-11";

  return (
    <div
      className={clsx(
        "inline-flex items-center overflow-hidden rounded-control border border-line bg-surface",
        disabled && "opacity-50",
        size === "sm" ? "h-9" : "h-11",
        className
      )}
    >
      <button
        type="button"
        aria-label="수량 감소"
        disabled={atMin}
        onClick={() => commit(current - step)}
        className={clsx(
          "pressable inline-flex shrink-0 cursor-pointer select-none items-center justify-center border-r border-line text-ink outline-transparent hover:bg-surface-subtle active:bg-canvas disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary",
          btnSize
        )}
      >
        <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4">
          <path d="M3.5 8h9" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      </button>

      <input
        id={id}
        name={name}
        type="text"
        inputMode="numeric"
        disabled={disabled}
        value={current}
        onChange={(e) => {
          const parsed = Number(e.target.value.replace(/[^0-9]/g, ""));
          if (!Number.isNaN(parsed)) commit(parsed);
        }}
        className={clsx(
          "h-full bg-transparent text-center font-semibold tabular-nums text-ink outline-none",
          size === "sm" ? "w-10 text-body-sm" : "w-12 text-body"
        )}
      />

      <button
        type="button"
        aria-label="수량 증가"
        disabled={atMax}
        onClick={() => commit(current + step)}
        className={clsx(
          "pressable inline-flex shrink-0 cursor-pointer select-none items-center justify-center border-l border-line text-ink outline-transparent hover:bg-surface-subtle active:bg-canvas disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary",
          btnSize
        )}
      >
        <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4">
          <path d="M8 3.5v9M3.5 8h9" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
