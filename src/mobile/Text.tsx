import type { ElementType, HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

const VARIANTS = {
  hero: "text-hero font-bold",
  title: "text-title font-bold",
  section: "text-section font-semibold",
  body: "text-body font-normal",
  "body-sm": "text-body-sm font-normal",
  caption: "text-caption font-medium",
  price: "text-price font-extrabold tabular-nums",
} as const;

const TONES = {
  ink: "text-ink",
  secondary: "text-ink-secondary",
  muted: "text-ink-muted",
  primary: "text-primary",
  danger: "text-danger",
  success: "text-success",
} as const;

export type TextVariant = keyof typeof VARIANTS;
export type TextTone = keyof typeof TONES;

export type TextProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  variant?: TextVariant;
  tone?: TextTone;
  children?: ReactNode;
};

export function Text({
  as,
  variant = "body",
  tone = "ink",
  className,
  children,
  ...rest
}: TextProps) {
  const Tag: ElementType =
    as ?? (variant === "hero" || variant === "title" ? "h1" : variant === "section" ? "h2" : "span");
  return (
    <Tag className={clsx(VARIANTS[variant], TONES[tone], className)} {...rest}>
      {children}
    </Tag>
  );
}
