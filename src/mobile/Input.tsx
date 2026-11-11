import type { InputHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

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
