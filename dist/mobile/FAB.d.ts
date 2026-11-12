import { type ButtonHTMLAttributes, type ReactNode } from "react";
export type FABProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
    /** 아이콘 (기본 `<PlusIcon />`) */
    icon?: ReactNode;
    /** 텍스트 라벨 함께 표시 시 확장형 캡슐 버튼으로 렌더링 */
    label?: string;
    /** 스크린리더용 라벨 (`label` 생략 시 필수 권장, 기본 `"작성하기"`) */
    "aria-label"?: string;
    variant?: "primary" | "surface";
    /** `"fixed"`: 모바일 컨테이너 우측 하단 플로팅(기본) · `"static"`: 인라인 미리보기용 */
    position?: "fixed" | "static";
    /** 하단 바텀 네비게이션(`BottomNav`) 높이만큼 위로 띄울지 여부 (기본 `true`) */
    offsetBottomNav?: boolean;
    maxWidthClassName?: string;
};
/**
 * 우측 하단 `+` 플로팅 액션 버튼 (`FAB`).
 * - 모바일 `412px` 컨테이너 우측 안쪽에 정확히 정렬되며 하단 메뉴(`BottomNav`) 및 Safe Area 자동 회피 지원
 */
export declare function FAB({ icon, label, "aria-label": ariaLabel, variant, position, offsetBottomNav, maxWidthClassName, className, ...rest }: FABProps): import("react").JSX.Element;
export type ScrollTopFABProps = {
    /** 버튼이 나타나기 시작하는 스크롤 Y 임계값 (기본 `280px`) */
    threshold?: number;
    offsetBottomNav?: boolean;
    maxWidthClassName?: string;
    className?: string;
};
/**
 * 스크롤을 내렸을 때 우측 하단에 부드럽게 나타나는 `맨 위로` 플로팅 버튼 (`ScrollTopFAB`).
 */
export declare function ScrollTopFAB({ threshold, offsetBottomNav, maxWidthClassName, className, }: ScrollTopFABProps): import("react").JSX.Element;
