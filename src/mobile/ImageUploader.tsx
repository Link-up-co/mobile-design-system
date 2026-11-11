"use client";

import { useEffect, useId, useRef, useState, type ChangeEvent } from "react";
import clsx from "clsx";
import { ImagePreview } from "./ImagePreview";
import { CameraIcon, CloseIcon } from "./icons";

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
export function ImageUploader({
  id,
  value: controlled,
  defaultValue = [],
  onChange,
  maxCount = 5,
  maxSizeMB = 10,
  accept = "image/*",
  showCoverBadge = false,
  layout = "rail",
  disabled = false,
  onReject,
  className,
}: ImageUploaderProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const ownedUrlsRef = useRef<Set<string>>(new Set());

  const [inner, setInner] = useState<UploadedImageItem[]>(() => [...defaultValue]);
  const [previewIdx, setPreviewIdx] = useState<number | null>(null);

  const items = controlled !== undefined ? [...controlled] : inner;

  useEffect(() => {
    const owned = ownedUrlsRef.current;
    return () => {
      owned.forEach((url) => URL.revokeObjectURL(url));
      owned.clear();
    };
  }, []);

  function commit(next: UploadedImageItem[]) {
    if (controlled === undefined) setInner(next);
    onChange?.(next);
  }

  function handleFilesSelected(e: ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    const maxBytes = maxSizeMB * 1024 * 1024;
    const added: UploadedImageItem[] = [];
    let remaining = maxCount - items.length;

    for (const file of Array.from(fileList)) {
      if (remaining <= 0) {
        onReject?.("max-count", file.name);
        break;
      }
      if (!file.type.startsWith("image/")) {
        onReject?.("invalid-type", file.name);
        continue;
      }
      if (file.size > maxBytes) {
        onReject?.("max-size", file.name);
        continue;
      }

      const objectUrl = URL.createObjectURL(file);
      ownedUrlsRef.current.add(objectUrl);
      added.push({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        url: objectUrl,
        name: file.name,
        file,
      });
      remaining -= 1;
    }

    e.target.value = "";
    if (added.length > 0) {
      commit([...items, ...added]);
    }
  }

  function removeAt(idx: number) {
    const target = items[idx];
    if (!target) return;
    if (ownedUrlsRef.current.has(target.url)) {
      URL.revokeObjectURL(target.url);
      ownedUrlsRef.current.delete(target.url);
    }
    const next = items.filter((_, i) => i !== idx);
    commit(next);

    if (previewIdx !== null) {
      if (next.length === 0) {
        setPreviewIdx(null);
      } else if (previewIdx >= next.length) {
        setPreviewIdx(next.length - 1);
      }
    }
  }

  const canAddMore = !disabled && items.length < maxCount;

  return (
    <div data-image-uploader="" className={clsx("w-full", className)}>
      <input
        ref={fileInputRef}
        id={inputId}
        type="file"
        accept={accept}
        multiple={maxCount > 1}
        disabled={!canAddMore}
        onChange={handleFilesSelected}
        className="sr-only"
      />

      <div
        className={clsx(
          layout === "grid"
            ? "grid grid-cols-4 gap-2.5"
            : "subtle-scrollbar flex items-center gap-2.5 overflow-x-auto py-0.5"
        )}
      >
        {/* 카메라 이미지 추가 타일 */}
        {items.length < maxCount && (
          <button
            type="button"
            disabled={disabled}
            aria-label={`이미지 추가 (${items.length}/${maxCount})`}
            onClick={() => fileInputRef.current?.click()}
            className={clsx(
              "pressable flex flex-col items-center justify-center gap-1 rounded-card border border-dashed border-line-strong bg-canvas/60 text-ink-secondary transition-colors outline-transparent hover:border-primary hover:bg-primary-soft/40 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-45",
              layout === "grid" ? "aspect-square w-full" : "size-20 shrink-0"
            )}
          >
            <CameraIcon className="size-5" />
            <span className="text-[11px] leading-none font-semibold tabular-nums">
              <strong className="font-bold text-primary">{items.length}</strong>/{maxCount}
            </span>
          </button>
        )}

        {/* 업로드된 썸네일 목록 */}
        {items.map((item, idx) => (
          <div
            key={item.id}
            data-image-tile=""
            className={clsx(
              "relative overflow-hidden rounded-card border border-line bg-surface-subtle",
              layout === "grid" ? "aspect-square w-full" : "size-20 shrink-0"
            )}
          >
            <button
              type="button"
              aria-label={`${item.name ?? `첨부 이미지 ${idx + 1}`} 크게 보기`}
              onClick={() => setPreviewIdx(idx)}
              className="block size-full cursor-pointer outline-transparent focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
            >
              <img
                src={item.url}
                alt={item.name ?? `첨부 이미지 ${idx + 1}`}
                className="size-full object-cover"
              />
            </button>

            {showCoverBadge && idx === 0 && (
              <span className="pointer-events-none absolute bottom-0 inset-x-0 bg-black/62 py-0.5 text-center text-[10px] font-bold text-white">
                대표
              </span>
            )}

            {!disabled && (
              <button
                type="button"
                aria-label={`${item.name ?? `이미지 ${idx + 1}`} 삭제`}
                onClick={() => removeAt(idx)}
                className="pressable absolute top-1 right-1 inline-flex size-5.5 cursor-pointer items-center justify-center rounded-full bg-black/62 text-white backdrop-blur-xs outline-transparent hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-white"
              >
                <CloseIcon className="size-3.5" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* 썸네일 클릭 시 풀스크린 이미지 미리보기 */}
      <ImagePreview
        open={previewIdx !== null}
        onClose={() => setPreviewIdx(null)}
        activeIndex={previewIdx ?? 0}
        onIndexChange={setPreviewIdx}
        images={items.map((it, i) => ({
          src: it.url,
          alt: it.name ?? `첨부 이미지 ${i + 1}`,
          caption: it.name,
        }))}
        footerAction={
          !disabled
            ? (idx) => (
                <button
                  type="button"
                  onClick={() => removeAt(idx)}
                  className="pressable cursor-pointer rounded-control bg-white/14 px-3 py-1.5 text-caption font-semibold text-white hover:bg-white/22 focus-visible:outline-2 focus-visible:outline-white"
                >
                  삭제
                </button>
              )
            : undefined
        }
      />
    </div>
  );
}
