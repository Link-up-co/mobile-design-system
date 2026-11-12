import type { ReactNode } from "react";
export type AppHeaderProps = {
    /** 뒤로가기 버튼 바로 오른쪽에 표시할 타이틀 (길면 `...` 말줄임) */
    title?: string;
    /** 좌측 뒤로가기 노출 여부 (기본 true) */
    showBack?: boolean;
    /** 뒤로가기 클릭 핸들러 (생략 시 `window.history.back()`) */
    onBack?: () => void;
    /** 우측 기능 버튼 영역 (IconButton 1개 또는 2개 권장) */
    actions?: ReactNode;
    sticky?: boolean;
    bordered?: boolean;
    className?: string;
};
/**
 * 모바일 상단 앱 헤더 (높이 52px + 상단 safe-area).
 * - 좌측 뒤로가기 버튼 + 바로 옆 좌측 정렬 타이틀(길어지면 `...` 말줄임) + 우측 기능 버튼 1~2개
 */
export declare function AppHeader({ title, showBack, onBack, actions, sticky, bordered, className, }: AppHeaderProps): import("react").JSX.Element;
