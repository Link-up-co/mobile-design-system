"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { IconButton } from "./Button.js";
import { BackIcon } from "./icons.js";
/**
 * 모바일 상단 앱 헤더 (높이 52px + 상단 safe-area).
 * - 좌측 뒤로가기 버튼 + 바로 옆 좌측 정렬 타이틀(길어지면 `...` 말줄임) + 우측 기능 버튼 1~2개
 */
export function AppHeader({ title, showBack = true, onBack, actions, sticky = true, bordered = true, className, }) {
    function handleBack() {
        if (onBack) {
            onBack();
        }
        else if (typeof window !== "undefined") {
            window.history.back();
        }
    }
    return (_jsx("header", { className: clsx("w-full bg-surface text-ink pt-[env(safe-area-inset-top,0px)]", sticky && "sticky top-0 z-30", bordered && "border-b border-line", className), children: _jsxs("div", { className: "flex h-13 items-center justify-between gap-1 px-1.5", children: [_jsxs("div", { className: "flex min-w-0 flex-1 items-center gap-0.5", children: [showBack && (_jsx(IconButton, { "aria-label": "\uB4A4\uB85C\uAC00\uAE30", icon: _jsx(BackIcon, {}), onClick: handleBack })), title && (_jsx("h1", { className: clsx("min-w-0 flex-1 truncate text-section font-bold text-ink", !showBack && "pl-2.5"), children: title }))] }), actions && _jsx("div", { className: "flex shrink-0 items-center", children: actions })] }) }));
}
