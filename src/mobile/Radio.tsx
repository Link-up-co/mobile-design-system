"use client";

import { useState, type InputHTMLAttributes, type ReactNode } from "react";
import clsx from "clsx";

export type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: ReactNode;
  description?: ReactNode;
};

/**
 * 기본 원형 라디오 버튼 (20×20px).
 * - 선택 시 바깥 원이 Primary로 물들고 안쪽 흰 원이 중심에서 탄력 있게 커짐(scale-0 -> scale-100)
 */
export function Radio({ label, description, disabled, className, ...rest }: RadioProps) {
  return (
    <label
      className={clsx(
        "group inline-flex min-h-9 cursor-pointer select-none items-start gap-2.5 py-1 text-body text-ink",
        "has-disabled:cursor-not-allowed has-disabled:opacity-50",
        className
      )}
    >
      <span className="relative mt-0.5 inline-flex size-5 shrink-0 items-center justify-center">
        <input
          type="radio"
          disabled={disabled}
          className={clsx(
            "peer size-5 cursor-[inherit] appearance-none rounded-full border border-line-strong bg-surface",
            "transition-[background-color,border-color,scale] duration-150 ease-out",
            "checked:border-primary checked:bg-primary",
            "not-checked:group-hover:border-ink-muted",
            "group-active:not-disabled:scale-90 motion-reduce:group-active:scale-100",
            "outline-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          )}
          {...rest}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute size-2 scale-0 rounded-full bg-primary-fg transition-transform duration-150 ease-out peer-checked:scale-100"
        />
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

export type RadioOption = {
  value: string;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
};

export type RadioGroupProps = {
  name: string;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  direction?: "vertical" | "horizontal";
  "aria-label"?: string;
  className?: string;
};

export function RadioGroup({
  name,
  options,
  value: controlled,
  defaultValue = "",
  onChange,
  direction = "vertical",
  "aria-label": ariaLabel,
  className,
}: RadioGroupProps) {
  const [inner, setInner] = useState(defaultValue);
  const current = controlled ?? inner;

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={clsx(
        direction === "horizontal" ? "flex flex-wrap items-center gap-x-5 gap-y-2" : "flex flex-col gap-1.5",
        className
      )}
    >
      {options.map((o) => (
        <Radio
          key={o.value}
          name={name}
          value={o.value}
          label={o.label}
          description={o.description}
          disabled={o.disabled}
          checked={current === o.value}
          onChange={() => {
            if (controlled === undefined) setInner(o.value);
            onChange?.(o.value);
          }}
        />
      ))}
    </div>
  );
}

export type RadioButtonOption = {
  value: string;
  label: ReactNode;
  /** 가격·용량·보조 설명 (예: "46,900원") */
  subLabel?: ReactNode;
  disabled?: boolean;
};

export type RadioButtonGroupProps = {
  name: string;
  options: RadioButtonOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /**
   * - `outline`: 테두리 버튼형 그리드 (선택 시 Primary 테두리 + 연한 브랜드 채움, 옵션/결제수단 선택용)
   * - `segmented`: 회색 트랙 위에서 흰 탭이 선택되는 세그먼트 스위치형 (수령방식·보관온도 전환용)
   */
  variant?: "outline" | "segmented";
  /** outline 모드 열 개수 (기본 2열, 0이면 내용 폭만큼 가로 나열) */
  columns?: 0 | 2 | 3 | 4;
  size?: "sm" | "md";
  "aria-label"?: string;
  className?: string;
};

const COLS = {
  0: "flex flex-wrap gap-2",
  2: "grid grid-cols-2 gap-2",
  3: "grid grid-cols-3 gap-2",
  4: "grid grid-cols-4 gap-2",
} as const;

/**
 * 버튼형 라디오 그룹 (`outline` 옵션 버튼형 / `segmented` 세그먼트 탭형).
 * - 내부에 실제 `<input type="radio" className="sr-only">`를 두어 폼 전송과 방향키(←/→) 키보드 탐색이 네이티브 그대로 동작
 */
export function RadioButtonGroup({
  name,
  options,
  value: controlled,
  defaultValue = "",
  onChange,
  variant = "outline",
  columns = 2,
  size = "md",
  "aria-label": ariaLabel,
  className,
}: RadioButtonGroupProps) {
  const [inner, setInner] = useState(defaultValue);
  const [bouncedVal, setBouncedVal] = useState<string | null>(null);
  const current = controlled ?? inner;

  const select = (val: string) => {
    setBouncedVal(val);
    if (controlled === undefined) setInner(val);
    onChange?.(val);
  };

  if (variant === "segmented") {
    const count = Math.max(1, options.length);
    const activeIndex = options.findIndex((o) => o.value === current);

    return (
      <div
        role="radiogroup"
        aria-label={ariaLabel}
        className={clsx("relative grid auto-cols-fr grid-flow-col rounded-control bg-canvas p-1", className)}
      >
        {activeIndex >= 0 && (
          <span
            aria-hidden="true"
            data-segmented-thumb=""
            style={{
              width: `calc((100% - 8px) / ${count})`,
              transform: `translateX(${activeIndex * 100}%)`,
            }}
            className="pointer-events-none absolute top-1 bottom-1 left-1 rounded-[6px] bg-surface shadow-xs transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
          />
        )}
        {options.map((o) => {
          const active = current === o.value;
          return (
            <label
              key={o.value}
              className={clsx(
                "pressable relative z-10 flex cursor-pointer select-none items-center justify-center rounded-[6px] px-3 text-center font-semibold transition-colors duration-200 ease-out",
                size === "sm" ? "h-8 text-body-sm" : "h-9 text-body-sm",
                o.disabled && "cursor-not-allowed opacity-45",
                active ? "text-ink" : "text-ink-muted hover:text-ink-secondary",
                "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-1 has-[:focus-visible]:outline-primary"
              )}
            >
              <input
                type="radio"
                name={name}
                value={o.value}
                disabled={o.disabled}
                checked={active}
                onChange={() => select(o.value)}
                className="sr-only"
              />
              <span className="truncate">{o.label}</span>
            </label>
          );
        })}
      </div>
    );
  }

  return (
    <div role="radiogroup" aria-label={ariaLabel} className={clsx(COLS[columns], className)}>
      {options.map((o) => {
        const active = current === o.value;
        const bouncing = active && bouncedVal === o.value;
        return (
          <label
            key={o.value}
            style={
              bouncing
                ? { animation: "mds-radio-bounce 340ms cubic-bezier(0.22, 1, 0.36, 1)" }
                : undefined
            }
            className={clsx(
              "relative flex cursor-pointer select-none flex-col items-center justify-center overflow-hidden rounded-control border bg-surface px-3.5 text-center",
              "transition-[border-color,color,box-shadow,transform] duration-200 ease-out active:not-has-disabled:scale-[0.97] motion-reduce:animate-none! motion-reduce:transition-none",
              o.subLabel ? "min-h-14 py-2.5" : size === "sm" ? "h-9" : "h-11",
              o.disabled && "cursor-not-allowed opacity-45",
              active
                ? "border-primary text-primary ring-1 ring-primary"
                : "border-line text-ink hover:border-line-strong hover:bg-surface-subtle",
              "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary"
            )}
          >
            <input
              type="radio"
              name={name}
              value={o.value}
              disabled={o.disabled}
              checked={active}
              onChange={() => select(o.value)}
              className="sr-only"
            />
            {/* 중심에서 바깥으로 번지며 채워지는 배경 레이어 */}
            <span
              aria-hidden="true"
              data-outline-fill=""
              style={{ transform: active ? "scale(1)" : "scale(0.5)" }}
              className={clsx(
                "pointer-events-none absolute inset-0 rounded-[inherit] bg-primary-soft/75 transition-[transform,opacity] duration-320 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                active ? "opacity-100" : "opacity-0"
              )}
            />
            <span
              className={clsx(
                "relative z-10 text-body font-semibold transition-colors duration-200",
                active ? "text-primary" : "text-ink"
              )}
            >
              {o.label}
            </span>
            {o.subLabel && (
              <span
                className={clsx(
                  "relative z-10 mt-0.5 text-caption tabular-nums transition-colors duration-200",
                  active ? "font-semibold text-primary/85" : "text-ink-muted"
                )}
              >
                {o.subLabel}
              </span>
            )}
          </label>
        );
      })}
    </div>
  );
}
