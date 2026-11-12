export type SkeletonProps = {
    /** 형태 (`"rect"`: 기본 모서리 8px · `"card"`: 12px · `"circle"`: 원형 · `"text"`: 텍스트 줄) */
    variant?: "rect" | "card" | "circle" | "text";
    className?: string;
};
/**
 * 데이터 패칭 중 레이아웃 흔들림(CLS)을 막는 쉬머 `Skeleton`.
 */
export declare function Skeleton({ variant, className }: SkeletonProps): import("react").JSX.Element;
/**
 * `ProductCard` (`grid` / `list`) 규격과 1:1로 일치하는 스켈레톤 프리셋.
 */
export declare function ProductCardSkeleton({ variant, className, }: {
    variant?: "grid" | "list";
    className?: string;
}): import("react").JSX.Element;
