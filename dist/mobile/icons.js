import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
/** 디자인 시스템 전체 표준 라인 아이콘 두께 */
export const ICON_STROKE_WIDTH = 1.15;
const stroke = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: ICON_STROKE_WIDTH,
    strokeLinecap: "round",
    strokeLinejoin: "round",
};
export function CartIcon({ filled = false, className }) {
    return (_jsxs("svg", { "aria-hidden": "true", viewBox: "0 0 20 20", className: clsx("size-5 shrink-0", className), children: [_jsx("path", { d: "M2.5 3.5h2l2.1 9.2h8.8l1.8-6.7H5.2", fill: filled ? "currentColor" : "none", stroke: "currentColor", strokeWidth: filled ? 1.5 : ICON_STROKE_WIDTH, strokeLinecap: "round", strokeLinejoin: "round" }), _jsx("circle", { cx: "8", cy: "16", r: filled ? 1.35 : 1.1, fill: "currentColor" }), _jsx("circle", { cx: "14.5", cy: "16", r: filled ? 1.35 : 1.1, fill: "currentColor" })] }));
}
export function SearchIcon({ filled = false, className }) {
    return (_jsxs("svg", { "aria-hidden": "true", viewBox: "0 0 20 20", className: clsx("size-5 shrink-0", className), children: [_jsx("circle", { cx: "9", cy: "9", r: "5.5", fill: filled ? "currentColor" : "none", stroke: "currentColor", strokeWidth: filled ? 1.75 : ICON_STROKE_WIDTH }), filled && _jsx("circle", { cx: "9", cy: "9", r: "2.2", fill: "var(--mds-surface)" }), _jsx("path", { d: "M13.2 13.2L17 17", fill: "none", stroke: "currentColor", strokeWidth: filled ? 2 : ICON_STROKE_WIDTH, strokeLinecap: "round" })] }));
}
export function BackIcon({ className }) {
    return (_jsx("svg", { "aria-hidden": "true", viewBox: "0 0 20 20", className: clsx("size-5 shrink-0", className), children: _jsx("path", { d: "M12.5 4L6.5 10l6 6", ...stroke }) }));
}
export function CloseIcon({ className }) {
    return (_jsx("svg", { "aria-hidden": "true", viewBox: "0 0 20 20", className: clsx("size-5 shrink-0", className), children: _jsx("path", { d: "M5 5l10 10M15 5L5 15", ...stroke }) }));
}
export function ChevronDownIcon({ open, className }) {
    return (_jsx("svg", { "aria-hidden": "true", viewBox: "0 0 20 20", className: clsx("size-4 shrink-0 transition-transform duration-200", open && "rotate-180", className), children: _jsx("path", { d: "M5 7.5l5 5 5-5", ...stroke }) }));
}
export function CheckIcon({ className }) {
    return (_jsx("svg", { "aria-hidden": "true", viewBox: "0 0 20 20", className: clsx("size-4 shrink-0", className), children: _jsx("path", { d: "M4.5 10.5l3.5 3.5 7.5-8", ...stroke }) }));
}
export function EyeIcon({ className }) {
    return (_jsxs("svg", { "aria-hidden": "true", viewBox: "0 0 20 20", className: clsx("size-5 shrink-0", className), children: [_jsx("path", { d: "M2 10s3-5.5 8-5.5S18 10 18 10s-3 5.5-8 5.5S2 10 2 10Z", ...stroke }), _jsx("circle", { cx: "10", cy: "10", r: "2.25", ...stroke })] }));
}
export function EyeOffIcon({ className }) {
    return (_jsx("svg", { "aria-hidden": "true", viewBox: "0 0 20 20", className: clsx("size-5 shrink-0", className), children: _jsx("path", { d: "M3 3l14 14M8.6 8.7a2.25 2.25 0 0 0 3.1 3.1M6.1 6.2C3.8 7.6 2 10 2 10s3 5.5 8 5.5c1.6 0 3-.5 4.2-1.2M9.5 4.6C9.7 4.5 9.8 4.5 10 4.5c5 0 8 5.5 8 5.5a14.4 14.4 0 0 1-2.2 2.9", ...stroke }) }));
}
export function CalendarIcon({ className }) {
    return (_jsxs("svg", { "aria-hidden": "true", viewBox: "0 0 20 20", className: clsx("size-4 shrink-0", className), children: [_jsx("rect", { x: "3", y: "4.5", width: "14", height: "12.5", rx: "2", ...stroke }), _jsx("path", { d: "M3 8.5h14M6.5 2.75v3M13.5 2.75v3", ...stroke })] }));
}
export function HeartIcon({ filled = false, className }) {
    return (_jsx("svg", { "aria-hidden": "true", viewBox: "0 0 20 20", className: clsx("size-5 shrink-0", className), fill: filled ? "currentColor" : "none", stroke: "currentColor", strokeWidth: filled ? 1.5 : ICON_STROKE_WIDTH, strokeLinecap: "round", strokeLinejoin: "round", children: _jsx("path", { d: "M10 17.3s-7-4.35-7-9.35A4.05 4.05 0 0 1 10 5.15a4.05 4.05 0 0 1 7 2.8c0 5-7 9.35-7 9.35Z" }) }));
}
export function HomeIcon({ filled = false, className }) {
    return (_jsx("svg", { "aria-hidden": "true", viewBox: "0 0 20 20", className: clsx("size-5 shrink-0", className), children: _jsx("path", { d: "M3 8.4L10 2.8l7 5.6v8.1a1.2 1.2 0 0 1-1.2 1.2h-3.6v-5.2H7.8v5.2H4.2A1.2 1.2 0 0 1 3 16.5V8.4Z", fill: filled ? "currentColor" : "none", stroke: "currentColor", strokeWidth: filled ? 1.5 : ICON_STROKE_WIDTH, strokeLinecap: "round", strokeLinejoin: "round" }) }));
}
export function CategoryIcon({ filled = false, className }) {
    const fill = filled ? "currentColor" : "none";
    const sw = filled ? 1.5 : ICON_STROKE_WIDTH;
    return (_jsxs("svg", { "aria-hidden": "true", viewBox: "0 0 20 20", className: clsx("size-5 shrink-0", className), children: [_jsx("rect", { x: "3", y: "3", width: "5.8", height: "5.8", rx: "1.3", fill: fill, stroke: "currentColor", strokeWidth: sw }), _jsx("rect", { x: "11.2", y: "3", width: "5.8", height: "5.8", rx: "1.3", fill: fill, stroke: "currentColor", strokeWidth: sw }), _jsx("rect", { x: "3", y: "11.2", width: "5.8", height: "5.8", rx: "1.3", fill: fill, stroke: "currentColor", strokeWidth: sw }), _jsx("rect", { x: "11.2", y: "11.2", width: "5.8", height: "5.8", rx: "1.3", fill: fill, stroke: "currentColor", strokeWidth: sw })] }));
}
export function MapPinIcon({ filled = false, className }) {
    return (_jsxs("svg", { "aria-hidden": "true", viewBox: "0 0 20 20", className: clsx("size-5 shrink-0", className), children: [_jsx("path", { d: "M10 17.5s5.5-5.1 5.5-9.3a5.5 5.5 0 1 0-11 0c0 4.2 5.5 9.3 5.5 9.3Z", fill: filled ? "currentColor" : "none", stroke: "currentColor", strokeWidth: filled ? 1.5 : ICON_STROKE_WIDTH, strokeLinecap: "round", strokeLinejoin: "round" }), _jsx("circle", { cx: "10", cy: "8.2", r: "1.9", fill: filled ? "var(--mds-surface)" : "none", stroke: filled ? "var(--mds-surface)" : "currentColor", strokeWidth: filled ? 1.4 : ICON_STROKE_WIDTH })] }));
}
export function UserIcon({ filled = false, className }) {
    const sw = filled ? 1.5 : ICON_STROKE_WIDTH;
    return (_jsxs("svg", { "aria-hidden": "true", viewBox: "0 0 20 20", className: clsx("size-5 shrink-0", className), children: [_jsx("circle", { cx: "10", cy: "6.6", r: "3.2", fill: filled ? "currentColor" : "none", stroke: "currentColor", strokeWidth: sw }), _jsx("path", { d: "M3.8 16.8c.7-3 3.1-4.8 6.2-4.8s5.5 1.8 6.2 4.8", fill: filled ? "currentColor" : "none", stroke: "currentColor", strokeWidth: sw, strokeLinecap: "round", strokeLinejoin: "round" })] }));
}
export function PlusIcon({ className }) {
    return (_jsx("svg", { "aria-hidden": "true", viewBox: "0 0 20 20", className: clsx("size-5 shrink-0", className), children: _jsx("path", { d: "M10 4v12M4 10h12", ...stroke }) }));
}
export function ArrowUpIcon({ className }) {
    return (_jsx("svg", { "aria-hidden": "true", viewBox: "0 0 20 20", className: clsx("size-5 shrink-0", className), children: _jsx("path", { d: "M10 16V4.5M5 9.5l5-5 5 5", ...stroke }) }));
}
export function AlertCircleIcon({ className }) {
    return (_jsxs("svg", { "aria-hidden": "true", viewBox: "0 0 20 20", className: clsx("size-5 shrink-0", className), children: [_jsx("circle", { cx: "10", cy: "10", r: "7.2", ...stroke }), _jsx("path", { d: "M10 6.5v4.2", ...stroke }), _jsx("circle", { cx: "10", cy: "13.6", r: "0.7", fill: "currentColor" })] }));
}
export function CameraIcon({ className }) {
    return (_jsxs("svg", { "aria-hidden": "true", viewBox: "0 0 20 20", className: clsx("size-5 shrink-0", className), children: [_jsx("path", { d: "M3 6.8a1.5 1.5 0 0 1 1.5-1.5h2l1.1-1.6h4.8l1.1 1.6h2A1.5 1.5 0 0 1 17 6.8v7.7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 14.5V6.8Z", ...stroke }), _jsx("circle", { cx: "10", cy: "10.6", r: "2.7", ...stroke })] }));
}
export function UploadIcon({ className }) {
    return (_jsxs("svg", { "aria-hidden": "true", viewBox: "0 0 20 20", className: clsx("size-5 shrink-0", className), children: [_jsx("path", { d: "M10 13V4.2M6.5 7.7L10 4.2l3.5 3.5", ...stroke }), _jsx("path", { d: "M3.5 13.5v1.8a1.2 1.2 0 0 0 1.2 1.2h10.6a1.2 1.2 0 0 0 1.2-1.2v-1.8", ...stroke })] }));
}
export function FileTextIcon({ className }) {
    return (_jsxs("svg", { "aria-hidden": "true", viewBox: "0 0 20 20", className: clsx("size-5 shrink-0", className), children: [_jsx("path", { d: "M5.2 2.8h6.3L15.2 6.5v9.5a1.2 1.2 0 0 1-1.2 1.2H5.2A1.2 1.2 0 0 1 4 16V4a1.2 1.2 0 0 1 1.2-1.2Z", ...stroke }), _jsx("path", { d: "M11.2 2.8v3.9h3.9M7 10.5h6M7 13.5h4.2", ...stroke })] }));
}
