import { type ReactNode } from "react";
export type TabItem = {
    key: string;
    label: string;
    /** 우측 보조 수량 표시 (예: 리뷰 128) */
    count?: number;
    disabled?: boolean;
};
export type TabsProps = {
    items: readonly TabItem[];
    activeKey?: string;
    defaultActiveKey?: string;
    onActiveChange?: (key: string) => void;
    /** `"scrollable"`: 가로 스크롤 + 선택 탭 자동 중앙 정렬(기본) · `"fixed"`: N등분 풀폭 균등 배치 */
    variant?: "scrollable" | "fixed";
    /** 모바일 좌우 여백 풀폭 확장(`-mx-5 px-5`) 여부 (기본 `false`) */
    bleed?: boolean;
    ariaLabel?: string;
    className?: string;
};
/**
 * 범용 플랫 언더라인 탭 바 (`1px border-b` + 선택 탭 중앙 자동 정렬 + `2px bg-primary` 슬라이딩 바).
 */
export declare function Tabs({ items, activeKey: controlledKey, defaultActiveKey, onActiveChange, variant, bleed, ariaLabel, className, }: TabsProps): import("react").JSX.Element | null;
export type SwipeTabPanel = TabItem & {
    content: ReactNode;
};
export type SwipeTabsProps = {
    tabs: readonly SwipeTabPanel[];
    activeKey?: string;
    defaultActiveKey?: string;
    onActiveChange?: (key: string) => void;
    variant?: "scrollable" | "fixed";
    bleed?: boolean;
    ariaLabel?: string;
    className?: string;
};
/**
 * 플랫 언더라인 탭 바 + 본문 좌우 슬라이드 스와이프 전환이 결합된 `SwipeTabs`.
 */
export declare function SwipeTabs({ tabs, activeKey: controlledKey, defaultActiveKey, onActiveChange, variant, bleed, ariaLabel, className, }: SwipeTabsProps): import("react").JSX.Element | null;
