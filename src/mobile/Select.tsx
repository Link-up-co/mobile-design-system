"use client";

import { useEffect, useRef, useState } from "react";
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

const CHOSEONG = [
  "ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ",
  "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ",
] as const;
const CHOSEONG_SET = new Set<string>(CHOSEONG);

function toChoseong(ch: string): string {
  const code = ch.charCodeAt(0);
  return code >= 0xac00 && code <= 0xd7a3 ? CHOSEONG[Math.floor((code - 0xac00) / 588)] : ch;
}

/** 일반 문자열·한글 초성('ㅅㅅ')·타이핑 중 혼합('강ㄴ') 검색 매칭 */
export function matchesKoreanQuery(target: string, query: string): boolean {
  const q = query.replace(/\s+/g, "").toLowerCase();
  if (!q) return true;
  const t = target.replace(/\s+/g, "").toLowerCase();
  if (t.length < q.length) return false;
  if (t.includes(q)) return true;

  const limit = t.length - q.length;
  for (let i = 0; i <= limit; i++) {
    let ok = true;
    for (let j = 0; j < q.length; j++) {
      const qChar = q[j];
      const tChar = t[i + j];
      if (CHOSEONG_SET.has(qChar) ? toChoseong(tChar) !== qChar : tChar !== qChar) {
        ok = false;
        break;
      }
    }
    if (ok) return true;
  }
  return false;
}

export function filterSelectOptions(options: readonly SelectOption[], query: string): SelectOption[] {
  if (!query.trim()) return [...options];
  return options.filter(
    (o) =>
      matchesKoreanQuery(o.label, query) ||
      (o.description ? matchesKoreanQuery(o.description, query) : false)
  );
}

export function computeVirtualRange(
  count: number,
  itemHeight: number,
  scrollTop: number,
  viewportHeight: number,
  overscan = 5
) {
  if (count === 0) return { start: 0, end: 0, offsetY: 0, totalHeight: 0 };
  const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const end = Math.min(count, Math.ceil((scrollTop + viewportHeight) / itemHeight) + overscan);
  return { start, end, offsetY: start * itemHeight, totalHeight: count * itemHeight };
}

const DEFAULT_VIEWPORT_H = 420;

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
 * 바텀시트 연동 모바일 셀렉트 박스 (한글 초성 검색 + 가상 스크롤 내장).
 * - 클릭 시 바텀시트가 올라오고, 옵션을 선택하면 값 반영 후 시트가 부드럽게 내려감
 * - 대량 옵션에서도 보이는 구간만 DOM에 마운트해 버벅임 없이 스크롤됨
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
  searchPlaceholder = "검색어 또는 초성 입력",
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
  const [scrollTop, setScrollTop] = useState(0);
  const [viewportH, setViewportH] = useState(DEFAULT_VIEWPORT_H);
  const listRef = useRef<HTMLDivElement>(null);

  const current = controlled ?? inner;
  const selected = options.find((o) => o.value === current);
  const showSearch = searchable ?? options.length >= 8;
  const filtered = showSearch ? filterSelectOptions(options, query) : options;
  const itemHeight = options.some((o) => Boolean(o.description)) ? 60 : 48;

  useEffect(() => {
    if (!open) return;
    const el = listRef.current;
    if (!el) return;
    if (el.clientHeight > 0) setViewportH(el.clientHeight);
    const idx = options.findIndex((o) => o.value === current);
    const nextTop = idx > 2 ? Math.max(0, idx * itemHeight - itemHeight * 2) : 0;
    el.scrollTop = nextTop;
    setScrollTop(nextTop);
  }, [open, options, current, itemHeight]);

  function openSheet() {
    if (disabled) return;
    setQuery("");
    setScrollTop(0);
    setOpen(true);
  }

  function updateQuery(next: string) {
    setQuery(next);
    setScrollTop(0);
    if (listRef.current) listRef.current.scrollTop = 0;
  }

  function handleSelect(option: SelectOption) {
    if (option.disabled) return;
    if (controlled === undefined) setInner(option.value);
    onChange?.(option.value, option);
    setOpen(false);
  }

  const { start, end, offsetY, totalHeight } = computeVirtualRange(
    filtered.length,
    itemHeight,
    scrollTop,
    viewportH
  );
  const visibleSlice = filtered.slice(start, end);

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
          <div className="bg-surface pt-0.5 pb-2.5">
            <div className="relative flex items-center">
              <SearchIcon className="pointer-events-none absolute left-3.5 size-4 text-ink-muted" />
              <input
                type="search"
                value={query}
                onChange={(e) => updateQuery(e.target.value)}
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
                  onClick={() => updateQuery("")}
                  className="pressable absolute right-2 inline-flex size-6 cursor-pointer items-center justify-center rounded-full bg-line/80 text-ink-secondary hover:bg-line-strong hover:text-ink"
                >
                  <CloseIcon className="size-3.5" />
                </button>
              )}
            </div>
          </div>
        )}

        <div
          ref={listRef}
          onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
          className={clsx(
            "subtle-scrollbar max-h-[50dvh] overflow-y-auto",
            showSearch && "min-h-[48dvh]"
          )}
        >
          {filtered.length === 0 ? (
            <p className="py-10 text-center text-body-sm text-ink-muted">검색 결과가 없습니다.</p>
          ) : (
            <div
              role="listbox"
              aria-label={title ?? placeholder}
              style={{ height: `${totalHeight}px`, position: "relative" }}
            >
              <div style={{ transform: `translateY(${offsetY}px)` }}>
                {visibleSlice.map((o, localIdx) => {
                  const index = start + localIdx;
                  const active = o.value === current;
                  return (
                    <button
                      key={o.value}
                      type="button"
                      role="option"
                      aria-selected={active}
                      disabled={o.disabled}
                      style={{ height: `${itemHeight}px` }}
                      onClick={() => handleSelect(o)}
                      className={clsx(
                        "pressable flex w-full cursor-pointer items-center justify-between gap-3 text-left",
                        index < filtered.length - 1 && "border-b border-line",
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
            </div>
          )}
        </div>
      </BottomSheet>
    </>
  );
}
