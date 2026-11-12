"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import clsx from "clsx";
import { formatCurrency } from "../tokens/index.js";
import { TagList } from "./Tag.js";
import { CartIcon, HeartIcon } from "./icons.js";
export function computeDiscountRate(price, originalPrice) {
    if (!originalPrice || originalPrice <= price || originalPrice <= 0)
        return 0;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
}
const SPARK_ANGLES = [
    { deg: 0, color: "#EF4444" },
    { deg: 45, color: "#FB7185" },
    { deg: 90, color: "#F59E0B" },
    { deg: 135, color: "#F43F5E" },
    { deg: 180, color: "#EF4444" },
    { deg: 225, color: "#FB923C" },
    { deg: 270, color: "#FB7185" },
    { deg: 315, color: "#F59E0B" },
];
function WishToggleButton({ wished, burstSeq, onToggle, className, }) {
    return (_jsxs("button", { type: "button", "aria-label": wished ? "찜 해제" : "찜하기", "aria-pressed": wished, onClick: onToggle, className: clsx("pressable relative inline-flex cursor-pointer select-none items-center justify-center outline-transparent focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary", wished ? "text-danger" : "text-ink-secondary hover:text-ink", className), children: [burstSeq > 0 && wished && (_jsxs("span", { "aria-hidden": "true", "data-wish-burst": "", className: "pointer-events-none absolute inset-0 z-20 flex items-center justify-center overflow-visible motion-reduce:hidden", children: [_jsx("span", { style: { animation: "mds-heart-ring 700ms cubic-bezier(0.22, 1, 0.36, 1) forwards" }, className: "absolute size-6 rounded-full border-[1.5px] border-danger/65" }), SPARK_ANGLES.map((s) => (_jsx("span", { style: { transform: `rotate(${s.deg}deg)` }, className: "absolute flex items-center justify-center", children: _jsx("span", { style: {
                                backgroundColor: s.color,
                                animation: "mds-heart-spark 720ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
                            }, className: "size-1.5 rounded-full" }) }, s.deg)))] }, `fx-${burstSeq}`)), _jsx("span", { style: burstSeq > 0
                    ? {
                        animation: wished
                            ? "mds-heart-pop 640ms cubic-bezier(0.25, 0.8, 0.25, 1)"
                            : "mds-heart-unpop 320ms cubic-bezier(0.25, 0.8, 0.25, 1)",
                    }
                    : undefined, className: "relative z-10 inline-flex motion-reduce:animate-none!", children: _jsx(HeartIcon, { filled: wished, className: "size-[21px]" }) }, `icon-${burstSeq}`)] }));
}
/**
 * 모바일 상품 카드 (`grid` 1/2 카드 · `list` 가로 전체 카드).
 * - 스트레치드 링크 패턴으로 `<a>`/`<button>` 중첩 없이 카드 본체 터치와 찜·장바구니 버튼 터치를 분리
 */
