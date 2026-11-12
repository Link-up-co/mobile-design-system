import { type ReactNode } from "react";
export type AccordionItem = {
    key: string;
    title: ReactNode;
    subtitle?: ReactNode;
    content: ReactNode;
    disabled?: boolean;
};
export type AccordionProps = {
    items: readonly AccordionItem[];
    /** `"single"`: 한 번에 하나만 펼침(기본) · `"multiple"`: 다중 펼침 허용 */
    type?: "single" | "multiple";
    defaultOpenKeys?: readonly string[];
    openKeys?: readonly string[];
    onOpenKeysChange?: (keys: string[]) => void;
    /** 모바일 좌우 여백 풀폭 확장(`-mx-5`) 여부 */
    bleed?: boolean;
    className?: string;
};
/**
 * 1px 구분선 기반의 풀폭 플랫 `Accordion` (상품 고시정보 · 약관 상세 · FAQ).
 * - 둥근 카드 박스 없이 `border-y divide-y` 플랫 리스트 구조 + CSS Grid `0fr -> 1fr` 부드러운 펼침 모션
 */
export declare function Accordion({ items, type, defaultOpenKeys, openKeys: controlledKeys, onOpenKeysChange, bleed, className, }: AccordionProps): import("react").JSX.Element | null;
