"use client";

import { useState } from "react";
import clsx from "clsx";
import { BottomSheet } from "./BottomSheet";
import { controlClass, type ControlSize } from "./Input";
import { CheckIcon, ChevronDownIcon, CloseIcon, SearchIcon } from "./icons";

export type SelectOption = {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
};

export function filterSelectOptions(options: readonly SelectOption[], query: string): SelectOption[] {
  const q = query.trim().toLowerCase();
  if (!q) return [...options];
  return options.filter(
    (o) =>
      o.label.toLowerCase().includes(q) ||
      (o.description ? o.description.toLowerCase().includes(q) : false)
  );
}

export type SelectProps = {
  id?: string;
  name?: string;
  options: readonly SelectOption[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  /** 바텀시트 상단 타이틀 (생략 시 placeholder 사용) */
  title?: string;
  /** 검색창 노출 여부 (생략 시 옵션 8개 이상이면 자동 노출) */
  searchable?: boolean;
  searchPlaceholder?: string;
  size?: ControlSize;
  invalid?: boolean;
  disabled?: boolean;
  defaultOpen?: boolean;
  onChange?: (value: string, option: SelectOption) => void;
  className?: string;
};

/**
 * 바텀시트 연동 모바일 셀렉트 박스.
 * - 클릭 시 바텀시트가 아래에서 올라오고, 옵션을 고르면 선택 반영 후 시트가 부드럽게 내려감
 * - 옵션이 많을 때(`options.length >= 8` 또는 `searchable`) 시트 상단 실시간 검색 지원
 */
export function Select({
  id,
  name,
  options,
  value: controlled,
  defaultValue = "",
  placeholder = "선택해 주세요",
  title,
  searchable,
  searchPlaceholder = "검색어를 입력하세요",
  size = "md",
  invalid = false,
  disabled = false,
  defaultOpen = false,
  onChange,
  className,
}: SelectProps) {
  const [inner, setInner] = useState(defaultValue);
  const [open, setOpen] = useState(defaultOpen);
  const [query, setQuery] = useState("");

  const current = controlled ?? inner;
  const selected = options.find((o) => o.value === current);
  const showSearch = searchable ?? options.length >= 8;
  const filtered = showSearch ? filterSelectOptions(options, query) : options;

  function openSheet() {
    if (disabled) return;
    setQuery("");
    setOpen(true);
  }

  function handleSelect(option: SelectOption) {
    if (option.disabled) return;
    if (controlled === undefined) setInner(option.value);
    onChange?.(option.value, option);
    setOpen(false);
  }

  return (
    <>
      {name && <input type="hidden" name={name} value={current} />}
      <button
        id={id}
        type="button"
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-invalid={invalid || undefined}
        onClick={openSheet}
        className={clsx(
          controlClass(size, invalid),
          "pressable flex cursor-pointer items-center justify-between gap-2 text-left",
          open && !invalid && "border-primary! bg-surface! ring-2 ring-primary/15",
          className
        )}
      >
        <span className={clsx("min-w-0 flex-1 truncate", selected ? "text-ink" : "text-ink-muted")}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDownIcon open={open} className="text-ink-muted" />
      </button>

      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        title={title ?? placeholder}
        showClose
      >
        {showSearch && (
          <div className="sticky top-0 z-10 bg-surface pt-0.5 pb-2.5">
            <div className="relative flex items-center">
              <SearchIcon className="pointer-events-none absolute left-3.5 size-4 text-ink-muted" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
                className={clsx(
                  controlClass("md", false),
                  "pl-9 [&::-webkit-search-cancel-button]:hidden",
                  query.length > 0 && "pr-9"
                )}
              />
              {query.length > 0 && (
                <button
                  type="button"
                  aria-label="검색어 지우기"
                  onClick={() => setQuery("")}
                  className="pressable absolute right-2 inline-flex size-6 cursor-pointer items-center justify-center rounded-full bg-line/80 text-ink-secondary hover:bg-line-strong hover:text-ink"
                >
                  <CloseIcon className="size-3.5" />
                </button>
              )}
            </div>
          </div>
        )}

        <div className={clsx(showSearch && "min-h-[48dvh]")}>
          {filtered.length === 0 ? (
            <p className="py-10 text-center text-body-sm text-ink-muted">검색 결과가 없습니다.</p>
          ) : (
            <div role="listbox" aria-label={title ?? placeholder} className="divide-y divide-line">
              {filtered.map((o) => {
                const active = o.value === current;
                return (
                  <button
                    key={o.value}
                    type="button"
                    role="option"
                    aria-selected={active}
                    disabled={o.disabled}
                    onClick={() => handleSelect(o)}
                    className={clsx(
                      "pressable flex min-h-12 w-full cursor-pointer items-center justify-between gap-3 py-2.5 text-left transition-colors duration-150",
                      o.disabled
                        ? "cursor-not-allowed opacity-45"
                        : active
                          ? "text-primary"
                          : "text-ink hover:text-primary"
                    )}
                  >
                    <span className="flex min-w-0 flex-col gap-0.5">
                      <span className={clsx("truncate text-body", active ? "font-semibold" : "font-medium")}>
                        {o.label}
                      </span>
                      {o.description && (
                        <span className="truncate text-caption text-ink-muted">{o.description}</span>
                      )}
                    </span>
                    {active && <CheckIcon className="text-primary" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </BottomSheet>
    </>
  );
}
