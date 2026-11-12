import { type InputHTMLAttributes, type ReactNode } from "react";
export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
    label?: ReactNode;
    description?: ReactNode;
    /** 일부만 선택된 상태(전체 선택 체크박스) */
    indeterminate?: boolean;
};
/**
 * 모바일 터치 친화적 체크박스 (20×20px 라운드 박스 + 체크 드로잉 모션).
 * - 라벨 전체가 넉넉한 터치 영역이 되며, 누르는 동안 박스가 0.9배로 살짝 눌림
 */
export declare function Checkbox({ label, description, indeterminate, disabled, className, ...rest }: CheckboxProps): import("react").JSX.Element;
export type CheckboxOption = {
    value: string;
    label: ReactNode;
    description?: ReactNode;
    disabled?: boolean;
};
export declare function toggleCheckboxValue(selected: string[], value: string, order: string[]): string[];
export type CheckboxGroupProps = {
    name: string;
    options: CheckboxOption[];
    value?: string[];
    defaultValue?: string[];
    onChange?: (value: string[]) => void;
    /** 주면 맨 위에 전체 선택 체크박스(구분선 포함)를 표시 */
    allLabel?: ReactNode;
    direction?: "vertical" | "horizontal";
    "aria-label"?: string;
    className?: string;
};
export declare function CheckboxGroup({ name, options, value: controlled, defaultValue, onChange, allLabel, direction, "aria-label": ariaLabel, className, }: CheckboxGroupProps): import("react").JSX.Element;
