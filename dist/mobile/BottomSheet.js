"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useId, useState } from "react";
import clsx from "clsx";
import { CloseIcon } from "./icons.js";
import { renderOverlayPortal, resolveActiveBrand } from "./portal.js";
const EXIT_MS = 360;
/**
 * 모바일 바텀시트 (`rounded-t-sheet` 20px).
 * - 배경 디밍이 서서히 어두워지고(420ms), 시트 본체가 아래에서 부드럽게 올라옴(440ms)
 * - 닫힐 때도 배경과 시트가 동시에 천천히 내려간 뒤(340ms) 언마운트됨
 * - `title` 유/무 × `showClose` 유/무 × `footer` 유/무 조합 모두 지원
 */
export function BottomSheet({ open, onClose, title, showClose = true, footer, "aria-label": ariaLabel, children, className, }) {
    const [rendered, setRendered] = useState(open);
    const titleId = useId();
    if (open && !rendered) {
        setRendered(true);
    }
    const closing = !open && rendered;
    useEffect(() => {
        if (!closing)
            return;
        const reduced = typeof window !== "undefined" &&
            window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
        const timer = setTimeout(() => setRendered(false), reduced ? 0 : EXIT_MS);
        return () => clearTimeout(timer);
    }, [closing]);
    useEffect(() => {
        if (!open)
            return;
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const onKeyDown = (e) => {
            if (e.key === "Escape")
                onClose();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [open, onClose]);
    if (!open && !rendered)
        return null;
    const hasTitle = title !== undefined && title !== null && title !== "";
    const hasHeader = hasTitle || showClose;
    const hasFooter = footer !== undefined && footer !== null && footer !== false;
    return renderOverlayPortal(_jsxs("div", { "data-brand": resolveActiveBrand(), className: "fixed inset-0 z-50 flex items-end justify-center", children: [_jsx("div", { "aria-hidden": "true", "data-sheet-backdrop": "", onClick: onClose, style: {
                    animation: closing
                        ? `mds-backdrop-out ${EXIT_MS}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`
                        : "mds-backdrop-in 480ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
                }, className: "absolute inset-0 bg-black/45 backdrop-blur-[3px] motion-reduce:animate-none!" }), _jsxs("div", { role: "dialog", "aria-modal": "true", "aria-labelledby": hasTitle ? titleId : undefined, "aria-label": hasTitle ? undefined : (ariaLabel ?? "바텀시트"), "data-sheet-panel": "", style: {
                    animation: closing
                        ? `mds-sheet-out ${EXIT_MS}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`
                        : "mds-sheet-in 480ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
                }, className: clsx("relative z-10 flex w-full max-w-[412px] flex-col overflow-hidden rounded-t-sheet bg-surface text-ink shadow-2xl motion-reduce:animate-none!", className), children: [hasHeader && (_jsxs("div", { "data-sheet-header": "", className: clsx("flex items-center gap-3 px-5", hasTitle ? "pt-5 pb-3" : "justify-end pt-3.5 pb-1"), children: [hasTitle && (_jsx("h2", { id: titleId, className: "min-w-0 flex-1 truncate text-title font-bold text-ink", children: title })), showClose && (_jsx("button", { type: "button", "aria-label": "\uB2EB\uAE30", onClick: onClose, className: "pressable -mr-1.5 inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-control text-ink-muted outline-transparent hover:bg-canvas hover:text-ink focus-visible:outline-2 focus-visible:outline-primary", children: _jsx(CloseIcon, { className: "size-5" }) }))] })), _jsx("div", { "data-sheet-body": "", className: clsx("subtle-scrollbar max-h-[72dvh] overflow-y-auto px-5", !hasHeader && "pt-4", hasFooter
                            ? "pb-4"
                            : "pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))]"), children: children }), hasFooter && (_jsx("div", { "data-sheet-footer": "", className: "border-t border-line bg-surface px-5 pt-3 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]", children: footer }))] })] }));
}