export function ProductCard({ variant = "grid", name, subtitle, price, originalPrice, tags, imageSrc, imageAlt, thumbnail, href, onClick, soldOut = false, wished: controlledWished, defaultWished = false, onWishToggle, onCartClick, className, }) {
    const [innerWished, setInnerWished] = useState(defaultWished);
    const [burstSeq, setBurstSeq] = useState(0);
    const isWished = controlledWished ?? innerWished;
    const discount = computeDiscountRate(price, originalPrice);
    function toggleWish() {
        const next = !isWished;
        setBurstSeq((n) => n + 1);
        if (controlledWished === undefined)
            setInnerWished(next);
        onWishToggle?.(next);
    }
    const media = imageSrc ? (_jsx("img", { src: imageSrc, alt: imageAlt ?? name, loading: "lazy", className: "size-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]" })) : (thumbnail ?? _jsx("div", { className: "size-full bg-canvas" }));
    const soldOutOverlay = soldOut && (_jsx("div", { className: "pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40", children: _jsx("span", { className: "rounded-full bg-black/70 px-2.5 py-1 text-caption font-semibold tracking-wide text-white", children: "\uC77C\uC2DC\uD488\uC808" }) }));
    const titleNode = href ? (_jsx("a", { href: href, onClick: onClick, className: "card-link line-clamp-2 text-body-sm leading-[1.4] font-medium text-ink outline-transparent after:absolute after:inset-0 focus-visible:underline", children: name })) : onClick ? (_jsx("button", { type: "button", onClick: onClick, className: "card-link line-clamp-2 cursor-pointer text-left text-body-sm leading-[1.4] font-medium text-ink outline-transparent after:absolute after:inset-0 focus-visible:underline", children: name })) : (_jsx("span", { className: "line-clamp-2 text-body-sm leading-[1.4] font-medium text-ink", children: name }));
    const priceBlock = (_jsxs("div", { className: "flex flex-col", children: [discount > 0 && originalPrice && (_jsx("span", { className: "text-caption tabular-nums text-ink-muted line-through", children: formatCurrency(originalPrice) })), _jsxs("div", { className: "flex items-baseline gap-1", children: [discount > 0 && (_jsxs("span", { className: "text-body font-bold tabular-nums text-danger", children: [discount, "%"] })), _jsx("span", { className: clsx("text-section font-bold tabular-nums", soldOut ? "text-ink-muted" : "text-ink"), children: formatCurrency(price) })] })] }));
    if (variant === "list") {
        return (_jsxs("article", { "data-variant": "list", className: clsx("group relative flex w-full items-center gap-3.5 px-4 py-3.5 transition-colors duration-150 ease-out has-[.card-link:active]:bg-canvas/70", className), children: [_jsxs("div", { className: "relative size-24 shrink-0 overflow-hidden rounded-card bg-canvas/70 transition-[scale] duration-135 ease-out group-has-[.card-link:active]:scale-[0.97] motion-reduce:transition-none", children: [media, soldOutOverlay] }), _jsxs("div", { className: "flex min-h-24 min-w-0 flex-1 flex-col justify-between", children: [_jsxs("div", { className: "flex items-start justify-between gap-2", children: [_jsxs("div", { className: "min-w-0 flex-1 space-y-0.5", children: [subtitle && _jsx("p", { className: "truncate text-caption text-ink-muted", children: subtitle }), titleNode] }), onWishToggle && (_jsx(WishToggleButton, { wished: isWished, burstSeq: burstSeq, onToggle: toggleWish, className: "z-20 -mt-2 -mr-2.5 size-11 shrink-0 rounded-full" }))] }), _jsxs("div", { className: "mt-2 flex items-end justify-between gap-2", children: [_jsxs("div", { className: "min-w-0 space-y-1.5", children: [priceBlock, _jsx(TagList, { tags: tags })] }), onCartClick && (_jsx("button", { type: "button", "aria-label": "\uC7A5\uBC14\uAD6C\uB2C8 \uB2F4\uAE30", disabled: soldOut, onClick: onCartClick, className: "pressable relative z-10 inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-line bg-surface text-ink outline-transparent hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-40", children: _jsx(CartIcon, { className: "size-[18px]" }) }))] })] })] }));
    }
    return (_jsxs("article", { "data-variant": "grid", className: clsx("group relative flex min-w-0 flex-col transition-[scale] duration-135 ease-out has-[.card-link:active]:scale-[0.98] motion-reduce:transition-none", className), children: [_jsxs("div", { className: "relative aspect-square w-full overflow-hidden rounded-card bg-canvas/70", children: [media, soldOutOverlay] }), (onWishToggle || onCartClick) && (_jsxs("div", { "data-card-actions": "", className: "relative z-10 mt-2 flex h-10 w-full rounded-control border border-line bg-surface", children: [onWishToggle && (_jsx(WishToggleButton, { wished: isWished, burstSeq: burstSeq, onToggle: toggleWish, className: clsx("z-20 h-full hover:bg-surface-subtle active:bg-canvas", onCartClick
                            ? "w-12 shrink-0 rounded-l-[7px] border-r border-line"
                            : "w-full rounded-[7px]") })), onCartClick && (_jsxs("button", { type: "button", disabled: soldOut, onClick: onCartClick, className: clsx("pressable inline-flex h-full flex-1 cursor-pointer select-none items-center justify-center gap-1.5 px-2.5 text-body-sm font-semibold text-ink outline-transparent hover:bg-surface-subtle active:bg-canvas focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-45", onWishToggle ? "rounded-r-[7px]" : "rounded-[7px]"), children: [_jsx(CartIcon, { className: "size-[18px]" }), "\uB2F4\uAE30"] }))] })), _jsxs("div", { className: "mt-2 flex min-w-0 flex-col gap-1", children: [subtitle && _jsx("p", { className: "truncate text-caption text-ink-muted", children: subtitle }), titleNode, _jsx("div", { className: "mt-0.5", children: priceBlock }), _jsx(TagList, { tags: tags, className: "mt-0.5" })] })] }));
}
