export const BRAND_PRESETS = [
    { key: "cobalt", label: "Cobalt Blue (기본)", hex: "#0066FF" },
    { key: "gold", label: "Beer Gold", hex: "#EFB81C" },
    { key: "ink", label: "Deep Ink", hex: "#18181B" },
    { key: "amber", label: "Warm Amber", hex: "#EA580C" },
    { key: "emerald", label: "Fresh Emerald", hex: "#059669" },
    { key: "rose", label: "Vibrant Rose", hex: "#E11D48" },
];
export function formatNumber(value) {
    const num = typeof value === "string" ? Number(value) : (value ?? 0);
    return Number.isFinite(num) ? num.toLocaleString("ko-KR") : "0";
}
export function formatCurrency(value, suffix = "원") {
    return `${formatNumber(value)}${suffix}`;
}
/** 목록 복귀/이동 주소. 배열 값은 같은 키를 반복, 빈 값은 생략 */
export function buildListReturnHref(basePath, params) {
    const search = new URLSearchParams();
    for (const [key, raw] of Object.entries(params)) {
        for (const v of Array.isArray(raw) ? raw : [raw]) {
            if (v === undefined || v === null || v === "")
                continue;
            search.append(key, String(v));
        }
    }
    const qs = search.toString();
    return qs ? `${basePath}?${qs}` : basePath;
}
