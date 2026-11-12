import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { AlertCircleIcon } from "./icons.js";
/**
 * 검색 결과 없음 · 빈 장바구니 · 내역 없음 안내용 미니멀 `EmptyState`.
 */
export function EmptyState({ icon, title, description, action, compact = false, className, }) {
    return (_jsxs("div", { "data-empty-state": "", className: clsx("flex w-full flex-col items-center justify-center px-6 text-center", compact ? "py-8" : "py-14", className), children: [_jsx("div", { className: "mb-3 inline-flex size-12 items-center justify-center rounded-full bg-surface-subtle text-ink-muted [&_svg]:size-6", children: icon ?? _jsx(AlertCircleIcon, {}) }), _jsx("p", { className: "break-keep text-body font-bold tracking-tight text-ink", children: title }), description && (_jsx("p", { className: "mt-1 max-w-[260px] break-keep text-body-sm leading-[1.45] text-ink-muted", children: description })), action && _jsx("div", { className: "mt-4", children: action })] }));
}
