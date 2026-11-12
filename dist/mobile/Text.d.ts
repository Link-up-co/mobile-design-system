import type { ElementType, HTMLAttributes, ReactNode } from "react";
declare const VARIANTS: {
    readonly hero: "text-hero font-bold";
    readonly title: "text-title font-bold";
    readonly section: "text-section font-semibold";
    readonly body: "text-body font-normal";
    readonly "body-sm": "text-body-sm font-normal";
    readonly caption: "text-caption font-medium";
    readonly price: "text-price font-extrabold tabular-nums";
};
declare const TONES: {
    readonly ink: "text-ink";
    readonly secondary: "text-ink-secondary";
    readonly muted: "text-ink-muted";
    readonly primary: "text-primary";
    readonly danger: "text-danger";
    readonly success: "text-success";
};
export type TextVariant = keyof typeof VARIANTS;
export type TextTone = keyof typeof TONES;
export type TextProps = HTMLAttributes<HTMLElement> & {
    as?: ElementType;
    variant?: TextVariant;
    tone?: TextTone;
    children?: ReactNode;
};
export declare function Text({ as, variant, tone, className, children, ...rest }: TextProps): import("react").JSX.Element;
export {};
