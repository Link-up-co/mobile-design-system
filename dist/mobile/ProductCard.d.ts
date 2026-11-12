import { type ReactNode } from "react";
import { type ProductTagInput } from "./Tag.js";
export declare function computeDiscountRate(price: number, originalPrice?: number): number;
export type ProductCardProps = {
    /** `grid`: 1/2 폭 세로형 카드 · `list`: 가로 전체 풀폭 리스트형 카드 */
    variant?: "grid" | "list";
    name: string;
    /** 주종·용량·원산지 등 짧은 보조 정보 (예: "싱글몰트 · 700ml") */
    subtitle?: string;
    price: number;
    /** 정가(할인 전 가격). `price`보다 크면 취소선과 할인율(%) 자동 표시 */
    originalPrice?: number;
    /** 상품 강조 라벨 태그 목록 (`"베스트"`, `"인기"`, `"행사"`, `"추천"` 등 문자열 또는 `{ label, variant, color }`) */
    tags?: readonly ProductTagInput[];
    imageSrc?: string;
    imageAlt?: string;
    /** 커스텀 썸네일 요소(`imageSrc` 대신 SVG·일러스트 렌더링 시 사용) */
    thumbnail?: ReactNode;
    href?: string;
    onClick?: () => void;
    soldOut?: boolean;
    wished?: boolean;
    defaultWished?: boolean;
    /** 전달 시 찜(하트) 토글 버튼 노출 */
    onWishToggle?: (wished: boolean) => void;
    /** 전달 시 장바구니 빠른 담기 버튼 노출 */
    onCartClick?: () => void;
    className?: string;
};
/**
 * 모바일 상품 카드 (`grid` 1/2 카드 · `list` 가로 전체 카드).
 * - 스트레치드 링크 패턴으로 `<a>`/`<button>` 중첩 없이 카드 본체 터치와 찜·장바구니 버튼 터치를 분리
 */
export declare function ProductCard({ variant, name, subtitle, price, originalPrice, tags, imageSrc, imageAlt, thumbnail, href, onClick, soldOut, wished: controlledWished, defaultWished, onWishToggle, onCartClick, className, }: ProductCardProps): import("react").JSX.Element;
