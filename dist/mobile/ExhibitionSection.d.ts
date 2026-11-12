import { type ReactNode } from "react";
import { type ProductCardProps } from "./ProductCard.js";
export type ExhibitionProductItem = Omit<ProductCardProps, "variant"> & {
    id: string;
};
export type ExhibitionSectionProps = {
    /** 기획전 메인 타이틀 */
    title: ReactNode;
    /** 타이틀 아래 보조 서브타이틀 */
    subtitle?: ReactNode;
    /** 우측 전체보기 이동 링크 (`onMoreClick`과 택일 또는 병행) */
    moreHref?: string;
    /** 우측 전체보기 클릭 핸들러 */
    onMoreClick?: () => void;
    /** 전체보기 텍스트 (기본 `"전체보기"`) */
    moreLabel?: string;
    /** 슬라이드에 렌더링할 상품 목록 (`ProductCard` grid 변형 재사용) */
    items: readonly ExhibitionProductItem[];
    /** 부모 좌우 패딩(`px-5` 기준) 바깥까지 슬라이드 트랙을 확장할지 여부 (기본 `true`) */
    bleed?: boolean;
    /** 카드 1장 폭 CSS 클래스 (기본 `"w-[156px]"`, 약 2.3장 노출로 다음 카드 피킹 유도) */
    cardWidthClassName?: string;
    className?: string;
};
/**
 * 홈 화면 기획전 섹션 (타이틀 · 서브타이틀 · 전체보기 링크 + 하단 상품 카드 가로 슬라이드).
 * - 터치 스냅 스크롤(`snap-x`)과 데스크톱 마우스 드래그 스크롤 동시 지원
 */
export declare function ExhibitionSection({ title, subtitle, moreHref, onMoreClick, moreLabel, items, bleed, cardWidthClassName, className, }: ExhibitionSectionProps): import("react").JSX.Element;
