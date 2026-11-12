"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, } from "react";
import clsx from "clsx";
import { formatCurrency } from "../tokens/index.js";
import { computeDiscountRate } from "./ProductCard.js";
import { Text } from "./Text.js";
import { CartIcon } from "./icons.js";
export function resolveCategoryIndex(categories, targetKey) {
    if (categories.length === 0 || !targetKey)
        return 0;
    const idx = categories.findIndex((c) => c.key === targetKey);
    return idx >= 0 ? idx : 0;
}
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
function ChevronRightSmall() {
    return (_jsx("svg", { "aria-hidden": "true", viewBox: "0 0 16 16", className: "size-3.5 shrink-0", children: _jsx("path", { d: "M6 3.5L10.5 8 6 12.5", fill: "none", stroke: "currentColor", strokeWidth: "1.15", strokeLinecap: "round", strokeLinejoin: "round" }) }));
}
function RankBadge({ rank, rankChange, }) {
    const isTop3 = rank <= 3;
    return (_jsxs("div", { className: "flex w-7 shrink-0 flex-col items-center justify-center pt-0.5 text-center", children: [_jsx("span", { className: clsx("text-section leading-none font-extrabold tabular-nums", isTop3 ? "text-primary" : "text-ink"), children: rank }), rankChange === "NEW" ? (_jsx("span", { className: "mt-1 text-[10px] leading-none font-bold tracking-tight text-danger", children: "NEW" })) : typeof rankChange === "number" && rankChange !== 0 ? (_jsx("span", { "aria-label": rankChange > 0
                    ? `${rankChange}단계 상승`
                    : `${Math.abs(rankChange)}단계 하락`, className: clsx("mt-1 text-[10px] leading-none font-semibold tabular-nums", rankChange > 0 ? "text-danger" : "text-ink-muted"), children: rankChange > 0 ? `▲${rankChange}` : `▼${Math.abs(rankChange)}` })) : (_jsx("span", { "aria-hidden": "true", className: "mt-1 text-[10px] leading-none text-ink-muted/60", children: "-" }))] }));
}
function RankingRow({ item, fallbackRank, }) {
    const rank = item.rank ?? fallbackRank;
    const discount = computeDiscountRate(item.price, item.originalPrice);
    const media = item.imageSrc ? (_jsx("img", { src: item.imageSrc, alt: item.imageAlt ?? item.name, loading: "lazy", draggable: false, className: "pointer-events-none size-full object-cover select-none transition-transform duration-300 ease-out group-hover:scale-[1.03]" })) : (item.thumbnail ?? _jsx("div", { className: "size-full bg-canvas" }));
    const titleNode = item.href ? (_jsx("a", { href: item.href, draggable: false, onClick: item.onClick, className: "ranking-link line-clamp-2 text-body-sm leading-[1.38] font-medium text-ink outline-transparent after:absolute after:inset-0 focus-visible:underline", children: item.name })) : item.onClick ? (_jsx("button", { type: "button", onClick: item.onClick, className: "ranking-link line-clamp-2 cursor-pointer text-left text-body-sm leading-[1.38] font-medium text-ink outline-transparent after:absolute after:inset-0 focus-visible:underline", children: item.name })) : (_jsx("span", { className: "line-clamp-2 text-body-sm leading-[1.38] font-medium text-ink", children: item.name }));
    const subMeta = [item.subtitle, item.salesLabel].filter(Boolean).join(" · ");
    return (_jsxs("article", { className: "group relative flex w-full items-center gap-3 px-5 py-3.5 transition-colors duration-150 ease-out has-[.ranking-link:active]:bg-canvas/70", children: [_jsx(RankBadge, { rank: rank, rankChange: item.rankChange }), _jsxs("div", { className: "relative size-[72px] shrink-0 overflow-hidden rounded-control bg-canvas/70 transition-[scale] duration-135 ease-out group-has-[.ranking-link:active]:scale-[0.97] motion-reduce:transition-none", children: [media, item.soldOut && (_jsx("div", { className: "pointer-events-none absolute inset-0 flex items-center justify-center bg-black/45", children: _jsx("span", { className: "rounded-full bg-black/75 px-2 py-0.5 text-[11px] font-semibold text-white", children: "\uC77C\uC2DC\uD488\uC808" }) }))] }), _jsxs("div", { className: "flex min-w-0 flex-1 flex-col justify-between gap-1.5", children: [_jsxs("div", { className: "min-w-0 space-y-0.5", children: [subMeta && _jsx("p", { className: "truncate text-caption text-ink-muted", children: subMeta }), titleNode] }), _jsxs("div", { className: "flex items-baseline gap-1.5", children: [discount > 0 && (_jsxs("span", { className: "text-body font-bold tabular-nums text-danger", children: [discount, "%"] })), _jsx("span", { className: clsx("text-body font-bold tabular-nums", item.soldOut ? "text-ink-muted" : "text-ink"), children: formatCurrency(item.price) }), discount > 0 && item.originalPrice && (_jsx("span", { className: "text-caption tabular-nums text-ink-muted line-through", children: formatCurrency(item.originalPrice) }))] })] }), item.onCartClick && (_jsx("button", { type: "button", "data-ranking-action": "", "aria-label": `${item.name} 장바구니 담기`, disabled: item.soldOut, onClick: item.onCartClick, className: "pressable relative z-10 inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-line bg-surface text-ink outline-transparent hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-40", children: _jsx(CartIcon, { className: "size-[18px]" }) }))] }));
}
/**
 * 카테고리별 판매량 순위 탭 슬라이드 컴포넌트.
 * - 1px 구분선 기반 풀폭 플랫 탭 바 + 선택된 탭 자동 중앙 정렬 + 언더라인 슬라이드
 * - 본문 좌우 터치/포인터 드래그 슬라이드로 카테고리 간 매끄러운 페이징 전환
 */
