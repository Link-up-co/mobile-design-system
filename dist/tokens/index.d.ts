type QueryValue = string | number | boolean | null | undefined;
export type BrandPreset = "cobalt" | "gold" | "ink" | "amber" | "emerald" | "rose";
export declare const BRAND_PRESETS: readonly {
    key: BrandPreset;
    label: string;
    hex: string;
}[];
export declare function formatNumber(value: number | string | null | undefined): string;
export declare function formatCurrency(value: number | string | null | undefined, suffix?: string): string;
/** 목록 복귀/이동 주소. 배열 값은 같은 키를 반복, 빈 값은 생략 */
export declare function buildListReturnHref(basePath: string, params: Record<string, QueryValue | QueryValue[]>): string;
export {};
