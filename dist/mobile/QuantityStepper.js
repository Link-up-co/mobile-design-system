"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import clsx from "clsx";
export function clampQuantity(value, min = 1, max = 99) {
    const n = Number.isFinite(value) ? Math.trunc(value) : min;
    return Math.min(max, Math.max(min, n));
}
/**
 * 모바일 수량 조절기 (`−` / 숫자 / `+`) + 카운트업·다운 슬라이드 인터랙션.
 * - 이전 숫자가 반대 방향으로 밀려 나가고 새 숫자가 들어오는 2겹 키프레임 슬라이드(380ms)로 카운트 움직임이 눈으로 또렷하게 보임
 * - 직접 숫자를 타이핑해서 바꿀 수 있도록 투명 입력칸을 위에 겹쳐 둠
 */
export function QuantityStepper({ id, name, value: controlled, defaultValue = 1, min = 1, max = 99, step = 1, size = "md", disabled = false, onChange, className, }) {
    const [inner, setInner] = useState(() => clampQuantity(defaultValue, min, max));
    const current = clampQuantity(controlled ?? inner, min, max);
    const [prev, setPrev] = useState(null);
    const [dir, setDir] = useState(1);
    const [tick, setTick] = useState(0);
    const [editing, setEditing] = useState(false);
    function commit(next) {
        const clamped = clampQuantity(next, min, max);
        if (clamped !== current) {
            setPrev(current);
            setDir(clamped > current ? 1 : -1);
            setTick((t) => t + 1);
        }
        if (controlled === undefined)
            setInner(clamped);
        onChange?.(clamped);
    }
    const atMin = disabled || current <= min;
    const atMax = disabled || current >= max;
    const btnSize = size === "sm" ? "size-9" : "size-11";
    return (_jsxs("div", { className: clsx("inline-flex items-center overflow-hidden rounded-control border border-line bg-surface", disabled && "opacity-50", size === "sm" ? "h-9" : "h-11", className), children: [_jsx("button", { type: "button", "aria-label": "\uC218\uB7C9 \uAC10\uC18C", disabled: atMin, onClick: () => commit(current - step), className: clsx("pressable inline-flex shrink-0 cursor-pointer select-none items-center justify-center border-r border-line text-ink outline-transparent hover:bg-surface-subtle active:bg-canvas disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary", btnSize), children: _jsx("svg", { "aria-hidden": "true", viewBox: "0 0 16 16", className: "size-4", children: _jsx("path", { d: "M3.5 8h9", stroke: "currentColor", strokeWidth: "1.15", strokeLinecap: "round" }) }) }), _jsxs("div", { className: clsx("relative flex h-full items-center justify-center overflow-hidden", size === "sm" ? "w-10 text-body-sm" : "w-12 text-body"), children: [prev !== null && !editing && (_jsx("span", { "aria-hidden": "true", style: {
                            animation: `${dir > 0 ? "mds-step-out-up" : "mds-step-out-down"} 380ms cubic-bezier(0.22, 1, 0.36, 1) forwards`,
                        }, className: "pointer-events-none absolute inset-0 flex items-center justify-center font-semibold tabular-nums text-ink motion-reduce:hidden", children: prev }, `out-${tick}`)), _jsx("span", { "aria-hidden": "true", "data-stepper-value": current, "data-dir": dir, style: tick > 0
                            ? {
                                animation: `${dir > 0 ? "mds-step-in-up" : "mds-step-in-down"} 380ms cubic-bezier(0.22, 1, 0.36, 1) forwards`,
                            }
                            : undefined, className: clsx("pointer-events-none inline-block font-semibold tabular-nums text-ink", editing && "opacity-0"), children: current }, `in-${current}-${tick}`), _jsx("input", { id: id, name: name, type: "text", inputMode: "numeric", disabled: disabled, value: current, onFocus: () => setEditing(true), onBlur: () => setEditing(false), onChange: (e) => {
                            const parsed = Number(e.target.value.replace(/[^0-9]/g, ""));
                            if (!Number.isNaN(parsed))
                                commit(parsed);
                        }, className: clsx("absolute inset-0 size-full bg-transparent text-center font-semibold tabular-nums outline-none", editing ? "text-ink" : "text-transparent caret-ink selection:bg-primary/15") })] }), _jsx("button", { type: "button", "aria-label": "\uC218\uB7C9 \uC99D\uAC00", disabled: atMax, onClick: () => commit(current + step), className: clsx("pressable inline-flex shrink-0 cursor-pointer select-none items-center justify-center border-l border-line text-ink outline-transparent hover:bg-surface-subtle active:bg-canvas disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary", btnSize), children: _jsx("svg", { "aria-hidden": "true", viewBox: "0 0 16 16", className: "size-4", children: _jsx("path", { d: "M8 3.5v9M3.5 8h9", stroke: "currentColor", strokeWidth: "1.15", strokeLinecap: "round" }) }) })] }));
}
