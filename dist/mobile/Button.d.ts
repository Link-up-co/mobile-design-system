import type { ButtonHTMLAttributes, ReactNode } from "react";
declare const VARIANTS: {
    readonly primary: "border-primary bg-primary text-primary-fg not-disabled:hover:bg-primary-hover not-disabled:active:bg-primary-hover";
    readonly soft: "border-transparent bg-primary-soft text-primary not-disabled:hover:brightness-95 not-disabled:active:brightness-90";
    readonly secondary: "border-line bg-surface text-ink not-disabled:hover:border-line-strong not-disabled:hover:bg-surface-subtle not-disabled:active:bg-canvas";
    readonly danger: "border-danger bg-danger text-white not-disabled:hover:bg-danger-hover not-disabled:active:bg-danger-hover";
    readonly ghost: "border-transparent bg-transparent text-ink-secondary not-disabled:hover:bg-canvas not-disabled:hover:text-ink not-disabled:active:bg-line/60";
};
declare const SIZES: {
    readonly sm: "h-9 px-3 text-body-sm";
    readonly md: "h-11 px-4 text-body";
    readonly lg: "h-[52px] px-5 text-section";
};
export type ButtonVariant = keyof typeof VARIANTS;
export type ButtonSize = keyof typeof SIZES;
export declare function buttonClass(variant?: ButtonVariant, size?: ButtonSize, fullWidth?: boolean): string;
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    loading?: boolean;
    icon?: ReactNode;
};
export declare function Button({ variant, size, fullWidth, loading, type, disabled, icon, className, children, ...rest }: ButtonProps): import("react").JSX.Element;
export type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
    "aria-label": string;
    icon: ReactNode;
    size?: "sm" | "md";
    badge?: number;
};
export declare function IconButton({ size, badge, icon, type, className, ...rest }: IconButtonProps): import("react").JSX.Element;
export {};
