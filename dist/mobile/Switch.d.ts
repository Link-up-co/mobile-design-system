import { type ReactNode } from "react";
export type SwitchProps = {
    id?: string;
    name?: string;
    value?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    size?: "sm" | "md";
    /** 좌측 항목명 (지정 시 좌우 정렬된 설정 행 형태로 렌더링) */
    label?: ReactNode;
    /** 좌측 보조 설명 */
    description?: ReactNode;
    "aria-label"?: string;
    className?: string;
};
/**
 * 모바일 ON/OFF 토글 스위치 (`role="switch"` + 프레스 탄성 피드백).
 * - 단독 스위치 및 좌우 풀폭 설정 행(`label` 포함) 두 형태 모두 지원
 */
export declare function Switch({ id, name, value, checked: controlled, defaultChecked, onChange, disabled, size, label, description, "aria-label": ariaLabel, className, }: SwitchProps): import("react").JSX.Element;
