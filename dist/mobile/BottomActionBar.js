"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import clsx from "clsx";
import { Button } from "./Button.js";
/**
 * 모바일 하단 고정 블록 버튼 (`52px` lg 블록 CTA + Safe Area 대응).
 * - 단일 블록 버튼, `[보조 버튼 + 주 버튼]` 2분할, `[좌측 찜 아이콘 + 주 버튼]`, 상단 금액 요약 슬롯 모두 지원
 * - `position="fixed"` 시 본문 가림 방지 스페이서(`reserveSpace`) 자동 확보
 */
export function FixedBottomButton({ children, variant = "primary", loading = false, disabled, icon, leading, secondaryAction, topSlot, position = "fixed", reserveSpace = true, maxWidthClassName = "max-w-[412px]", className, ...buttonRest }) {
    const barInner = (_jsxs("div", { "data-bottom-action-inner": "", className: clsx("mx-auto w-full border-t border-line bg-surface/92 px-5 pt-3 backdrop-blur-md", position === "static"
            ? "pb-3"
            : "pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]", position === "fixed" && maxWidthClassName, className), children: [topSlot && _jsx("div", { className: "mb-2.5", children: topSlot }), _jsxs("div", { className: "flex w-full items-center gap-2", children: [leading && _jsx("div", { className: "flex shrink-0 items-center", children: leading }), secondaryAction && (_jsx(Button, { size: "lg", variant: secondaryAction.variant ?? "secondary", disabled: secondaryAction.disabled, loading: secondaryAction.loading, onClick: secondaryAction.onClick, className: "flex-1", children: secondaryAction.label })), _jsx(Button, { size: "lg", variant: variant, loading: loading, disabled: disabled, icon: icon, className: clsx(secondaryAction ? "flex-[1.6]" : "flex-1"), ...buttonRest, children: children })] })] }));
    if (position === "static") {
        return (_jsx("div", { "data-bottom-action-bar": "", "data-position": "static", className: "w-full", children: barInner }));
    }
    if (position === "sticky") {
        return (_jsx("div", { "data-bottom-action-bar": "", "data-position": "sticky", className: "sticky bottom-0 z-30 w-full", children: barInner }));
    }
    return (_jsxs(_Fragment, { children: [reserveSpace && (_jsx("div", { "aria-hidden": "true", "data-bottom-action-spacer": "", className: clsx("w-full shrink-0", topSlot
                    ? "h-[calc(108px+env(safe-area-inset-bottom,0px))]"
                    : "h-[calc(76px+env(safe-area-inset-bottom,0px))]") })), _jsx("div", { "data-bottom-action-bar": "", "data-position": "fixed", className: "pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center", children: _jsx("div", { className: clsx("pointer-events-auto w-full", maxWidthClassName), children: barInner }) })] }));
}
