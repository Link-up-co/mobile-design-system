"use client";

import { useEffect, useRef, useState, type InputHTMLAttributes, type ReactNode } from "react";
import clsx from "clsx";

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: ReactNode;
  description?: ReactNode;
  /** 일부만 선택된 상태(전체 선택 체크박스) */
  indeterminate?: boolean;
};

/**
 * 모바일 터치 친화적 체크박스 (20×20px 라운드 박스 + 체크 드로잉 모션).
 * - 라벨 전체가 넉넉한 터치 영역이 되며, 누르는 동안 박스가 0.9배로 살짝 눌림
 */
export function Checkbox({
  label,
  description,
  indeterminate = false,
  disabled,
  className,
  ...rest
}: CheckboxProps) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <label
      className={clsx(
        "group inline-flex min-h-9 cursor-pointer touch-manipulation select-none items-start gap-2.5 py-1 text-body text-ink [-webkit-tap-highlight-color:transparent]",
        "has-disabled:cursor-not-allowed has-disabled:opacity-50",
        className
      )}
    >
      <span className="relative mt-0.5 inline-flex size-5 shrink-0">
        <input
          ref={ref}
          type="checkbox"
          disabled={disabled}
          aria-checked={indeterminate ? "mixed" : undefined}
          className={clsx(
            "peer size-5 cursor-[inherit] appearance-none rounded-[6px] border border-line-strong bg-surface",
            "transition-[background-color,border-color,scale] duration-150 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
            "checked:border-primary checked:bg-primary indeterminate:border-primary indeterminate:bg-primary",
            "not-checked:not-indeterminate:group-hover:border-ink-muted",
            "group-active:not-disabled:scale-90 motion-reduce:group-active:scale-100",
            "outline-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          )}
          {...rest}
        />
        {/* 체크 표시 드로잉 애니메이션 */}
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="pointer-events-none absolute inset-0 text-primary-fg *:transition-[stroke-dashoffset] *:duration-100 *:ease-out peer-checked:*:[stroke-dashoffset:0] peer-checked:*:duration-200"
        >
          <path
            d="M5 10.5l3.25 3.25L15 6.75"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset="1"
          />
        </svg>
        {/* 일부 선택(indeterminate) 대시 */}
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="pointer-events-none absolute inset-0 scale-x-50 text-primary-fg opacity-0 transition-[opacity,scale] duration-150 ease-out peer-indeterminate:scale-x-100 peer-indeterminate:opacity-100"
        >
          <path d="M5.5 10h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </span>
      {(label || description) && (
        <span className="flex min-w-0 flex-col gap-0.5">
          {label && <span className="leading-[1.4] font-medium text-ink">{label}</span>}
          {description && <span className="text-body-sm text-ink-muted">{description}</span>}
        </span>
      )}
    </label>
  );
}

export type CheckboxOption = {
  value: string;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
};

export function toggleCheckboxValue(selected: string[], value: string, order: string[]): string[] {
  const next = selected.includes(value) ? selected.filter((v) => v !== value) : [...selected, value];
  return order.filter((v) => next.includes(v));
}

export type CheckboxGroupProps = {
  name: string;
  options: CheckboxOption[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  /** 주면 맨 위에 전체 선택 체크박스(구분선 포함)를 표시 */
  allLabel?: ReactNode;
  direction?: "vertical" | "horizontal";
  "aria-label"?: string;
  className?: string;
};

export function CheckboxGroup({
  name,
  options,
  value: controlled,
  defaultValue = [],
  onChange,
  allLabel,
  direction = "vertical",
  "aria-label": ariaLabel,
  className,
}: CheckboxGroupProps) {
  const [inner, setInner] = useState(defaultValue);
  const selected = controlled ?? inner;
  const enabledOrder = options.filter((o) => !o.disabled).map((o) => o.value);
  const fullOrder = options.map((o) => o.value);

  const set = (next: string[]) => {
    if (controlled === undefined) setInner(next);
    onChange?.(next);
  };

  const all = enabledOrder.length > 0 && enabledOrder.every((v) => selected.includes(v));
  const some = !all && enabledOrder.some((v) => selected.includes(v));

  return (
    <div role="group" aria-label={ariaLabel} className={clsx("flex flex-col gap-1.5", className)}>
      {allLabel && (
        <div className="border-b border-line pb-2 mb-1">
          <Checkbox
            label={<span className="font-semibold">{allLabel}</span>}
            checked={all}
            indeterminate={some}
            onChange={() => set(all ? [] : enabledOrder)}
          />
        </div>
      )}
      <div
        className={clsx(
          direction === "horizontal" ? "flex flex-wrap items-center gap-x-5 gap-y-2" : "flex flex-col gap-1.5"
        )}
      >
        {options.map((o) => (
          <Checkbox
            key={o.value}
            name={name}
            value={o.value}
            label={o.label}
            description={o.description}
            disabled={o.disabled}
            checked={selected.includes(o.value)}
            onChange={() => set(toggleCheckboxValue(selected, o.value, fullOrder))}
          />
        ))}
      </div>
    </div>
  );
}