export function CategoryRanking({ title, subtitle, categories, activeKey: controlledKey, defaultActiveKey, onActiveChange, moreHref, onMoreClick, moreLabel = "전체보기", bleed = true, className, }) {
    const baseId = useId();
    const count = categories.length;
    const [innerIndex, setInnerIndex] = useState(() => resolveCategoryIndex(categories, controlledKey ?? defaultActiveKey));
    const activeIndex = controlledKey !== undefined
        ? resolveCategoryIndex(categories, controlledKey)
        : Math.min(innerIndex, Math.max(0, count - 1));
    const [dragOffsetPx, setDragOffsetPx] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [indicatorStyle, setIndicatorStyle] = useState(null);
    const tabBarRef = useRef(null);
    const tabRefs = useRef([]);
    const viewportRef = useRef(null);
    const suppressClickRef = useRef(false);
    const mountedRef = useRef(false);
    const dragStateRef = useRef(null);
    const selectIndex = useCallback((nextIdx) => {
        if (nextIdx < 0 || nextIdx >= count)
            return;
        if (controlledKey === undefined) {
            setInnerIndex(nextIdx);
        }
        if (nextIdx !== activeIndex) {
            onActiveChange?.(categories[nextIdx].key, nextIdx);
        }
    }, [activeIndex, categories, controlledKey, count, onActiveChange]);
    // 선택된 탭 언더라인 측정 + 탭 바 중앙 정렬 스크롤
    const syncTabPosition = useCallback((smooth) => {
        const bar = tabBarRef.current;
        const btn = tabRefs.current[activeIndex];
        if (!bar || !btn)
            return;
        setIndicatorStyle({
            left: btn.offsetLeft,
            width: btn.offsetWidth,
        });
        const targetScrollLeft = Math.max(0, btn.offsetLeft + btn.offsetWidth / 2 - bar.clientWidth / 2);
        if (typeof bar.scrollTo === "function") {
            bar.scrollTo({
                left: targetScrollLeft,
                behavior: smooth ? "smooth" : "auto",
            });
        }
        else {
            bar.scrollLeft = targetScrollLeft;
        }
    }, [activeIndex]);
    useIsoLayoutEffect(() => {
        const isInitial = !mountedRef.current;
        mountedRef.current = true;
        syncTabPosition(!isInitial);
    }, [syncTabPosition]);
    useEffect(() => {
        const onResize = () => syncTabPosition(false);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [syncTabPosition]);
    function handleTabKeyDown(e) {
        if (count <= 1)
            return;
        let next = activeIndex;
        if (e.key === "ArrowRight")
            next = (activeIndex + 1) % count;
        else if (e.key === "ArrowLeft")
            next = (activeIndex - 1 + count) % count;
        else if (e.key === "Home")
            next = 0;
        else if (e.key === "End")
            next = count - 1;
        else
            return;
        e.preventDefault();
        selectIndex(next);
        tabRefs.current[next]?.focus();
    }
    function handlePointerDown(e) {
        if (count <= 1)
            return;
        if (e.pointerType === "mouse" && e.button !== 0)
            return;
        if (e.target.closest("[data-ranking-action]"))
            return;
        suppressClickRef.current = false;
        dragStateRef.current = {
            pointerId: e.pointerId,
            startX: e.clientX,
            startY: e.clientY,
            startTime: performance.now(),
            width: viewportRef.current?.clientWidth || 1,
            lockedAxis: null,
        };
    }
    function handlePointerMove(e) {
        const st = dragStateRef.current;
        if (!st || st.pointerId !== e.pointerId)
            return;
        const dx = e.clientX - st.startX;
        const dy = e.clientY - st.startY;
        if (!st.lockedAxis) {
            if (Math.abs(dx) < 7 && Math.abs(dy) < 7)
                return;
            st.lockedAxis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
            if (st.lockedAxis === "x") {
                setDragging(true);
                try {
                    e.currentTarget.setPointerCapture(e.pointerId);
                }
                catch {
                    // ignore
                }
            }
        }
        if (st.lockedAxis !== "x")
            return;
        if (Math.abs(dx) > 8) {
            suppressClickRef.current = true;
        }
        // 양 끝 경계에서는 저항감(rubber-band 0.32x) 부여
        const atStart = activeIndex === 0 && dx > 0;
        const atEnd = activeIndex === count - 1 && dx < 0;
        setDragOffsetPx(atStart || atEnd ? dx * 0.32 : dx);
    }
    function finishDrag(e, cancelled) {
        const st = dragStateRef.current;
        if (!st || st.pointerId !== e.pointerId)
            return;
        dragStateRef.current = null;
        if (st.lockedAxis !== "x") {
            setDragging(false);
            setDragOffsetPx(0);
            return;
        }
        const dx = cancelled ? 0 : e.clientX - st.startX;
        const elapsed = Math.max(1, performance.now() - st.startTime);
        const velocity = dx / elapsed;
        setDragging(false);
        setDragOffsetPx(0);
        const threshold = st.width * 0.18;
        if ((dx <= -threshold || velocity < -0.35) && activeIndex < count - 1) {
            selectIndex(activeIndex + 1);
        }
        else if ((dx >= threshold || velocity > 0.35) && activeIndex > 0) {
            selectIndex(activeIndex - 1);
        }
    }
    if (count === 0)
        return null;
    const activeCategory = categories[activeIndex];
    const resolvedMoreHref = activeCategory.moreHref ?? moreHref;
    const resolvedMoreClick = activeCategory.onMoreClick ?? onMoreClick;
    const showHeader = Boolean(title || subtitle || resolvedMoreHref || resolvedMoreClick);
    const moreClassName = "pressable inline-flex shrink-0 cursor-pointer items-center gap-0.5 rounded-control py-1 pl-2 pr-1 text-body-sm font-medium text-ink-secondary outline-transparent hover:text-ink focus-visible:outline-2 focus-visible:outline-primary";
    return (_jsxs("section", { "data-category-ranking": "", className: clsx("w-full", className), children: [showHeader && (_jsxs("div", { className: "mb-3 flex items-end justify-between gap-3", children: [_jsxs("div", { className: "min-w-0 flex-1 space-y-0.5", children: [title && (_jsx(Text, { as: "h2", variant: "title", className: "truncate", children: title })), subtitle && (_jsx(Text, { as: "p", variant: "body-sm", tone: "muted", className: "truncate", children: subtitle }))] }), (resolvedMoreHref || resolvedMoreClick) &&
                        (resolvedMoreHref ? (_jsxs("a", { href: resolvedMoreHref, onClick: resolvedMoreClick, className: moreClassName, children: [_jsx("span", { children: moreLabel }), _jsx(ChevronRightSmall, {})] })) : (_jsxs("button", { type: "button", onClick: resolvedMoreClick, className: moreClassName, children: [_jsx("span", { children: moreLabel }), _jsx(ChevronRightSmall, {})] })))] })), _jsxs("div", { className: clsx(bleed && "-mx-5"), children: [_jsxs("div", { ref: tabBarRef, role: "tablist", "aria-label": typeof title === "string" ? `${title} 카테고리` : "카테고리 순위 탭", onKeyDown: handleTabKeyDown, className: "subtle-scrollbar relative flex overflow-x-auto border-b border-line bg-surface px-5", children: [categories.map((cat, idx) => {
                                const selected = idx === activeIndex;
                                return (_jsx("button", { ref: (el) => {
                                        tabRefs.current[idx] = el;
                                    }, id: `${baseId}-tab-${cat.key}`, type: "button", role: "tab", "aria-selected": selected, "aria-controls": `${baseId}-panel-${cat.key}`, tabIndex: selected ? 0 : -1, onClick: () => selectIndex(idx), className: clsx("pressable relative h-11 shrink-0 cursor-pointer px-3.5 text-body-sm whitespace-nowrap transition-colors outline-transparent focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary", selected
                                        ? "font-bold text-ink"
                                        : "font-medium text-ink-muted hover:text-ink-secondary", 
                                    // SSR 및 초기 측정 전 폴백 언더라인
                                    selected &&
                                        !indicatorStyle &&
                                        "after:absolute after:right-3.5 after:bottom-0 after:left-3.5 after:h-[2px] after:bg-primary"), children: cat.label }, cat.key));
                            }), indicatorStyle && (_jsx("span", { "aria-hidden": "true", style: {
                                    transform: `translate3d(${indicatorStyle.left}px, 0, 0)`,
                                    width: `${indicatorStyle.width}px`,
                                }, className: "pointer-events-none absolute bottom-0 left-0 h-[2px] bg-primary transition-[transform,width] duration-250 ease-out motion-reduce:transition-none" }))] }), _jsx("div", { ref: viewportRef, style: { touchAction: "pan-y" }, onPointerDown: handlePointerDown, onPointerMove: handlePointerMove, onPointerUp: (e) => finishDrag(e, false), onPointerCancel: (e) => finishDrag(e, true), onClickCapture: (e) => {
                            if (suppressClickRef.current) {
                                e.preventDefault();
                                e.stopPropagation();
                                suppressClickRef.current = false;
                            }
                        }, className: "w-full overflow-hidden border-b border-line bg-surface", children: _jsx("div", { style: {
                                transform: `translate3d(calc(${-activeIndex * 100}% + ${dragOffsetPx}px), 0, 0)`,
                                transition: dragging
                                    ? "none"
                                    : "transform 320ms cubic-bezier(0.22, 1, 0.36, 1)",
                            }, className: "flex w-full items-start will-change-transform motion-reduce:transition-none!", children: categories.map((cat, idx) => {
                                const active = idx === activeIndex;
                                return (_jsx("div", { id: `${baseId}-panel-${cat.key}`, role: "tabpanel", "aria-labelledby": `${baseId}-tab-${cat.key}`, "aria-hidden": !active, inert: !active ? true : undefined, className: "w-full shrink-0 divide-y divide-line", children: cat.items.map((item, rowIdx) => (_jsx(RankingRow, { item: item, fallbackRank: rowIdx + 1 }, item.id))) }, cat.key));
                            }) }) })] })] }));
}
