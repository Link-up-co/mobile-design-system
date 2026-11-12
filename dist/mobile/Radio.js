"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import clsx from "clsx";
/**
 * 기본 원형 라디오 버튼 (20×20px).
 * - 선택 시 바깥 원이 Primary로 물들고 안쪽 흰 원이 중심에서 탄력 있게 커짐(scale-0 -> scale-100)
 */
export function Radio({ label, description, disabled, className, ...rest }) {
    return (_jsxs("label", { className: clsx("group inline-flex min-h-9 cursor-pointer touch-manipulation select-none items-start gap-2.5 py-1 text-body text-ink [-webkit-tap-highlight-color:transparent]", "has-disabled:cursor-not-allowed has-disabled:opacity-50", className), children: [_jsxs("span", { className: "relative mt-0.5 inline-flex size-5 shrink-0 items-center justify-center", children: [_jsx("input", { type: "radio", disabled: disabled, className: clsx("peer size-5 cursor-[inherit] appearance-none rounded-full border border-line-strong bg-surface", "transition-[background-color,border-color,scale] duration-150 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]", "checked:border-primary checked:bg-primary", "not-checked:group-hover:border-ink-muted", "group-active:not-disabled:scale-90 motion-reduce:group-active:scale-100", "outline-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"), ...rest }), _jsx("span", { "aria-hidden": "true", className: "pointer-events-none absolute size-2 scale-0 rounded-full bg-primary-fg transition-[transform,scale] duration-160 ease-[cubic-bezier(0.22,1,0.36,1)] peer-checked:scale-100" })] }), (label || description) && (_jsxs("span", { className: "flex min-w-0 flex-col gap-0.5", children: [label && _jsx("span", { className: "leading-[1.4] font-medium text-ink", children: label }), description && _jsx("span", { className: "text-body-sm text-ink-muted", children: description })] }))] }));
}
export function RadioGroup({ name, options, value: controlled, defaultValue = "", onChange, direction = "vertical", "aria-label": ariaLabel, className, }) {
    const [inner, setInner] = useState(defaultValue);
    const current = controlled ?? inner;
    return (_jsx("div", { role: "radiogroup", "aria-label": ariaLabel, className: clsx(direction === "horizontal" ? "flex flex-wrap items-center gap-x-5 gap-y-2" : "flex flex-col gap-1.5", className), children: options.map((o) => (_jsx(Radio, { name: name, value: o.value, label: o.label, description: o.description, disabled: o.disabled, checked: current === o.value, onChange: () => {
                if (controlled === undefined)
                    setInner(o.value);
                onChange?.(o.value);
            } }, o.value))) }));
}
const COLS = {
    0: "flex flex-wrap gap-2",
    2: "grid grid-cols-2 gap-2",
    3: "grid grid-cols-3 gap-2",
    4: "grid grid-cols-4 gap-2",
};
/**
 * 버튼형 라디오 그룹 (`outline` 옵션 버튼형 / `segmented` 세그먼트 탭형).
 * - 내부에 실제 `<input type="radio" className="sr-only">`를 두어 폼 전송과 방향키(←/→) 키보드 탐색이 네이티브 그대로 동작
 */
export function RadioButtonGroup({ name, options, value: controlled, defaultValue = "", onChange, variant = "outline", columns = 2, size = "md", "aria-label": ariaLabel, className, }) {
    const [inner, setInner] = useState(defaultValue);
    const [bouncedVal, setBouncedVal] = useState(null);
    const current = controlled ?? inner;
    const select = (val) => {
        setBouncedVal(val);
        if (controlled === undefined)
            setInner(val);
        onChange?.(val);
    };
    if (variant === "segmented") {
        const count = Math.max(1, options.length);
        const activeIndex = options.findIndex((o) => o.value === current);
        return (_jsxs("div", { role: "radiogroup", "aria-label": ariaLabel, className: clsx("relative grid auto-cols-fr grid-flow-col rounded-control bg-canvas p-1", className), children: [activeIndex >= 0 && (_jsx("span", { "aria-hidden": "true", "data-segmented-thumb": "", style: {
                        width: `calc((100% - 8px) / ${count})`,
                        transform: `translateX(${activeIndex * 100}%)`,
                    }, className: "pointer-events-none absolute top-1 bottom-1 left-1 rounded-[6px] bg-surface shadow-xs transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none" })), options.map((o) => {
                    const active = current === o.value;
                    return (_jsxs("label", { className: clsx("pressable relative z-10 flex cursor-pointer select-none items-center justify-center rounded-[6px] px-3 text-center font-semibold", size === "sm" ? "h-8 text-body-sm" : "h-9 text-body-sm", o.disabled && "cursor-not-allowed opacity-45", active ? "text-ink" : "text-ink-muted hover:text-ink-secondary", "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-1 has-[:focus-visible]:outline-primary"), children: [_jsx("input", { type: "radio", name: name, value: o.value, disabled: o.disabled, checked: active, onChange: () => select(o.value), className: "sr-only" }), _jsx("span", { className: "truncate", children: o.label })] }, o.value));
                })] }));
    }
    return (_jsx("div", { role: "radiogroup", "aria-label": ariaLabel, className: clsx(COLS[columns], className), children: options.map((o) => {
            const active = current === o.value;
            const bouncing = active && bouncedVal === o.value;
            return (_jsxs("label", { style: bouncing
                    ? { animation: "mds-radio-bounce 340ms cubic-bezier(0.22, 1, 0.36, 1)" }
                    : undefined, className: clsx("relative flex cursor-pointer touch-manipulation select-none flex-col items-center justify-center overflow-hidden rounded-control border bg-surface px-3.5 text-center [-webkit-tap-highlight-color:transparent]", "transition-[border-color,color,box-shadow,transform,scale] duration-150 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] active:not-has-disabled:scale-[0.97] motion-reduce:animate-none! motion-reduce:transition-none", o.subLabel ? "min-h-14 py-2.5" : size === "sm" ? "h-9" : "h-11", o.disabled && "cursor-not-allowed opacity-45", active
                    ? "border-primary text-primary ring-1 ring-primary"
                    : "border-line text-ink hover:border-line-strong hover:bg-surface-subtle", "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary"), children: [_jsx("input", { type: "radio", name: name, value: o.value, disabled: o.disabled, checked: active, onChange: () => select(o.value), className: "sr-only" }), _jsx("span", { "aria-hidden": "true", "data-outline-fill": "", style: { transform: active ? "scale(1)" : "scale(0.5)" }, className: clsx("pointer-events-none absolute inset-0 rounded-[inherit] bg-primary-soft/75 transition-[transform,opacity] duration-320 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none", active ? "opacity-100" : "opacity-0") }), _jsx("span", { className: clsx("relative z-10 text-body font-semibold transition-colors duration-200", active ? "text-primary" : "text-ink"), children: o.label }), o.subLabel && (_jsx("span", { className: clsx("relative z-10 mt-0.5 text-caption tabular-nums transition-colors duration-200", active ? "font-semibold text-primary/85" : "text-ink-muted"), children: o.subLabel }))] }, o.value));
        }) }));
}
