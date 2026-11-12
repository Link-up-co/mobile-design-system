import { type ReactNode } from "react";
export type PreviewImageSource = string | {
    src: string;
    alt?: string;
    caption?: ReactNode;
};
export type ImagePreviewProps = {
    open: boolean;
    onClose: () => void;
    images: readonly PreviewImageSource[];
    /** 열릴 때 초기 표시할 인덱스 (기본 `0`) */
    initialIndex?: number;
    activeIndex?: number;
    onIndexChange?: (index: number) => void;
    /** 우측 하단/하단 커스텀 액션 영역 (예: 이미지 삭제 버튼) */
    footerAction?: (index: number) => ReactNode;
    className?: string;
};
/**
 * 모바일 풀스크린 이미지 미리보기 뷰어 (`ImagePreview`).
 * - 다중 이미지 좌우 스와이프 슬라이드(`translate3d`) + `1 / N` 카운터
 * - 더블탭(또는 더블클릭) `2.2x` 확대/복귀 및 확대 상태 팬(드래그 이동) 지원
 */
export declare function ImagePreview({ open, onClose, images, initialIndex, activeIndex: controlledIndex, onIndexChange, footerAction, className, }: ImagePreviewProps): ReactNode;
