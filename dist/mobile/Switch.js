"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useId, useState } from "react";
import clsx from "clsx";
/**
 * 모바일 ON/OFF 토글 스위치 (`role="switch"` + 프레스 탄성 피드백).
 * - 단독 스위치 및 좌우 풀폭 설정 행(`label` 포함) 두 형태 모두 지원
 */
export function Switch({ id, name, value = "on", checked: controlled, defaultChecked = false, onChange, disabled = false, size = "md", label, description, "aria-label": ariaLabel, className, }) {
    const autoId = useId();
    const switchId = id ?? autoId;
    const labelId = `${switchId}-label`;
    const [inner, setInner] = useState(defaultChecked);
    const [pressing, setPressing] = useState(false);
    const isOn = controlled !== undefined ? controlled : inner;
    function toggle() {
        if (disabled)
            return;
        const next = !isOn;
        if (controlled === undefined)
            setInner(next);
        onChange?.(next);
    }
    const isSm = size === "sm";
    const control = (_jsxs(_Fragment, { children: [name && isOn && _jsx("input", { type: "hidden", name: name, value: value }), _jsx("button", { id: switchId, type: "button", role: "switch", "aria-checked": isOn, "aria-labelledby": label ? labelId : undefined, "aria-label": !label ? ariaLabel : undefined, disabled: disabled, onClick: toggle, onPointerDown: () => !disabled && setPressing(true), onPointerUp: () => setPressing(false), onPointerLeave: () => setPressing(false), onPointerCancel: () => setPressing(false), className: clsx("relative inline-flex shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-240 ease-out outline-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-45 motion-reduce:transition-none!", isSm ? "h-6 w-10.5" : "h-7 w-12", isOn ? "bg-primary" : "bg-zinc-300", !label && className), children: _jsx("span", { "aria-hidden": "true", "data-switch-thumb": "", style: {
                        width: pressing ? (isSm ? "23px" : "27px") : isSm ? "20px" : "24px",
                        transform: isOn
                            ? `translate3d(${pressing ? (isSm ? 15 : 17) : isSm ? 18 : 20}px, 0, 0)`
                            : "translate3d(0, 0, 0)",
                    }, className: clsx("block rounded-full bg-white shadow-sm transition-[transform,width] duration-240 ease-[cubic-bezier(0.22,1.25,0.36,1)] motion-reduce:transition-none!", isSm ? "h-5" : "h-6") }) })] }));
    if (!label)
        return control;
    return (_jsxs("div", { className: clsx("flex min-h-12 w-full items-center justify-between gap-3 py-2", disabled && "opacity-50", className), children: [_jsxs("div", { id: labelId, onClick: toggle, className: clsx("min-w-0 flex-1 select-none", !disabled && "cursor-pointer"), children: [_jsx("span", { className: "block text-body font-medium text-ink", children: label }), description && (_jsx("span", { className: "mt-0.5 block text-caption text-ink-muted", children: description }))] }), control] }));
}
