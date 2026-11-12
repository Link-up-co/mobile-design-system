import { jsx as _jsx } from "react/jsx-runtime";
import clsx from "clsx";
const VARIANT_CLASSES = {
    solid: "bg-ink text-surface",
    primary: "bg-primary-soft text-primary",
    danger: "bg-danger-soft text-danger",
    warning: "bg-warning-soft text-warning",
    success: "bg-success-soft text-success",
    neutral: "bg-canvas text-ink-secondary",
};
/**
 * 한국 커머스 표준 상품 라벨 문구에서 기본 시맨틱 톤을 자동 추론.
 */
export function inferTagVariant(label) {
    const clean = label.trim().toUpperCase();
    if (clean.includes("베스트") || clean === "BEST" || clean.includes("1위")) {
        return "solid";
    }
    if (clean.includes("인기") || clean === "HOT" || clean.includes("특가") || clean.includes("마감")) {
        return "danger";
    }
    if (clean.includes("행사") || clean.includes("이벤트") || clean.includes("한정") || clean.includes("할인")) {
        return "warning";
    }
    if (clean.includes("추천") || clean.includes("픽업") || clean.includes("단독")) {
        return "primary";
    }
    if (clean.includes("신상") || clean === "NEW" || clean.includes("증정")) {
        return "success";
    }
    return "neutral";
}
function resolveCustomHexStyle(hex) {
    const m = /^#([0-9a-fA-F]{6})$/.exec(hex.trim());
    if (!m)
        return undefined;
    const raw = m[1];
    const r = parseInt(raw.slice(0, 2), 16);
    const g = parseInt(raw.slice(2, 4), 16);
    const b = parseInt(raw.slice(4, 6), 16);
    const mix = (c) => Math.round(c * 0.12 + 255 * 0.88)
        .toString(16)
        .padStart(2, "0");
    return {
        color: `#${raw.toUpperCase()}`,
        backgroundColor: `#${mix(r)}${mix(g)}${mix(b)}`.toUpperCase(),
    };
}
/**
 * 모바일 상품·상태 라벨 태그 (`베스트`, `인기`, `행사`, `추천` 등).
 * - 테두리선 없이 정갈한 소프트 틴트(또는 블랙 솔리드) 채움으로 썸네일·가격과 시선 충돌 방지
 */
export function Tag({ variant, color, style, className, children, ...rest }) {
    const resolvedVariant = variant ?? (typeof children === "string" ? inferTagVariant(children) : "primary");
    const customStyle = color ? resolveCustomHexStyle(color) : undefined;
    return (_jsx("span", { "data-tag-variant": customStyle ? "custom" : resolvedVariant, style: customStyle ? { ...customStyle, ...style } : style, className: clsx("inline-flex h-5 shrink-0 items-center justify-center rounded-[4px] px-1.5 text-[11px] leading-none font-bold tracking-tight whitespace-nowrap", !customStyle && VARIANT_CLASSES[resolvedVariant], className), ...rest, children: children }));
}
export function TagList({ tags, className, }) {
    if (!tags || tags.length === 0)
        return null;
    return (_jsx("div", { "data-product-tags": "", className: clsx("flex flex-wrap items-center gap-1", className), children: tags.map((t, idx) => {
            if (typeof t === "string") {
                return _jsx(Tag, { children: t }, `${t}-${idx}`);
            }
            return (_jsx(Tag, { variant: t.variant, color: t.color, children: t.label }, `${t.label}-${idx}`));
        }) }));
}
