"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { BottomSheet } from "./BottomSheet.js";
import { controlClass } from "./Input.js";
import { CheckIcon, ChevronDownIcon, CloseIcon, SearchIcon } from "./icons.js";
const CHOSEONG = [
    "ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ",
    "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ",
];
const CHOSEONG_SET = new Set(CHOSEONG);
function toChoseong(ch) {
    const code = ch.charCodeAt(0);
    return code >= 0xac00 && code <= 0xd7a3 ? CHOSEONG[Math.floor((code - 0xac00) / 588)] : ch;
}
/** 일반 문자열·한글 초성('ㅅㅅ')·타이핑 중 혼합('강ㄴ') 검색 매칭 */
export function matchesKoreanQuery(target, query) {
    const q = query.replace(/\s+/g, "").toLowerCase();
    if (!q)
        return true;
    const t = target.replace(/\s+/g, "").toLowerCase();
    if (t.length < q.length)
        return false;
    if (t.includes(q))
        return true;
    const limit = t.length - q.length;
    for (let i = 0; i <= limit; i++) {
        let ok = true;
        for (let j = 0; j < q.length; j++) {
            const qChar = q[j];
            const tChar = t[i + j];
            if (CHOSEONG_SET.has(qChar) ? toChoseong(tChar) !== qChar : tChar !== qChar) {
                ok = false;
                break;
            }
        }
        if (ok)
            return true;
    }
    return false;
}
export function filterSelectOptions(options, query) {
    if (!query.trim())
        return [...options];
    return options.filter((o) => matchesKoreanQuery(o.label, query) ||
        (o.description ? matchesKoreanQuery(o.description, query) : false));
}
export function computeVirtualRange(count, itemHeight, scrollTop, viewportHeight, overscan = 5) {
    if (count === 0)
        return { start: 0, end: 0, offsetY: 0, totalHeight: 0 };
    const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const end = Math.min(count, Math.ceil((scrollTop + viewportHeight) / itemHeight) + overscan);
    return { start, end, offsetY: start * itemHeight, totalHeight: count * itemHeight };
}
const DEFAULT_VIEWPORT_H = 420;
/**
 * 바텀시트 연동 모바일 셀렉트 박스 (한글 초성 검색 + 가상 스크롤 내장).
 * - 클릭 시 바텀시트가 올라오고, 옵션을 선택하면 값 반영 후 시트가 부드럽게 내려감
 * - 대량 옵션에서도 보이는 구간만 DOM에 마운트해 버벅임 없이 스크롤됨
 */
