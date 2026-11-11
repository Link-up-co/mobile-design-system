import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

const VARIANTS = {
  primary:
    "border-primary bg-primary text-primary-fg not-disabled:hover:bg-primary-hover not-disabled:active:bg-primary-hover",
  soft: "border-transparent bg-primary-soft text-primary not-disabled:hover:brightness-95 not-disabled:active:brightness-90",
  secondary:
    "border-line bg-surface text-ink not-disabled:hover:border-line-strong not-disabled:hover:bg-surface-subtle not-disabled:active:bg-canvas",
  danger:
    "border-danger bg-danger text-white not-disabled:hover:bg-danger-hover not-disabled:active:bg-danger-hover",
  ghost:
    "border-transparent bg-transparent text-ink-secondary not-disabled:hover:bg-canvas not-disabled:hover:text-ink not-disabled:active:bg-line/60",
} as const;

const SIZES = {
  sm: "h-9 px-3 text-body-sm",
  md: "h-11 px-4 text-body",
  lg: "h-[52px] px-5 text-section",
} as const;

export type ButtonVariant = keyof typeof VARIANTS;
export type ButtonSize = keyof typeof SIZES;

export function buttonClass(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  fullWidth = false
) {
  return clsx(
    "pressable relative inline-flex cursor-pointer select-none items-center justify-center gap-1.5 whitespace-nowrap rounded-control border font-semibold",
    "outline-offset-0 outline-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    "disabled:cursor-not-allowed disabled:not-aria-busy:opacity-45 aria-busy:cursor-wait",
    VARIANTS[variant],
    SIZES[size],
    fullWidth && "w-full"
  );
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  icon?: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  type = "button",
  disabled,
  icon,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={clsx(buttonClass(variant, size, fullWidth), className)}
      {...rest}
    >
      <span className={clsx("inline-flex items-center gap-1.5 transition-opacity", loading && "opacity-0")}>
        {icon}
        {children}
      </span>
      {loading && (
        <span
          aria-hidden="true"
          className="absolute inset-0 m-auto size-4 animate-[spin_0.6s_linear_infinite] rounded-full border-2 border-current border-t-transparent transition-opacity starting:opacity-0"
        />
      )}
    </button>
  );
}

export type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  "aria-label": string;
  icon: ReactNode;
  size?: "sm" | "md";
  badge?: number;
};

export function IconButton({
  size = "md",
  badge,
  icon,
  type = "button",
  className,
  ...rest
}: IconButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        "pressable relative inline-flex shrink-0 cursor-pointer select-none items-center justify-center rounded-control text-ink outline-transparent hover:bg-canvas active:bg-line/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-45",
        size === "sm" ? "size-9" : "size-11",
        className
      )}
      {...rest}
    >
      {icon}
      {badge !== undefined && badge > 0 && (
        <span className="pointer-events-none absolute top-1 right-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] leading-none font-bold tabular-nums text-primary-fg ring-2 ring-surface">
          {badge > 99 ? "99+" : badge}
        </span>
      )}
    </button>
  );
}
