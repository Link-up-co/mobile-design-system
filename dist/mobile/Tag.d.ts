import type { HTMLAttributes, ReactNode } from "react";
export type TagVariant = "solid" | "primary" | "danger" | "warning" | "success" | "neutral";
export type ProductTagInput = string | {
    label: string;
    variant?: TagVariant;
    /** 백엔드에서 내려주는 커스텀 HEX 색상 (예: `"#7C3AED"`) 지원 */
    color?: string;
};
/**
 * 한국 커머스 표준 상품 라벨 문구에서 기본 시맨틱 톤을 자동 추론.
 */
export declare function inferTagVariant(label: string): TagVariant;
export type TagProps = Omit<HTMLAttributes<HTMLSpanElement>, "color"> & {
    variant?: TagVariant;
    /** 커스텀 HEX 색상(`#RRGGBB`) 지정 시 연한 틴트 배경 + 진한 텍스트로 자동 변환 */
    color?: string;
    children: ReactNode;
};
/**
 * 모바일 상품·상태 라벨 태그 (`베스트`, `인기`, `행사`, `추천` 등).
 * - 테두리선 없이 정갈한 소프트 틴트(또는 블랙 솔리드) 채움으로 썸네일·가격과 시선 충돌 방지
 */
export declare function Tag({ variant, color, style, className, children, ...rest }: TagProps): import("react").JSX.Element;
export declare function TagList({ tags, className, }: {
    tags?: readonly ProductTagInput[];
    className?: string;
}): import("react").JSX.Element | null;
