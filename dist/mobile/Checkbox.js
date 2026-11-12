"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
/**
 * 모바일 터치 친화적 체크박스 (20×20px 라운드 박스 + 체크 드로잉 모션).
 * - 라벨 전체가 넉넉한 터치 영역이 되며, 누르는 동안 박스가 0.9배로 살짝 눌림
 */
export function Checkbox({ label, description, indeterminate = false, disabled, className, ...rest }) {
    const ref = useRef(null);
    useEffect(() => {
        if (ref.current)
            ref.current.indeterminate = indeterminate;
    }, [indeterminate]);
    return (_jsxs("label", { className: clsx("group inline-flex min-h-9 cursor-pointer touch-manipulation select-none items-start gap-2.5 py-1 text-body text-ink [-webkit-tap-highlight-color:transparent]", "has-disabled:cursor-not-allowed has-disabled:opacity-50", className), children: [_jsxs("span", { className: "relative mt-0.5 inline-flex size-5 shrink-0", children: [_jsx("input", { ref: ref, type: "checkbox", disabled: disabled, "aria-checked": indeterminate ? "mixed" : undefined, className: clsx("peer size-5 cursor-[inherit] appearance-none rounded-[6px] border border-line-strong bg-surface", "transition-[background-color,border-color,scale] duration-150 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]", "checked:border-primary checked:bg-primary indeterminate:border-primary indeterminate:bg-primary", "not-checked:not-indeterminate:group-hover:border-ink-muted", "group-active:not-disabled:scale-90 motion-reduce:group-active:scale-100", "outline-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"), ...rest }), _jsx("svg", { "aria-hidden": "true", viewBox: "0 0 20 20", className: "pointer-events-none absolute inset-0 text-primary-fg *:transition-[stroke-dashoffset] *:duration-100 *:ease-out peer-checked:*:[stroke-dashoffset:0] peer-checked:*:duration-200", children: _jsx("path", { d: "M5 10.5l3.25 3.25L15 6.75", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", pathLength: 1, strokeDasharray: "1", strokeDashoffset: "1" }) }), _jsx("svg", { "aria-hidden": "true", viewBox: "0 0 20 20", className: "pointer-events-none absolute inset-0 scale-x-50 text-primary-fg opacity-0 transition-[opacity,scale] duration-150 ease-out peer-indeterminate:scale-x-100 peer-indeterminate:opacity-100", children: _jsx("path", { d: "M5.5 10h9", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }) })] }), (label || description) && (_jsxs("span", { className: "flex min-w-0 flex-col gap-0.5", children: [label && _jsx("span", { className: "leading-[1.4] font-medium text-ink", children: label }), description && _jsx("span", { className: "text-body-sm text-ink-muted", children: description })] }))] }));
}
export function toggleCheckboxValue(selected, value, order) {
    const next = selected.includes(value) ? selected.filter((v) => v !== value) : [...selected, value];
    return order.filter((v) => next.includes(v));
}
export function CheckboxGroup({ name, options, value: controlled, defaultValue = [], onChange, allLabel, direction = "vertical", "aria-label": ariaLabel, className, }) {
    const [inner, setInner] = useState(defaultValue);
    const selected = controlled ?? inner;
    const enabledOrder = options.filter((o) => !o.disabled).map((o) => o.value);
    const fullOrder = options.map((o) => o.value);
    const set = (next) => {
        if (controlled === undefined)
            setInner(next);
        onChange?.(next);
    };
    const all = enabledOrder.length > 0 && enabledOrder.every((v) => selected.includes(v));
    const some = !all && enabledOrder.some((v) => selected.includes(v));
    return (_jsxs("div", { role: "group", "aria-label": ariaLabel, className: clsx("flex flex-col gap-1.5", className), children: [allLabel && (_jsx("div", { className: "border-b border-line pb-2 mb-1", children: _jsx(Checkbox, { label: _jsx("span", { className: "font-semibold", children: allLabel }), checked: all, indeterminate: some, onChange: () => set(all ? [] : enabledOrder) }) })), _jsx("div", { className: clsx(direction === "horizontal" ? "flex flex-wrap items-center gap-x-5 gap-y-2" : "flex flex-col gap-1.5"), children: options.map((o) => (_jsx(Checkbox, { name: name, value: o.value, label: o.label, description: o.description, disabled: o.disabled, checked: selected.includes(o.value), onChange: () => set(toggleCheckboxValue(selected, o.value, fullOrder)) }, o.value))) })] }));
}
