import { type ControlSize } from "./Input.js";
export type SelectOption = {
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
};
/** 일반 문자열·한글 초성('ㅅㅅ')·타이핑 중 혼합('강ㄴ') 검색 매칭 */
export declare function matchesKoreanQuery(target: string, query: string): boolean;
export declare function filterSelectOptions(options: readonly SelectOption[], query: string): SelectOption[];
export declare function computeVirtualRange(count: number, itemHeight: number, scrollTop: number, viewportHeight: number, overscan?: number): {
    start: number;
    end: number;
    offsetY: number;
    totalHeight: number;
};
export type SelectProps = {
    id?: string;
    name?: string;
    options: readonly SelectOption[];
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    /** 바텀시트 상단 타이틀 (생략 시 placeholder 사용) */
    title?: string;
    /** 검색창 노출 여부 (생략 시 옵션 8개 이상이면 자동 노출) */
    searchable?: boolean;
    searchPlaceholder?: string;
    size?: ControlSize;
    invalid?: boolean;
    disabled?: boolean;
    defaultOpen?: boolean;
    onChange?: (value: string, option: SelectOption) => void;
    className?: string;
};
/**
 * 바텀시트 연동 모바일 셀렉트 박스 (한글 초성 검색 + 가상 스크롤 내장).
 * - 클릭 시 바텀시트가 올라오고, 옵션을 선택하면 값 반영 후 시트가 부드럽게 내려감
 * - 대량 옵션에서도 보이는 구간만 DOM에 마운트해 버벅임 없이 스크롤됨
 */
export declare function Select({ id, name, options, value: controlled, defaultValue, placeholder, title, searchable, searchPlaceholder, size, invalid, disabled, defaultOpen, onChange, className, }: SelectProps): import("react").JSX.Element;
