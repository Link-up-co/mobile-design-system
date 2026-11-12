import { type InputHTMLAttributes, type ReactNode } from "react";
export type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
    label?: ReactNode;
    description?: ReactNode;
};
/**
 * 기본 원형 라디오 버튼 (20×20px).
 * - 선택 시 바깥 원이 Primary로 물들고 안쪽 흰 원이 중심에서 탄력 있게 커짐(scale-0 -> scale-100)
 */
export declare function Radio({ label, description, disabled, className, ...rest }: RadioProps): import("react").JSX.Element;
export type RadioOption = {
    value: string;
    label: ReactNode;
    description?: ReactNode;
    disabled?: boolean;
};
export type RadioGroupProps = {
    name: string;
    options: RadioOption[];
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    direction?: "vertical" | "horizontal";
    "aria-label"?: string;
    className?: string;
};
export declare function RadioGroup({ name, options, value: controlled, defaultValue, onChange, direction, "aria-label": ariaLabel, className, }: RadioGroupProps): import("react").JSX.Element;
export type RadioButtonOption = {
    value: string;
    label: ReactNode;
    /** 가격·용량·보조 설명 (예: "46,900원") */
    subLabel?: ReactNode;
    disabled?: boolean;
};
export type RadioButtonGroupProps = {
    name: string;
    options: RadioButtonOption[];
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    /**
     * - `outline`: 테두리 버튼형 그리드 (선택 시 Primary 테두리 + 연한 브랜드 채움, 옵션/결제수단 선택용)
     * - `segmented`: 회색 트랙 위에서 흰 탭이 선택되는 세그먼트 스위치형 (수령방식·보관온도 전환용)
     */
    variant?: "outline" | "segmented";
    /** outline 모드 열 개수 (기본 2열, 0이면 내용 폭만큼 가로 나열) */
    columns?: 0 | 2 | 3 | 4;
    size?: "sm" | "md";
    "aria-label"?: string;
    className?: string;
};
/**
 * 버튼형 라디오 그룹 (`outline` 옵션 버튼형 / `segmented` 세그먼트 탭형).
 * - 내부에 실제 `<input type="radio" className="sr-only">`를 두어 폼 전송과 방향키(←/→) 키보드 탐색이 네이티브 그대로 동작
 */
export declare function RadioButtonGroup({ name, options, value: controlled, defaultValue, onChange, variant, columns, size, "aria-label": ariaLabel, className, }: RadioButtonGroupProps): import("react").JSX.Element;
