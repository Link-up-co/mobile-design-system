export declare function clampQuantity(value: number, min?: number, max?: number): number;
export type QuantityStepperProps = {
    id?: string;
    name?: string;
    value?: number;
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number;
    size?: "sm" | "md";
    disabled?: boolean;
    onChange?: (value: number) => void;
    className?: string;
};
/**
 * 모바일 수량 조절기 (`−` / 숫자 / `+`) + 카운트업·다운 슬라이드 인터랙션.
 * - 이전 숫자가 반대 방향으로 밀려 나가고 새 숫자가 들어오는 2겹 키프레임 슬라이드(380ms)로 카운트 움직임이 눈으로 또렷하게 보임
 * - 직접 숫자를 타이핑해서 바꿀 수 있도록 투명 입력칸을 위에 겹쳐 둠
 */
export declare function QuantityStepper({ id, name, value: controlled, defaultValue, min, max, step, size, disabled, onChange, className, }: QuantityStepperProps): import("react").JSX.Element;
