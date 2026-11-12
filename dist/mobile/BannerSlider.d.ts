import { type ReactNode } from "react";
export type BannerSlide = {
    id: string;
    /** 이미지 URL (`media`를 직접 전달하지 않을 때 사용) */
    imageSrc?: string;
    alt: string;
    /** 커스텀 배너 콘텐츠 (SVG·복합 배너 등 `imageSrc` 대신 렌더링) */
    media?: ReactNode;
    href?: string;
    onClick?: () => void;
};
export type BannerSliderProps = {
    slides: readonly BannerSlide[];
    /** `bleed`: 좌우 여백 없는 스크린 풀폭 배너 · `inset`: 라운드 카드형 배너 */
    variant?: "bleed" | "inset";
    /** CSS `aspect-ratio` 값 (기본 `"16 / 9"`) */
    aspectRatio?: string;
    /** 자동 슬라이드 간격(ms). `0` 또는 음수면 자동 재생 비활성화 (기본 `4000`) */
    autoPlayMs?: number;
    /** 인디케이터 표시 방식 (기본 `"counter"`) */
    indicator?: "counter" | "dots" | "both" | "none";
    /** 제어형 현재 인덱스 (0-based) */
    index?: number;
    defaultIndex?: number;
    onIndexChange?: (index: number) => void;
    /** 우측 하단 카운터 배지에 `+` 전체보기 버튼 동작을 연결할 때 전달 */
    onViewAllClick?: () => void;
    ariaLabel?: string;
    className?: string;
};
export declare function normalizeSlideIndex(index: number, count: number): number;
/**
 * 모바일 메인배너 이미지 슬라이더.
 * - 터치/포인터 드래그 실시간 추종 + 속도·거리 기반 스냅 전환
 * - 2장 이상 무한 루프 트랙, 자동 재생 및 일시정지 토글, 우측 하단 `1 / N` 카운터·하단 도트 지원
 */
export declare function BannerSlider({ slides, variant, aspectRatio, autoPlayMs, indicator, index: controlledIndex, defaultIndex, onIndexChange, onViewAllClick, ariaLabel, className, }: BannerSliderProps): import("react").JSX.Element | null;
