"use client";

import { useId, useState, type ReactNode } from "react";
import clsx from "clsx";
import { ChevronDownIcon } from "./icons";

export type AccordionItem = {
  key: string;
  title: ReactNode;
  subtitle?: ReactNode;
  content: ReactNode;
  disabled?: boolean;
};

export type AccordionProps = {
  items: readonly AccordionItem[];
  /** `"single"`: 한 번에 하나만 펼침(기본) · `"multiple"`: 다중 펼침 허용 */
  type?: "single" | "multiple";
  defaultOpenKeys?: readonly string[];
  openKeys?: readonly string[];
  onOpenKeysChange?: (keys: string[]) => void;
  /** 모바일 좌우 여백 풀폭 확장(`-mx-5`) 여부 */
  bleed?: boolean;
  className?: string;
};

/**
 * 1px 구분선 기반의 풀폭 플랫 `Accordion` (상품 고시정보 · 약관 상세 · FAQ).
 * - 둥근 카드 박스 없이 `border-y divide-y` 플랫 리스트 구조 + CSS Grid `0fr -> 1fr` 부드러운 펼침 모션
 */
export function Accordion({
  items,
  type = "single",
  defaultOpenKeys = [],
  openKeys: controlledKeys,
  onOpenKeysChange,
  bleed = false,
  className,
}: AccordionProps) {
  const baseId = useId();
  const [innerKeys, setInnerKeys] = useState<string[]>(() => [...defaultOpenKeys]);
  const activeKeys = controlledKeys !== undefined ? [...controlledKeys] : innerKeys;

  if (items.length === 0) return null;

  function toggleItem(key: string) {
    const exists = activeKeys.includes(key);
    let next: string[];
    if (type === "single") {
      next = exists ? [] : [key];
    } else {
      next = exists ? activeKeys.filter((k) => k !== key) : [...activeKeys, key];
    }
    if (controlledKeys === undefined) setInnerKeys(next);
    onOpenKeysChange?.(next);
  }

  return (
    <div
      data-accordion=""
      className={clsx(
        "divide-y divide-line border-y border-line bg-surface",
        bleed && "-mx-5",
        className
      )}
    >
      {items.map((item) => {
        const open = activeKeys.includes(item.key);
        const headerId = `${baseId}-hdr-${item.key}`;
        const panelId = `${baseId}-pnl-${item.key}`;

        return (
          <div key={item.key} data-accordion-item="" data-open={open ? "true" : "false"}>
            <button
              id={headerId}
              type="button"
              disabled={item.disabled}
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => toggleItem(item.key)}
              className={clsx(
                "flex w-full cursor-pointer items-center justify-between gap-3 py-3.5 text-left transition-colors duration-150 outline-transparent hover:bg-surface-subtle/60 active:bg-surface-subtle focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-45",
                bleed ? "px-5" : "px-1"
              )}
            >
              <div className="min-w-0 flex-1">
                <span className="block text-body font-semibold text-ink">
                  {item.title}
                </span>
                {item.subtitle && (
                  <span className="mt-0.5 block text-caption text-ink-muted">
                    {item.subtitle}
                  </span>
                )}
              </div>
              <ChevronDownIcon open={open} className="text-ink-muted" />
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
              className="grid transition-[grid-template-rows] duration-260 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none!"
            >
              <div className="overflow-hidden">
                <div
                  className={clsx(
                    "pb-4 text-body-sm leading-[1.6] text-ink-secondary",
                    bleed ? "px-5" : "px-1"
                  )}
                >
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
