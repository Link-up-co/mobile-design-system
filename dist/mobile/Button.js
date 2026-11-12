import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import clsx from "clsx";
const VARIANTS = {
    primary: "border-primary bg-primary text-primary-fg not-disabled:hover:bg-primary-hover not-disabled:active:bg-primary-hover",
    soft: "border-transparent bg-primary-soft text-primary not-disabled:hover:brightness-95 not-disabled:active:brightness-90",
    secondary: "border-line bg-surface text-ink not-disabled:hover:border-line-strong not-disabled:hover:bg-surface-subtle not-disabled:active:bg-canvas",
    danger: "border-danger bg-danger text-white not-disabled:hover:bg-danger-hover not-disabled:active:bg-danger-hover",
    ghost: "border-transparent bg-transparent text-ink-secondary not-disabled:hover:bg-canvas not-disabled:hover:text-ink not-disabled:active:bg-line/60",
};
const SIZES = {
    sm: "h-9 px-3 text-body-sm",
    md: "h-11 px-4 text-body",
    lg: "h-[52px] px-5 text-section",
};
export function buttonClass(variant = "primary", size = "md", fullWidth = false) {
    return clsx("pressable relative inline-flex cursor-pointer select-none items-center justify-center gap-1.5 whitespace-nowrap rounded-control border font-semibold", "outline-offset-0 outline-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary", "disabled:cursor-not-allowed disabled:not-aria-busy:opacity-45 aria-busy:cursor-wait", VARIANTS[variant], SIZES[size], fullWidth && "w-full");
}
export function Button({ variant = "primary", size = "md", fullWidth = false, loading = false, type = "button", disabled, icon, className, children, ...rest }) {
    return (_jsxs("button", { type: type, disabled: disabled || loading, "aria-busy": loading || undefined, className: clsx(buttonClass(variant, size, fullWidth), className), ...rest, children: [_jsxs("span", { className: clsx("inline-flex items-center gap-1.5 transition-opacity", loading && "opacity-0"), children: [icon, children] }), loading && (_jsx("span", { "aria-hidden": "true", className: "absolute inset-0 m-auto size-4 animate-[spin_0.6s_linear_infinite] rounded-full border-2 border-current border-t-transparent transition-opacity starting:opacity-0" }))] }));
}
export function IconButton({ size = "md", badge, icon, type = "button", className, ...rest }) {
    return (_jsxs("button", { type: type, className: clsx("pressable relative inline-flex shrink-0 cursor-pointer select-none items-center justify-center rounded-control text-ink outline-transparent hover:bg-canvas active:bg-line/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-45", size === "sm" ? "size-9" : "size-11", className), ...rest, children: [icon, badge !== undefined && badge > 0 && (_jsx("span", { className: "pointer-events-none absolute top-1 right-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] leading-none font-bold tabular-nums text-primary-fg ring-2 ring-surface", children: badge > 99 ? "99+" : badge }))] }));
}
