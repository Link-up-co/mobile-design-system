"use client";

import {
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
  type PointerEvent,
  type ReactElement,
  type ReactNode,
} from "react";
import clsx from "clsx";
import {
  computeSnellRefractionProfile,
  convexSquircleProfile,
} from "./LiquidGlassBottomNav";

export type BottomNavItem = {
  key: string;
  label: string;
  /** 기본 아이콘 엘리먼트(`filled` prop 자동 주입) 또는 `(active: boolean) => ReactNode` 렌더 함수 */
  icon: ReactNode | ((active: boolean) => ReactNode);
  href?: string;
  onClick?: () => void;
  /** 우측 상단 숫자 배지 (예: 장바구니 수량) */
  badge?: number;
  /** 우측 상단 알림 점 표시 */
  dot?: boolean;
};

export type BottomNavProps = {
  items: readonly BottomNavItem[];
  /** 제어형 활성 메뉴 key */
  activeKey?: string;
  defaultActiveKey?: string;
  onActiveChange?: (key: string) => void;
  /** `"fixed"`: 뷰포트 하단 고정(기본) · `"sticky"`: 점착 · `"static"`: 인라인 배치 */
  position?: "fixed" | "sticky" | "static";
  /** `position="fixed"`일 때 본문 하단 가림 방지 스페이서 렌더링 여부 (기본 `true`) */
  reserveSpace?: boolean;
  /** 모바일 컨테이너 최대 폭 클래스 (기본 `"max-w-[412px]"`) */
  maxWidthClassName?: string;
  ariaLabel?: string;
  className?: string;
};

type FlatGlassAsset = {
  width: number;
  height: number;
  displacementUrl: string;
  scale: number;
};

/**
 * 하단을 좌우 끝까지 꽉 채운 플랫 리퀴드 글래스용 상단 베젤(Top Convex Squircle Edge) 굴절 맵 생성.
 * 좌우 대칭인 수평 유리판이므로 2px 폭 스트립 PNG를 생성해 <feImage preserveAspectRatio="none">으로 풀폭 확장(생성 비용 < 0.1ms).
 */
