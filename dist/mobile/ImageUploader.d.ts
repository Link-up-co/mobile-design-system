export type UploadedImageItem = {
    id: string;
    url: string;
    name?: string;
    file?: File;
};
export type ImageUploadRejectReason = "max-count" | "max-size" | "invalid-type";
export type ImageUploaderProps = {
    id?: string;
    value?: readonly UploadedImageItem[];
    defaultValue?: readonly UploadedImageItem[];
    onChange?: (items: UploadedImageItem[]) => void;
    /** 최대 업로드 가능 장수 (기본 `5`) */
    maxCount?: number;
    /** 파일당 최대 허용 용량 MB (기본 `10MB`) */
    maxSizeMB?: number;
    accept?: string;
    /** 첫 번째 이미지에 `"대표"` 배지 표시 여부 (기본 `false`) */
    showCoverBadge?: boolean;
    /** `"rail"`: 가로 스크롤 타일 레일(기본) · `"grid"`: 4열 그리드 배치 */
    layout?: "rail" | "grid";
    disabled?: boolean;
    onReject?: (reason: ImageUploadRejectReason, fileName: string) => void;
    className?: string;
};
/**
 * 모바일 이미지 업로더 (`ImageUploader`).
 * - 카메라/앨범 이미지 다중 선택 + 즉시 썸네일 생성(`URL.createObjectURL` 자동 해제 포함)
 * - 썸네일 탭 시 풀스크린 `ImagePreview` 뷰어로 확대 확인 및 삭제 연동
 */
export declare function ImageUploader({ id, value: controlled, defaultValue, onChange, maxCount, maxSizeMB, accept, showCoverBadge, layout, disabled, onReject, className, }: ImageUploaderProps): import("react").JSX.Element;
