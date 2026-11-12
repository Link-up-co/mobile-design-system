"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState, } from "react";
import clsx from "clsx";
export function normalizeSlideIndex(index, count) {
    if (count <= 0)
        return 0;
    return ((index % count) + count) % count;
}
/**
 * 모바일 메인배너 이미지 슬라이더.
 * - 터치/포인터 드래그 실시간 추종 + 속도·거리 기반 스냅 전환
 * - 2장 이상 무한 루프 트랙, 자동 재생 및 일시정지 토글, 우측 하단 `1 / N` 카운터·하단 도트 지원
 */
export function BannerSlider({ slides, variant = "bleed", aspectRatio = "16 / 9", autoPlayMs = 4000, indicator = "counter", index: controlledIndex, defaultIndex = 0, onIndexChange, onViewAllClick, ariaLabel = "메인 프로모션 배너", className, }) {
    const count = slides.length;
    const canLoop = count > 1;
    const initialReal = normalizeSlideIndex(controlledIndex ?? defaultIndex, count);
    // 무한 루프 트랙: [lastClone, ...slides, firstClone] -> 실제 슬라이드는 trackIdx 1..count
    const [trackIdx, setTrackIdx] = useState(canLoop ? initialReal + 1 : 0);
    const [animating, setAnimating] = useState(false);
    const [dragOffsetPx, setDragOffsetPx] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [paused, setPaused] = useState(false);
    const viewportRef = useRef(null);
    const dragStateRef = useRef(null);
    const suppressClickRef = useRef(false);
    const activeRealIndex = canLoop
        ? normalizeSlideIndex(trackIdx - 1, count)
        : 0;
    // 외부 제어형 index 동기화
    useEffect(() => {
        if (controlledIndex === undefined || count <= 1)
            return;
        const target = normalizeSlideIndex(controlledIndex, count);
        if (target !== activeRealIndex) {
            setAnimating(true);
            setTrackIdx(target + 1);
        }
    }, [controlledIndex, count, activeRealIndex]);
    function commitRealChange(nextTrackIdx) {
        setAnimating(true);
        setTrackIdx(nextTrackIdx);
        const nextReal = canLoop ? normalizeSlideIndex(nextTrackIdx - 1, count) : 0;
        if (nextReal !== activeRealIndex) {
            onIndexChange?.(nextReal);
        }
    }
    function stepBy(delta) {
        if (!canLoop)
            return;
        setTrackIdx((prev) => {
            // 클론 위치에 머물러 있을 때 연속 스와이프 방어
            const safePrev = prev <= 0 ? count : prev >= count + 1 ? 1 : prev;
            const next = safePrev + delta;
            const nextReal = normalizeSlideIndex(next - 1, count);
            onIndexChange?.(nextReal);
            setAnimating(true);
            return next;
        });
    }
    function handleTransitionEnd() {
        if (!canLoop)
            return;
        setAnimating(false);
        if (trackIdx === 0) {
            setTrackIdx(count);
        }
        else if (trackIdx === count + 1) {
            setTrackIdx(1);
        }
    }
    // 자동 슬라이드 타이머
    useEffect(() => {
        if (!canLoop || autoPlayMs <= 0 || paused || dragging)
            return;
        const id = window.setInterval(() => {
            if (document.hidden)
                return;
            stepBy(1);
        }, autoPlayMs);
        return () => window.clearInterval(id);
    }, [canLoop, autoPlayMs, paused, dragging, count]);
    function handlePointerDown(e) {
        if (!canLoop)
            return;
        if (e.pointerType === "mouse" && e.button !== 0)
            return;
        // 인디케이터/컨트롤 버튼 클릭 시 드래그 시작 제외
        if (e.target.closest("[data-banner-control]"))
            return;
        const width = viewportRef.current?.clientWidth || 1;
        // 클론 경계에서 터치를 시작하면 즉시 실제 위치로 스냅 보정
        if (trackIdx === 0) {
            setAnimating(false);
            setTrackIdx(count);
        }
        else if (trackIdx === count + 1) {
            setAnimating(false);
            setTrackIdx(1);
        }
        suppressClickRef.current = false;
        dragStateRef.current = {
            pointerId: e.pointerId,
            startX: e.clientX,
            startY: e.clientY,
            startTime: performance.now(),
            width,
            lockedAxis: null,
            moved: false,
        };
    }
    function handlePointerMove(e) {
        const st = dragStateRef.current;
        if (!st || st.pointerId !== e.pointerId)
            return;
        const dx = e.clientX - st.startX;
        const dy = e.clientY - st.startY;
        if (!st.lockedAxis) {
            if (Math.abs(dx) < 6 && Math.abs(dy) < 6)
                return;
            st.lockedAxis = Math.abs(dx) >= Math.abs(dy) ? "x" : "y";
            if (st.lockedAxis === "x") {
                setDragging(true);
                setAnimating(false);
                try {
                    e.currentTarget.setPointerCapture(e.pointerId);
                }
                catch {
                    // 일부 환경에서 pointer capture 미지원 무시
                }
            }
        }
        if (st.lockedAxis !== "x")
            return;
        if (Math.abs(dx) > 8) {
            st.moved = true;
            suppressClickRef.current = true;
        }
        setDragOffsetPx(dx);
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
        const velocity = dx / elapsed; // px/ms
        setDragging(false);
        setDragOffsetPx(0);
        const threshold = st.width * 0.18;
        if (dx <= -threshold || velocity < -0.35) {
            stepBy(1);
        }
        else if (dx >= threshold || velocity > 0.35) {
            stepBy(-1);
        }
        else {
            setAnimating(true);
        }
    }
    function handleKeyDown(e) {
        if (!canLoop)
            return;
        if (e.key === "ArrowLeft") {
            e.preventDefault();
            stepBy(-1);
        }
        else if (e.key === "ArrowRight") {
            e.preventDefault();
            stepBy(1);
        }
    }
    if (count === 0)
        return null;
    const renderedSlides = canLoop
        ? [
            { slide: slides[count - 1], key: `clone-prev-${slides[count - 1].id}`, isClone: true, realIdx: count - 1 },
            ...slides.map((slide, idx) => ({ slide, key: slide.id, isClone: false, realIdx: idx })),
            { slide: slides[0], key: `clone-next-${slides[0].id}`, isClone: true, realIdx: 0 },
        ]
        : [{ slide: slides[0], key: slides[0].id, isClone: false, realIdx: 0 }];
    const showCounter = indicator === "counter" || indicator === "both";
    const showDots = indicator === "dots" || indicator === "both";
    return (_jsx("section", { role: "region", "aria-roledescription": "carousel", "aria-label": ariaLabel, "data-variant": variant, tabIndex: 0, onKeyDown: handleKeyDown, className: clsx("relative w-full select-none outline-transparent focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary", variant === "inset" && "overflow-hidden rounded-card", variant === "bleed" && "overflow-hidden", className), children: _jsxs("div", { ref: viewportRef, style: { aspectRatio, touchAction: "pan-y" }, onPointerDown: handlePointerDown, onPointerMove: handlePointerMove, onPointerUp: (e) => finishDrag(e, false), onPointerCancel: (e) => finishDrag(e, true), className: "group/banner relative w-full overflow-hidden bg-canvas", children: [_jsx("div", { onTransitionEnd: handleTransitionEnd, style: {
                        transform: `translate3d(calc(${-trackIdx * 100}% + ${dragOffsetPx}px), 0, 0)`,
                        transition: animating && !dragging
                            ? "transform 340ms cubic-bezier(0.22, 1, 0.36, 1)"
                            : "none",
                    }, className: "flex size-full will-change-transform motion-reduce:transition-none!", children: renderedSlides.map(({ slide, key, isClone, realIdx }) => {
                        const content = slide.imageSrc ? (_jsx("img", { src: slide.imageSrc, alt: slide.alt, draggable: false, className: "pointer-events-none size-full object-cover select-none" })) : (_jsx("div", { role: "img", "aria-label": slide.alt, className: "size-full", children: slide.media }));
                        const interactiveClass = "relative block size-full shrink-0 cursor-pointer text-left outline-transparent transition-[filter] duration-150 active:brightness-[0.96] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary";
                        return (_jsx("div", { "aria-hidden": isClone || realIdx !== activeRealIndex, "data-slide-index": realIdx, className: "relative size-full shrink-0 overflow-hidden", children: slide.href ? (_jsx("a", { href: slide.href, tabIndex: isClone || realIdx !== activeRealIndex ? -1 : 0, draggable: false, onClick: (e) => {
                                    if (suppressClickRef.current) {
                                        e.preventDefault();
                                        suppressClickRef.current = false;
                                        return;
                                    }
                                    slide.onClick?.();
                                }, className: interactiveClass, children: content })) : slide.onClick ? (_jsx("button", { type: "button", tabIndex: isClone || realIdx !== activeRealIndex ? -1 : 0, onClick: (e) => {
                                    if (suppressClickRef.current) {
                                        e.preventDefault();
                                        suppressClickRef.current = false;
                                        return;
                                    }
                                    slide.onClick?.();
                                }, className: interactiveClass, children: content })) : (_jsx("div", { className: "size-full", children: content })) }, key));
                    }) }), canLoop && (_jsxs(_Fragment, { children: [_jsx("button", { type: "button", "data-banner-control": "", "aria-label": "\uC774\uC804 \uBC30\uB108", onClick: () => stepBy(-1), className: "pressable pointer-events-none absolute top-1/2 left-2.5 z-10 hidden size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-xs transition-opacity duration-200 outline-transparent group-hover/banner:pointer-events-auto group-hover/banner:opacity-100 hover:bg-black/60 focus-visible:pointer-events-auto focus-visible:flex focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-white [@media(hover:hover)]:inline-flex", children: _jsx("svg", { "aria-hidden": "true", viewBox: "0 0 20 20", className: "size-4", children: _jsx("path", { d: "M12 4.5L6.5 10l5.5 5.5", fill: "none", stroke: "currentColor", strokeWidth: "1.15", strokeLinecap: "round", strokeLinejoin: "round" }) }) }), _jsx("button", { type: "button", "data-banner-control": "", "aria-label": "\uB2E4\uC74C \uBC30\uB108", onClick: () => stepBy(1), className: "pressable pointer-events-none absolute top-1/2 right-2.5 z-10 hidden size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-xs transition-opacity duration-200 outline-transparent group-hover/banner:pointer-events-auto group-hover/banner:opacity-100 hover:bg-black/60 focus-visible:pointer-events-auto focus-visible:flex focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-white [@media(hover:hover)]:inline-flex", children: _jsx("svg", { "aria-hidden": "true", viewBox: "0 0 20 20", className: "size-4", children: _jsx("path", { d: "M8 4.5l5.5 5.5L8 15.5", fill: "none", stroke: "currentColor", strokeWidth: "1.15", strokeLinecap: "round", strokeLinejoin: "round" }) }) })] })), canLoop && showCounter && (_jsxs("div", { "data-banner-control": "", "data-banner-counter": "", className: "absolute right-3 bottom-3 z-10 inline-flex h-6 items-center rounded-full bg-black/55 text-[11px] font-semibold tabular-nums text-white backdrop-blur-xs", children: [autoPlayMs > 0 && (_jsx("button", { type: "button", "aria-label": paused ? "배너 자동재생 시작" : "배너 자동재생 일시정지", "aria-pressed": paused, onClick: () => setPaused((p) => !p), className: "pressable inline-flex h-full w-6 cursor-pointer items-center justify-center rounded-l-full text-white/90 outline-transparent hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-white", children: paused ? (_jsx("svg", { "aria-hidden": "true", viewBox: "0 0 12 12", className: "size-2.5 fill-current", children: _jsx("path", { d: "M3 2.2l6.6 3.8L3 9.8V2.2Z" }) })) : (_jsxs("svg", { "aria-hidden": "true", viewBox: "0 0 12 12", className: "size-2.5 fill-current", children: [_jsx("rect", { x: "2.5", y: "2.2", width: "2.3", height: "7.6", rx: "0.6" }), _jsx("rect", { x: "7.2", y: "2.2", width: "2.3", height: "7.6", rx: "0.6" })] })) })), onViewAllClick ? (_jsxs("button", { type: "button", "aria-label": `전체 배너 보기 (${activeRealIndex + 1} / ${count})`, onClick: onViewAllClick, className: clsx("pressable inline-flex h-full cursor-pointer items-center gap-1 pr-2.5 text-white outline-transparent hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-white", autoPlayMs > 0 ? "border-l border-white/20 pl-2" : "rounded-full pl-2.5", "rounded-r-full"), children: [_jsxs("span", { children: [activeRealIndex + 1, " ", _jsxs("span", { className: "text-white/65", children: ["/ ", count] })] }), _jsx("span", { "aria-hidden": "true", className: "text-xs leading-none text-white/85", children: "+" })] })) : (_jsxs("span", { className: clsx("inline-flex h-full items-center pr-2.5", autoPlayMs > 0 ? "border-l border-white/20 pl-2" : "pl-2.5"), children: [activeRealIndex + 1, " ", _jsxs("span", { className: "ml-0.5 text-white/65", children: ["/ ", count] })] }))] })), canLoop && showDots && (_jsx("div", { "data-banner-control": "", "data-banner-dots": "", role: "tablist", "aria-label": "\uBC30\uB108 \uD398\uC774\uC9C0 \uC120\uD0DD", className: "absolute bottom-2.5 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/30 px-2 py-1 backdrop-blur-xs", children: slides.map((s, idx) => {
                        const active = idx === activeRealIndex;
                        return (_jsx("button", { type: "button", role: "tab", "aria-selected": active, "aria-label": `${idx + 1}번 배너로 이동`, onClick: () => commitRealChange(idx + 1), className: clsx("pressable h-1.5 cursor-pointer rounded-full transition-all duration-200 outline-transparent focus-visible:outline-2 focus-visible:outline-white", active ? "w-4 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80") }, s.id));
                    }) }))] }) }));
}