export function Select({ id, name, options, value: controlled, defaultValue = "", placeholder = "선택해 주세요", title, searchable, searchPlaceholder = "검색어 또는 초성 입력", size = "md", invalid = false, disabled = false, defaultOpen = false, onChange, className, }) {
    const [inner, setInner] = useState(defaultValue);
    const [open, setOpen] = useState(defaultOpen);
    const [query, setQuery] = useState("");
    const [scrollTop, setScrollTop] = useState(0);
    const [viewportH, setViewportH] = useState(DEFAULT_VIEWPORT_H);
    const listRef = useRef(null);
    const current = controlled ?? inner;
    const selected = options.find((o) => o.value === current);
    const showSearch = searchable ?? options.length >= 8;
    const filtered = showSearch ? filterSelectOptions(options, query) : options;
    const itemHeight = options.some((o) => Boolean(o.description)) ? 60 : 48;
    useEffect(() => {
        if (!open)
            return;
        const el = listRef.current;
        if (!el)
            return;
        if (el.clientHeight > 0)
            setViewportH(el.clientHeight);
        const idx = options.findIndex((o) => o.value === current);
        const nextTop = idx > 2 ? Math.max(0, idx * itemHeight - itemHeight * 2) : 0;
        el.scrollTop = nextTop;
        setScrollTop(nextTop);
    }, [open, options, current, itemHeight]);
    function openSheet() {
        if (disabled)
            return;
        setQuery("");
        setScrollTop(0);
        setOpen(true);
    }
    function updateQuery(next) {
        setQuery(next);
        setScrollTop(0);
        if (listRef.current)
            listRef.current.scrollTop = 0;
    }
    function handleSelect(option) {
        if (option.disabled)
            return;
        if (controlled === undefined)
            setInner(option.value);
        onChange?.(option.value, option);
        setOpen(false);
    }
    const { start, end, offsetY, totalHeight } = computeVirtualRange(filtered.length, itemHeight, scrollTop, viewportH);
    const visibleSlice = filtered.slice(start, end);
    return (_jsxs(_Fragment, { children: [name && _jsx("input", { type: "hidden", name: name, value: current }), _jsxs("button", { id: id, type: "button", disabled: disabled, "aria-haspopup": "dialog", "aria-expanded": open, "aria-invalid": invalid || undefined, onClick: openSheet, className: clsx(controlClass(size, invalid), "pressable flex cursor-pointer items-center justify-between gap-2 text-left", open && !invalid && "border-primary! bg-surface! ring-2 ring-primary/15", className), children: [_jsx("span", { className: clsx("min-w-0 flex-1 truncate", selected ? "text-ink" : "text-ink-muted"), children: selected ? selected.label : placeholder }), _jsx(ChevronDownIcon, { open: open, className: "text-ink-muted" })] }), _jsxs(BottomSheet, { open: open, onClose: () => setOpen(false), title: title ?? placeholder, showClose: true, children: [showSearch && (_jsx("div", { className: "bg-surface pt-0.5 pb-2.5", children: _jsxs("div", { className: "relative flex items-center", children: [_jsx(SearchIcon, { className: "pointer-events-none absolute left-3.5 size-4 text-ink-muted" }), _jsx("input", { type: "search", value: query, onChange: (e) => updateQuery(e.target.value), placeholder: searchPlaceholder, "aria-label": searchPlaceholder, className: clsx(controlClass("md", false), "pl-9 [&::-webkit-search-cancel-button]:hidden", query.length > 0 && "pr-9") }), query.length > 0 && (_jsx("button", { type: "button", "aria-label": "\uAC80\uC0C9\uC5B4 \uC9C0\uC6B0\uAE30", onClick: () => updateQuery(""), className: "pressable absolute right-2 inline-flex size-6 cursor-pointer items-center justify-center rounded-full bg-line/80 text-ink-secondary hover:bg-line-strong hover:text-ink", children: _jsx(CloseIcon, { className: "size-3.5" }) }))] }) })), _jsx("div", { ref: listRef, onScroll: (e) => setScrollTop(e.currentTarget.scrollTop), className: clsx("subtle-scrollbar max-h-[50dvh] overflow-y-auto", showSearch && "min-h-[48dvh]"), children: filtered.length === 0 ? (_jsx("p", { className: "py-10 text-center text-body-sm text-ink-muted", children: "\uAC80\uC0C9 \uACB0\uACFC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." })) : (_jsx("div", { role: "listbox", "aria-label": title ?? placeholder, style: { height: `${totalHeight}px`, position: "relative" }, children: _jsx("div", { style: { transform: `translateY(${offsetY}px)` }, children: visibleSlice.map((o, localIdx) => {
                                    const index = start + localIdx;
                                    const active = o.value === current;
                                    return (_jsxs("button", { type: "button", role: "option", "aria-selected": active, disabled: o.disabled, style: { height: `${itemHeight}px` }, onClick: () => handleSelect(o), className: clsx("pressable flex w-full cursor-pointer items-center justify-between gap-3 text-left", index < filtered.length - 1 && "border-b border-line", o.disabled
                                            ? "cursor-not-allowed opacity-45"
                                            : active
                                                ? "text-primary"
                                                : "text-ink hover:text-primary"), children: [_jsxs("span", { className: "flex min-w-0 flex-col gap-0.5", children: [_jsx("span", { className: clsx("truncate text-body", active ? "font-semibold" : "font-medium"), children: o.label }), o.description && (_jsx("span", { className: "truncate text-caption text-ink-muted", children: o.description }))] }), active && _jsx(CheckIcon, { className: "text-primary" })] }, o.value));
                                }) }) })) })] })] }));
}
