import { jsx as _jsx } from "react/jsx-runtime";
import clsx from "clsx";
const VARIANTS = {
    hero: "text-hero font-bold",
    title: "text-title font-bold",
    section: "text-section font-semibold",
    body: "text-body font-normal",
    "body-sm": "text-body-sm font-normal",
    caption: "text-caption font-medium",
    price: "text-price font-extrabold tabular-nums",
};
const TONES = {
    ink: "text-ink",
    secondary: "text-ink-secondary",
    muted: "text-ink-muted",
    primary: "text-primary",
    danger: "text-danger",
    success: "text-success",
};
export function Text({ as, variant = "body", tone = "ink", className, children, ...rest }) {
    const Tag = as ?? (variant === "hero" || variant === "title" ? "h1" : variant === "section" ? "h2" : "span");
    return (_jsx(Tag, { className: clsx(VARIANTS[variant], TONES[tone], className), ...rest, children: children }));
}
