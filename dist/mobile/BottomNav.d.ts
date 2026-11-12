import { type ReactNode } from "react";
export type BottomNavItem = {
    key: string;
    label: string;
    /** 기본 아이콘 엘리먼트(`filled` prop 자동 주입) 또는 `(active: boolean) => ReactNode` 렌더 함수 */
    icon: ReactNode | ((active: boolean) => ReactNode);
    href?: string;
    onClick?: () => void;
    /** 우측 상단 숫자 배지 (예: 장바구니 수량) */
    badge?: number;
    /** 우측 상단 알림 점 표시 */
    dot?: boolean;
};
export type BottomNavProps = {
    items: readonly BottomNavItem[];
    /** 제어형 활성 메뉴 key */
    activeKey?: string;
    defaultActiveKey?: string;
    onActiveChange?: (key: string) => void;
    /** `"fixed"`: 뷰포트 하단 고정(기본) · `"sticky"`: 점착 · `"static"`: 인라인 배치 */
    position?: "fixed" | "sticky" | "static";
    /** `position="fixed"`일 때 본문 하단 가림 방지 스페이서 렌더링 여부 (기본 `true`) */
    reserveSpace?: boolean;
    /** 모바일 컨테이너 최대 폭 클래스 (기본 `"max-w-[412px]"`) */
    maxWidthClassName?: string;
    ariaLabel?: string;
    className?: string;
};
/**
 * 하단을 꽉 채운 플랫 리퀴드 글래스 글로벌 메인 네비게이션 바 (`56px` + Safe Area 대응).
 * - 상단 유리 단면 스넬 굴절(`feDisplacementMap`) + 스펙큘러 유리 엣지 + 반투명 밀키 글래스 시트
 * - 선택된 메뉴는 Primary 컬러 Fill 아이콘으로 전환되며 중앙으로 커지고(`scale(1.6)`) 라벨은 부드럽게 디졸브됨
 */
export declare function BottomNav({ items, activeKey: controlledKey, defaultActiveKey, onActiveChange, position, reserveSpace, maxWidthClassName, ariaLabel, className, }: BottomNavProps): import("react").JSX.Element | null;
