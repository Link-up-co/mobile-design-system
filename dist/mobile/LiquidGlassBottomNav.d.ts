import type { BottomNavItem } from "./BottomNav.js";
export type LiquidGlassBottomNavProps = {
    items: readonly BottomNavItem[];
    /** 제어형 활성 메뉴 key */
    activeKey?: string;
    defaultActiveKey?: string;
    onActiveChange?: (key: string) => void;
    /** `"fixed"`: 뷰포트 하단 플로팅 고정(기본) · `"sticky"`: 점착 · `"static"`: 인라인 배치 */
    position?: "fixed" | "sticky" | "static";
    /** `position="fixed"`일 때 본문 하단 가림 방지 스페이서 렌더링 여부 (기본 `true`) */
    reserveSpace?: boolean;
    /** 모바일 컨테이너 최대 폭 클래스 (기본 `"max-w-[412px]"`) */
    maxWidthClassName?: string;
    ariaLabel?: string;
    className?: string;
};
/** Apple Liquid Glass 연속 곡률 단면 (kube.io Convex Squircle: (1 - (1 - t)^4)^(1/4)) */
export declare function convexSquircleProfile(t: number): number;
/**
 * Snell–Descartes 법칙(n1=1 공기 -> n2=1.5 유리) 기반 2D 광선 굴절 프리컴퓨트 (kube.io Zt 수식).
 */
export declare function computeSnellRefractionProfile(glassThickness: number, bezelWidth: number, surfaceFn?: (t: number) => number, ior?: number, samples?: number): number[];
/**
 * 모바일 고속(60~120fps) 튜닝된 kube.io 방식 리퀴드 글래스 바텀 메뉴 (`LiquidGlassBottomNav`).
 * - SVG 필터를 단일 패스(feImage + feDisplacementMap)로 경량화하고,
 * - 움직이는 활성 물방울(pill)에서 중첩 backdrop-filter를 제거해 스크롤·드래그 버벅임을 원천 해소함.
 */
export declare function LiquidGlassBottomNav({ items, activeKey: controlledKey, defaultActiveKey, onActiveChange, position, reserveSpace, maxWidthClassName, ariaLabel, className, }: LiquidGlassBottomNavProps): import("react").JSX.Element | null;
