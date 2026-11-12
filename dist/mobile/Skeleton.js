import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
/**
 * 데이터 패칭 중 레이아웃 흔들림(CLS)을 막는 쉬머 `Skeleton`.
 */
export function Skeleton({ variant = "rect", className }) {
    return (_jsx("div", { "aria-hidden": "true", "data-skeleton": "", className: clsx("relative overflow-hidden bg-zinc-200/75", variant === "rect" && "rounded-control", variant === "card" && "rounded-card", variant === "circle" && "rounded-full", variant === "text" && "h-3.5 rounded-[4px]", className), children: _jsx("div", { style: {
                background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.62) 50%, rgba(255,255,255,0) 100%)",
                animation: "mds-shimmer 1.5s infinite ease-in-out",
            }, className: "absolute inset-0 motion-reduce:hidden" }) }));
}
/**
 * `ProductCard` (`grid` / `list`) 규격과 1:1로 일치하는 스켈레톤 프리셋.
 */
export function ProductCardSkeleton({ variant = "grid", className, }) {
    if (variant === "list") {
        return (_jsxs("div", { "aria-hidden": "true", "data-product-skeleton": "list", className: clsx("flex items-center gap-3.5 py-3.5", className), children: [_jsx(Skeleton, { variant: "card", className: "size-24 shrink-0" }), _jsxs("div", { className: "min-w-0 flex-1 space-y-2", children: [_jsx(Skeleton, { variant: "text", className: "w-16" }), _jsx(Skeleton, { variant: "text", className: "w-4/5" }), _jsx(Skeleton, { variant: "text", className: "h-5 w-28" })] })] }));
    }
    return (_jsxs("div", { "aria-hidden": "true", "data-product-skeleton": "grid", className: clsx("space-y-2.5", className), children: [_jsx(Skeleton, { variant: "card", className: "aspect-square w-full" }), _jsxs("div", { className: "space-y-1.5 px-0.5", children: [_jsx(Skeleton, { variant: "text", className: "w-14" }), _jsx(Skeleton, { variant: "text", className: "w-full" }), _jsx(Skeleton, { variant: "text", className: "h-5 w-24" })] })] }));
}