function buildFlatSheetGlassAsset(
  width: number,
  height: number,
  bezelHeight = 18,
  glassThickness = 50
): FlatGlassAsset | null {
  const w = Math.max(24, Math.round(width));
  const h = Math.max(24, Math.round(height));

  const canvas = document.createElement("canvas");
  canvas.width = 2;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const bezelPx = Math.min(h - 2, bezelHeight);
  const profile = computeSnellRefractionProfile(
    glassThickness,
    bezelPx,
    convexSquircleProfile,
    1.5,
    64
  );
  const maxDisp = Math.max(1e-3, ...profile.map((v) => Math.abs(v)));

  const img = ctx.createImageData(2, h);
  const data = img.data;

  for (let y = 0; y < h; y++) {
    let vy = 0;
    if (y < bezelPx) {
      const sampleIdx = Math.min(
        profile.length - 1,
        Math.max(0, Math.floor((y / Math.max(1, bezelPx)) * profile.length))
      );
      const normMag = (profile[sampleIdx] ?? 0) / maxDisp;
      // 상단 유리 모서리에서 아래쪽(유리 내부 방향, +Y) 배경 픽셀을 끌어올려 볼록 굴절
      vy = normMag;
    }
    const g = Math.max(0, Math.min(255, Math.round(128 + vy * 127)));
    for (let x = 0; x < 2; x++) {
      const idx = (y * 2 + x) * 4;
      data[idx] = 128; // X축 변위 없음 (수평 풀폭 플랫 시트)
      data[idx + 1] = g;
      data[idx + 2] = 0;
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(img, 0, 0);
  return {
    width: w,
    height: h,
    displacementUrl: canvas.toDataURL("image/png"),
    scale: maxDisp,
  };
}

function renderNavIcon(
  icon: BottomNavItem["icon"],
  active: boolean
): ReactNode {
  if (typeof icon === "function") return icon(active);
  if (isValidElement(icon) && typeof icon.type === "function") {
    return cloneElement(icon as ReactElement<{ filled?: boolean }>, {
      filled: active,
    });
  }
  return icon;
}

/**
 * 하단을 꽉 채운 플랫 리퀴드 글래스 글로벌 메인 네비게이션 바 (`56px` + Safe Area 대응).
 * - 상단 유리 단면 스넬 굴절(`feDisplacementMap`) + 스펙큘러 유리 엣지 + 반투명 밀키 글래스 시트
 * - 선택된 메뉴는 Primary 컬러 Fill 아이콘으로 전환되며 중앙으로 커지고(`scale(1.6)`) 라벨은 부드럽게 디졸브됨
 */
export function BottomNav({
  items,
  activeKey: controlledKey,
  defaultActiveKey,
  onActiveChange,
  position = "fixed",
  reserveSpace = true,
  maxWidthClassName = "max-w-[412px]",
  ariaLabel = "하단 메인 메뉴",
  className,
}: BottomNavProps) {
  const rawId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const filterId = `mds-flat-glass-${rawId}`;

  const [innerKey, setInnerKey] = useState<string>(
    () => controlledKey ?? defaultActiveKey ?? items[0]?.key ?? ""
  );
  const [morphSeq, setMorphSeq] = useState(0);
  const [pressing, setPressing] = useState(false);

  const navRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLUListElement | null>(null);
  const scrubbingRef = useRef(false);
  const lastSizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const [glassAsset, setGlassAsset] = useState<FlatGlassAsset | null>(null);

  useEffect(() => {
    const navEl = navRef.current;
    if (!navEl) return;

    let rafId = 0;
    const rebuild = () => {
      const rect = navEl.getBoundingClientRect();
      const w = Math.round(rect.width);
      const h = Math.round(rect.height);
      if (w <= 20 || h <= 20) return;
      if (lastSizeRef.current.w === w && lastSizeRef.current.h === h) return;

      lastSizeRef.current = { w, h };
      const next = buildFlatSheetGlassAsset(w, h, 18, 50);
      if (next) setGlassAsset(next);
    };

    rebuild();

    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(() => {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(rebuild);
      });
      ro.observe(navEl);
      return () => {
        cancelAnimationFrame(rafId);
        ro.disconnect();
      };
    }
  }, []);

  const count = items.length;
  const currentKey = controlledKey !== undefined ? controlledKey : innerKey;
  const rawIndex = items.findIndex((it) => it.key === currentKey);
  const activeIndex = rawIndex >= 0 ? rawIndex : 0;

  if (count === 0) return null;

  function handleSelect(item: BottomNavItem, triggerClick = true) {
    if (item.key !== currentKey) {
      setMorphSeq((n) => n + 1);
      if (controlledKey === undefined) {
        setInnerKey(item.key);
      }
      onActiveChange?.(item.key);
    }
    if (triggerClick) {
      item.onClick?.();
    }
  }

  function resolvePointerIndex(clientX: number): number | null {
    const el = trackRef.current;
    if (!el || count <= 0) return null;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0) return null;
    const ratio = (clientX - rect.left) / rect.width;
    return Math.max(0, Math.min(count - 1, Math.floor(ratio * count)));
  }

  function handlePointerDown(e: PointerEvent<HTMLUListElement>) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    setPressing(true);
    scrubbingRef.current = false;
  }

  function handlePointerMove(e: PointerEvent<HTMLUListElement>) {
    if (!pressing) return;
    if (e.buttons === 0 && e.pointerType === "mouse") {
      setPressing(false);
      return;
    }
    const idx = resolvePointerIndex(e.clientX);
    if (idx !== null && idx !== activeIndex) {
      scrubbingRef.current = true;
      handleSelect(items[idx], false);
    }
  }

  function handlePointerUp() {
    setPressing(false);
  }

  const navInner = (
    <>
      {glassAsset && (
        <svg
          aria-hidden="true"
          colorInterpolationFilters="sRGB"
          style={{ display: "none" }}
        >
          <defs>
            <filter id={filterId} colorInterpolationFilters="sRGB">
              <feImage
                href={glassAsset.displacementUrl}
                x={0}
                y={0}
                width={glassAsset.width}
                height={glassAsset.height}
                preserveAspectRatio="none"
                result="displacement_map"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="displacement_map"
                scale={glassAsset.scale}
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
      )}

      {/* shortcut: SVG filter inside backdrop-filter is Chromium-only, Safari falls back to -webkit-backdrop-filter */}
      <nav
        ref={navRef}
        aria-label={ariaLabel}
        data-bottom-nav-inner=""
        style={{
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0.72) 0%, rgba(255, 255, 255, 0.60) 32%, rgba(255, 255, 255, 0.66) 100%)",
          WebkitBackdropFilter: "blur(16px) saturate(195%)",
          backdropFilter: glassAsset
            ? `url(#${filterId}) blur(3.8px) saturate(185%)`
            : "blur(16px) saturate(195%)",
          boxShadow:
            "0 -8px 24px -4px rgba(15, 23, 42, 0.09), 0 -1px 2px rgba(15, 23, 42, 0.05), inset 0 1.5px 0.5px rgba(255, 255, 255, 0.96), inset 0 10px 20px rgba(255, 255, 255, 0.3)",
          transform: "translateZ(0)",
        }}
        className={clsx(
          "relative mx-auto w-full border-t border-white/80",
          position !== "static" && "pb-[env(safe-area-inset-bottom,0px)]",
          position === "fixed" && maxWidthClassName,
          className
        )}
      >
        <ul
          ref={trackRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="relative z-10 grid h-14 w-full items-center"
          style={{
            gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))`,
            touchAction: "pan-y",
          }}
        >
          {/* 선택된 탭을 감싸며 액체처럼 미끄러지는 리퀴드 물방울 캡슐 */}
          <li
            aria-hidden="true"
            data-liquid-pill=""
            style={{
              width: `${100 / count}%`,
              transform: `translate3d(${activeIndex * 100}%, 0, 0)`,
              transition: "transform 420ms cubic-bezier(0.22, 1.24, 0.36, 1)",
            }}
            className="pointer-events-none absolute inset-y-0 left-0 z-0 px-1.5 py-1.5 will-change-transform motion-reduce:transition-none!"
          >
            <span
              key={morphSeq}
              style={{
                background:
                  "radial-gradient(120% 100% at 50% 8%, rgba(255,255,255,0.95) 0%, color-mix(in srgb, var(--mds-primary) 10%, rgba(255,255,255,0.74)) 58%, color-mix(in srgb, var(--mds-primary) 18%, rgba(255,255,255,0.85)) 100%)",
                boxShadow:
                  "0 4px 12px color-mix(in srgb, var(--mds-primary) 16%, rgba(15, 23, 42, 0.08)), inset 0 1.75px 0.75px rgba(255, 255, 255, 0.98), inset 0 -1.5px 2px rgba(255, 255, 255, 0.82)",
                animation:
                  morphSeq > 0
                    ? "mds-liquid-pill-morph 420ms cubic-bezier(0.22, 1.24, 0.36, 1)"
                    : undefined,
              }}
              className={clsx(
                "relative block size-full overflow-hidden rounded-full border border-white/85 transition-transform duration-150 will-change-transform motion-reduce:animate-none!",
                pressing && "scale-[1.06]"
              )}
            >
              <span
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 100%)",
                }}
                className="absolute inset-x-3 top-[2px] h-2 rounded-full"
              />
            </span>
          </li>

          {items.map((item) => {
            const active = item.key === currentKey;
            const iconNode = renderNavIcon(item.icon, active);

            const itemClassName = clsx(
              "pressable relative flex size-full cursor-pointer select-none flex-col items-center justify-center overflow-hidden outline-transparent transition-colors hover:text-ink focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary",
              active ? "text-primary hover:text-primary" : "text-ink-secondary"
            );

            const content = (
              <span
                data-nav-icon-wrap=""
                data-active={active ? "true" : "false"}
                className={clsx(
                  "relative inline-flex items-center justify-center transition-colors duration-200 [&_svg]:size-7 motion-reduce:transition-none!",
                  active ? "text-primary" : "text-ink-secondary"
                )}
              >
                {iconNode}
                {item.badge !== undefined && item.badge > 0 ? (
                  <span
                    data-nav-badge=""
                    className="pointer-events-none absolute -top-1 -right-2 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[10px] leading-none font-bold tabular-nums text-white ring-1.5 ring-white/95"
                  >
                    {item.badge > 99 ? "99+" : item.badge}
                  </span>
                ) : (
                  item.dot && (
                    <span
                      data-nav-dot=""
                      className="pointer-events-none absolute -top-0.5 -right-0.5 size-1.5 rounded-full bg-danger ring-1.5 ring-white/95"
                    />
                  )
                )}
              </span>
            );

            return (
              <li key={item.key} className="relative z-10 h-full min-w-0">
                {item.href ? (
                  <a
                    href={item.href}
                    aria-label={item.label}
                    aria-current={active ? "page" : undefined}
                    onClick={(e) => {
                      if (scrubbingRef.current) {
                        e.preventDefault();
                        scrubbingRef.current = false;
                        return;
                      }
                      handleSelect(item, true);
                    }}
                    className={itemClassName}
                  >
                    {content}
                  </a>
                ) : (
                  <button
                    type="button"
                    aria-label={item.label}
                    aria-current={active ? "page" : undefined}
                    onClick={() => {
                      if (scrubbingRef.current) {
                        scrubbingRef.current = false;
                        item.onClick?.();
                        return;
                      }
                      handleSelect(item, true);
                    }}
                    className={itemClassName}
                  >
                    {content}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );

  if (position === "static") {
    return (
      <div data-bottom-nav="" data-position="static" className="w-full">
        {navInner}
      </div>
    );
  }

  if (position === "sticky") {
    return (
      <div data-bottom-nav="" data-position="sticky" className="sticky bottom-0 z-30 w-full">
        {navInner}
      </div>
    );
  }

  return (
    <>
      {reserveSpace && (
        <div
          aria-hidden="true"
          data-bottom-nav-spacer=""
          className="h-[calc(56px+env(safe-area-inset-bottom,0px))] w-full shrink-0"
        />
      )}
      <div
        data-bottom-nav=""
        data-position="fixed"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center"
      >
        <div className={clsx("pointer-events-auto w-full", maxWidthClassName)}>
          {navInner}
        </div>
      </div>
    </>
  );
}
