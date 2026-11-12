export type UploadedFileItem = {
    id: string;
    name: string;
    size: number;
    type?: string;
    /** 이미지 파일인 경우 미리보기 URL */
    previewUrl?: string;
    /** 업로드 진행률 (`0~100`, 생략 시 완료 상태) */
    progress?: number;
    file?: File;
};
export type FileUploadRejectReason = "max-count" | "max-size";
export type FileUploaderProps = {
    id?: string;
    value?: readonly UploadedFileItem[];
    defaultValue?: readonly UploadedFileItem[];
    onChange?: (files: UploadedFileItem[]) => void;
    /** 허용 파일 형식 (예: `".pdf,.jpg,.png"`, 생략 시 모든 파일) */
    accept?: string;
    /** 안내 보조 문구 (예: `"PDF, JPG, PNG · 최대 20MB (최대 5개)"`) */
    helperText?: string;
    maxCount?: number;
    maxSizeMB?: number;
    disabled?: boolean;
    onReject?: (reason: FileUploadRejectReason, fileName: string) => void;
    className?: string;
};
export declare function formatFileSize(bytes: number): string;
/**
 * 일반 문서·첨부 파일 업로더 (`FileUploader`).
 * - 터치 파일 선택 및 드래그 앤 드롭 지원 + `1px divide-y` 플랫 첨부 리스트
 * - 이미지 첨부 파일은 썸네일 클릭 시 `ImagePreview` 뷰어로 즉시 미리보기 지원
 */
export declare function FileUploader({ id, value: controlled, defaultValue, onChange, accept, helperText, maxCount, maxSizeMB, disabled, onReject, className, }: FileUploaderProps): import("react").JSX.Element;
