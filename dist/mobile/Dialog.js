"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useId, useState } from "react";
import clsx from "clsx";
import { Button } from "./Button.js";
import { renderOverlayPortal, resolveActiveBrand } from "./portal.js";
const EXIT_MS = 240;
/**
 * 모바일 중앙 확인·경고 모달 (`Dialog` — `AlertDialog` / `ConfirmDialog` 겸용).
 * - `BottomSheet`와 일관된 `backdrop-blur-[3px]` 디밍 애니메이션 + 스프링 팝인/아웃
 * - `cancelLabel` 유무에 따라 1버튼(알럿) / 2버튼(확인·취소) 레이아웃 자동 전환
 */
export function Dialog({ open, onClose, title, description, children, confirmLabel = "확인", cancelLabel, onConfirm, onCancel, confirmVariant = "primary", loading = false, closeOnBackdrop = true, className, }) {
    const [rendered, setRendered] = useState(open);
    const titleId = useId();
    const descId = useId();
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
            if (e.key === "Escape" && !loading)
                onClose();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [open, onClose, loading]);
    if (!open && !rendered)
        return null;
    const hasCancel = Boolean(cancelLabel);
    const hasDesc = description !== undefined && description !== null && description !== "";
    return renderOverlayPortal(_jsxs("div", { "data-brand": resolveActiveBrand(), className: "fixed inset-0 z-50 flex items-center justify-center p-5", children: [_jsx("div", { "aria-hidden": "true", "data-dialog-backdrop": "", onClick: () => {
                    if (closeOnBackdrop && !loading)
                        onClose();
                }, style: {
                    animation: closing
                        ? `mds-backdrop-out ${EXIT_MS}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`
                        : "mds-backdrop-in 280ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
                }, className: "absolute inset-0 bg-black/45 backdrop-blur-[3px] motion-reduce:animate-none!" }), _jsxs("div", { role: confirmVariant === "danger" ? "alertdialog" : "dialog", "aria-modal": "true", "aria-labelledby": titleId, "aria-describedby": hasDesc ? descId : undefined, "data-dialog-panel": "", style: {
                    animation: closing
                        ? `mds-dialog-out ${EXIT_MS}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`
                        : "mds-dialog-in 300ms cubic-bezier(0.22, 1.18, 0.36, 1) forwards",
                }, className: clsx("relative z-10 w-full max-w-[332px] overflow-hidden rounded-[16px] bg-surface p-5 text-ink shadow-2xl motion-reduce:animate-none!", className), children: [_jsxs("div", { className: "space-y-2 text-center", children: [_jsx("h2", { id: titleId, className: "break-keep text-[17px] leading-[1.35] font-bold tracking-tight text-ink", children: title }), hasDesc && (_jsx("p", { id: descId, className: "break-keep text-body-sm leading-[1.5] text-ink-secondary", children: description }))] }), children && _jsx("div", { className: "mt-3.5", children: children }), _jsxs("div", { className: clsx("mt-5 grid gap-2", hasCancel ? "grid-cols-2" : "grid-cols-1"), children: [hasCancel && (_jsx(Button, { variant: "secondary", fullWidth: true, disabled: loading, onClick: () => {
                                    onCancel?.();
                                    onClose();
                                }, children: cancelLabel })), _jsx(Button, { variant: confirmVariant === "danger" ? "danger" : "primary", fullWidth: true, loading: loading, onClick: () => {
                                    if (onConfirm) {
                                        onConfirm();
                                    }
                                    else {
                                        onClose();
                                    }
                                }, children: confirmLabel })] })] })] }));
}
