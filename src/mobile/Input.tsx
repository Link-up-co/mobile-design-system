"use client";

import {
  useRef,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
  type TextareaHTMLAttributes,
} from "react";
import clsx from "clsx";
import { Button, type ButtonVariant } from "./Button";
import { CloseIcon, SearchIcon } from "./icons";

const SIZES = {
  sm: "h-9 px-3 text-body-sm",
  md: "h-11 px-3.5 text-body",
  lg: "h-[52px] px-4 text-section",
} as const;

export type ControlSize = keyof typeof SIZES;

export function controlClass(size: ControlSize = "md", invalid = false) {
  return clsx(
    "w-full min-w-0 rounded-control border bg-canvas/70 text-ink outline-none transition-[color,background-color,border-color,box-shadow] duration-150 ease-out placeholder:text-ink-muted",
    "focus:bg-surface focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
    invalid
      ? "border-danger focus:border-danger focus:ring-danger/15"
      : "border-transparent hover:border-line focus:border-primary focus:ring-primary/15",
    SIZES[size]
  );
}

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  size?: ControlSize;
  invalid?: boolean;
};

export function Input({ size = "md", invalid = false, className, ...rest }: InputProps) {
  return (
    <input
      aria-invalid={invalid || undefined}
      className={clsx(controlClass(size, invalid), className)}
      {...rest}
    />
  );
}

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  invalid?: boolean;
};

/**
 * 모바일 다중 행 텍스트 입력.
 * - Input과 동일한 연회색 채움(`bg-canvas/70`) + 포커스 시 흰 배경·Primary 테두리·링
 * - `maxLength`가 주어지면 우측 하단에 실시간 글자수 카운터(`현재 / 최대`) 표시
 */
export function Textarea({
  invalid = false,
  rows = 3,
  maxLength,
  value: controlled,
  defaultValue,
  onChange,
  className,
  ...rest
}: TextareaProps) {
  const [inner, setInner] = useState(() => String(defaultValue ?? ""));
  const current = controlled !== undefined ? String(controlled) : inner;

  const box = (
    <textarea
      rows={rows}
      maxLength={maxLength}
      value={controlled}
      defaultValue={defaultValue}
      aria-invalid={invalid || undefined}
      onChange={(e) => {
        if (controlled === undefined) setInner(e.target.value);
        onChange?.(e);
      }}
      className={clsx(
        "w-full min-w-0 resize-y rounded-control border bg-canvas/70 px-3.5 py-3 text-body text-ink outline-none transition-[color,background-color,border-color,box-shadow] duration-150 ease-out placeholder:text-ink-muted",
        "focus:bg-surface focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
        invalid
          ? "border-danger focus:border-danger focus:ring-danger/15"
          : "border-transparent hover:border-line focus:border-primary focus:ring-primary/15",
        className
      )}
      {...rest}
    />
  );

  if (!maxLength) return box;

  return (
    <div className="flex w-full flex-col gap-1">
      {box}
      <div className="text-right text-caption tabular-nums text-ink-muted">
        {current.length} / {maxLength}
      </div>
    </div>
  );
}

export type SearchBarProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> & {
  size?: ControlSize;
  /** 우측에 붙는 액션 버튼 문구 (기본 "검색") */
  buttonLabel?: ReactNode;
  buttonVariant?: ButtonVariant;
  loading?: boolean;
  onClear?: () => void;
};

/**
 * 인풋 + 버튼 결합형(검색창·쿠폰코드 입력창 등).
 * - 좌측 돋보기 아이콘 + 검색어 입력 시 나타나는 지우기(×) 버튼 + 우측에 붙은 실행 버튼
 */
export function SearchBar({
  size = "md",
  buttonLabel = "검색",
  buttonVariant = "primary",
  loading = false,
  value: controlled,
  defaultValue,
  onChange,
  onClear,
  disabled,
  className,
  ...rest
}: SearchBarProps) {
  const [inner, setInner] = useState(() => String(defaultValue ?? ""));
  const val = controlled !== undefined ? String(controlled) : inner;
  const inputRef = useRef<HTMLInputElement>(null);

  function clear() {
    if (controlled === undefined) setInner("");
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
    onClear?.();
  }

  return (
    <div className={clsx("flex w-full items-center gap-2", className)}>
      <div className="relative flex min-w-0 flex-1 items-center">
        <SearchIcon className="pointer-events-none absolute left-3.5 size-4 text-ink-muted" />
        <input
          ref={inputRef}
          type="search"
          disabled={disabled}
          value={controlled}
          defaultValue={defaultValue}
          onChange={(e) => {
            if (controlled === undefined) setInner(e.target.value);
            onChange?.(e);
          }}
          className={clsx(
            controlClass(size, false),
            "pl-9 [&::-webkit-search-cancel-button]:hidden",
            val.length > 0 && "pr-9"
          )}
          {...rest}
        />
        {val.length > 0 && !disabled && (
          <button
            type="button"
            aria-label="검색어 지우기"
            onClick={clear}
            className="pressable absolute right-2 inline-flex size-6 cursor-pointer items-center justify-center rounded-full bg-line/80 text-ink-secondary outline-transparent hover:bg-line-strong hover:text-ink focus-visible:outline-2 focus-visible:outline-primary"
          >
            <CloseIcon className="size-3.5" />
          </button>
        )}
      </div>
      {buttonLabel && (
        <Button
          type="submit"
          size={size}
          variant={buttonVariant}
          disabled={disabled}
          loading={loading}
          className="shrink-0"
        >
          {buttonLabel}
        </Button>
      )}
    </div>
  );
}

export type FieldProps = {
  label: string;
  htmlFor: string;
  required?: boolean;
  help?: string;
  error?: string;
  children: ReactNode;
};

export function Field({ label, htmlFor, required, help, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-body-sm font-semibold text-ink-secondary">
        {label}
        {required && (
          <span aria-hidden="true" className="ml-0.5 text-danger">
            *
          </span>
        )}
      </label>
      {children}
      {error ? (
        <p role="alert" className="text-caption text-danger">
          {error}
        </p>
      ) : (
        help && <p className="text-caption text-ink-muted">{help}</p>
      )}
    </div>
  );
}
