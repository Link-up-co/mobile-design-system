import { type ReactNode } from "react";
export type RankingProductItem = {
    id: string;
    /** 순위 번호 (미지정 시 배열 순서 기준 `1, 2, 3...` 자동 부여) */
    rank?: number;
    /** 순위 변동 (`양수`: 상승 ▲N, `음수`: 하락 ▼N, `"NEW"`: 신규 진입, `0`/`undefined`: 변동 미표시) */
    rankChange?: number | "NEW";
    name: string;
    /** 용량·도수·주종 등 짧은 보조 정보 */
    subtitle?: string;
    /** 판매량 지표 문구 (예: `"주간 840병 판매"`) */
    salesLabel?: string;
    price: number;
    originalPrice?: number;
    imageSrc?: string;
    imageAlt?: string;
    thumbnail?: ReactNode;
    href?: string;
    onClick?: () => void;
    soldOut?: boolean;
    onCartClick?: () => void;
};
export type RankingCategoryTab = {
    key: string;
    label: string;
    items: readonly RankingProductItem[];
    /** 카테고리별 전체보기 링크/핸들러가 다를 때 선택 지정 */
    moreHref?: string;
    onMoreClick?: () => void;
};
export type CategoryRankingProps = {
    /** 섹션 상단 타이틀 (생략 시 탭 바부터 바로 시작) */
    title?: ReactNode;
    /** 섹션 상단 보조 서브타이틀 */
    subtitle?: ReactNode;
    /** 카테고리 탭 및 각 탭의 순위 상품 목록 */
    categories: readonly RankingCategoryTab[];
    /** 제어형 활성 카테고리 key */
    activeKey?: string;
    defaultActiveKey?: string;
    onActiveChange?: (key: string, index: number) => void;
    /** 공통 우측 전체보기 링크 */
    moreHref?: string;
    onMoreClick?: () => void;
    moreLabel?: string;
    /** 부모 좌우 패딩(`px-5`) 바깥까지 풀폭 플랫 레이아웃으로 확장할지 여부 (기본 `true`) */
    bleed?: boolean;
    className?: string;
};
export declare function resolveCategoryIndex(categories: readonly {
    key: string;
}[], targetKey?: string): number;
/**
 * 카테고리별 판매량 순위 탭 슬라이드 컴포넌트.
 * - 1px 구분선 기반 풀폭 플랫 탭 바 + 선택된 탭 자동 중앙 정렬 + 언더라인 슬라이드
 * - 본문 좌우 터치/포인터 드래그 슬라이드로 카테고리 간 매끄러운 페이징 전환
 */
export declare function CategoryRanking({ title, subtitle, categories, activeKey: controlledKey, defaultActiveKey, onActiveChange, moreHref, onMoreClick, moreLabel, bleed, className, }: CategoryRankingProps): import("react").JSX.Element | null;
