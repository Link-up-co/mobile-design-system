"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useId, useRef, useState, } from "react";
import clsx from "clsx";
import { ImagePreview } from "./ImagePreview.js";
import { CloseIcon, FileTextIcon, UploadIcon } from "./icons.js";
export function formatFileSize(bytes) {
    if (!Number.isFinite(bytes) || bytes <= 0)
        return "0 B";
    if (bytes < 1024)
        return `${Math.round(bytes)} B`;
    if (bytes < 1024 * 1024)
        return `${(bytes / 1024).toFixed(bytes < 10240 ? 1 : 0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
function isPreviewableImage(item) {
    if (!item.previewUrl)
        return false;
    if (item.type?.startsWith("image/"))
        return true;
    return /\.(png|jpe?g|webp|gif|avif|svg)$/i.test(item.name);
}
/**
 * 일반 문서·첨부 파일 업로더 (`FileUploader`).
 * - 터치 파일 선택 및 드래그 앤 드롭 지원 + `1px divide-y` 플랫 첨부 리스트
 * - 이미지 첨부 파일은 썸네일 클릭 시 `ImagePreview` 뷰어로 즉시 미리보기 지원
 */
export function FileUploader({ id, value: controlled, defaultValue = [], onChange, accept, helperText, maxCount = 5, maxSizeMB = 20, disabled = false, onReject, className, }) {
    const autoId = useId();
    const inputId = id ?? autoId;
    const inputRef = useRef(null);
    const ownedUrlsRef = useRef(new Set());
    const [inner, setInner] = useState(() => [...defaultValue]);
    const [dragOver, setDragOver] = useState(false);
    const [previewSrc, setPreviewSrc] = useState(null);
    const items = controlled !== undefined ? [...controlled] : inner;
    useEffect(() => {
        const owned = ownedUrlsRef.current;
        return () => {
            owned.forEach((url) => URL.revokeObjectURL(url));
            owned.clear();
        };
    }, []);
    function commit(next) {
        if (controlled === undefined)
            setInner(next);
        onChange?.(next);
    }
    function addRawFiles(rawFiles) {
        if (rawFiles.length === 0 || disabled)
            return;
        const maxBytes = maxSizeMB * 1024 * 1024;
        const added = [];
        let remaining = maxCount - items.length;
        for (const file of rawFiles) {
            if (remaining <= 0) {
                onReject?.("max-count", file.name);
                break;
            }
            if (file.size > maxBytes) {
                onReject?.("max-size", file.name);
                continue;
            }
            let previewUrl;
            if (file.type.startsWith("image/")) {
                previewUrl = URL.createObjectURL(file);
                ownedUrlsRef.current.add(previewUrl);
            }
            added.push({
                id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                name: file.name,
                size: file.size,
                type: file.type,
                previewUrl,
                file,
            });
            remaining -= 1;
        }
        if (added.length > 0) {
            commit([...items, ...added]);
        }
    }
    function handleInputChange(e) {
        const list = e.target.files;
        if (!list)
            return;
        addRawFiles(Array.from(list));
        e.target.value = "";
    }
    function handleDrop(e) {
        e.preventDefault();
        setDragOver(false);
        if (disabled)
            return;
        const list = e.dataTransfer?.files;
        if (list && list.length > 0) {
            addRawFiles(Array.from(list));
        }
    }
    function removeItem(idToRemove) {
        const target = items.find((it) => it.id === idToRemove);
        if (target?.previewUrl && ownedUrlsRef.current.has(target.previewUrl)) {
            URL.revokeObjectURL(target.previewUrl);
            ownedUrlsRef.current.delete(target.previewUrl);
        }
        commit(items.filter((it) => it.id !== idToRemove));
    }
    const canAddMore = !disabled && items.length < maxCount;
    const defaultHint = `최대 ${maxSizeMB}MB · ${items.length}/${maxCount}개 첨부`;
    return (_jsxs("div", { "data-file-uploader": "", className: clsx("w-full space-y-2.5", className), children: [_jsx("input", { ref: inputRef, id: inputId, type: "file", accept: accept, multiple: maxCount > 1, disabled: !canAddMore, onChange: handleInputChange, className: "sr-only" }), _jsx("button", { type: "button", disabled: !canAddMore, onClick: () => inputRef.current?.click(), onDragOver: (e) => {
                    e.preventDefault();
                    if (canAddMore)
                        setDragOver(true);
                }, onDragLeave: () => setDragOver(false), onDrop: handleDrop, className: clsx("pressable flex w-full cursor-pointer items-center justify-between gap-3 rounded-card border border-dashed px-4 py-3.5 text-left transition-colors outline-transparent focus-visible:outline-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-45", dragOver
                    ? "border-primary bg-primary-soft/60 text-primary"
                    : "border-line-strong bg-canvas/55 text-ink hover:border-primary hover:bg-primary-soft/30"), children: _jsxs("div", { className: "flex min-w-0 items-center gap-3", children: [_jsx("span", { className: "inline-flex size-9 shrink-0 items-center justify-center rounded-control bg-surface text-primary shadow-2xs ring-1 ring-line", children: _jsx(UploadIcon, {}) }), _jsxs("div", { className: "min-w-0", children: [_jsx("span", { className: "block text-body-sm font-bold text-ink", children: "\uD30C\uC77C \uC120\uD0DD \uB610\uB294 \uC5EC\uAE30\uB85C \uB04C\uC5B4\uB193\uAE30" }), _jsx("span", { className: "mt-0.5 block truncate text-caption text-ink-muted", children: helperText ?? defaultHint })] })] }) }), items.length > 0 && (_jsx("ul", { "data-file-list": "", className: "divide-y divide-line border-y border-line bg-surface", children: items.map((item) => {
                    const isImg = isPreviewableImage(item);
                    const uploading = item.progress !== undefined && item.progress >= 0 && item.progress < 100;
                    return (_jsxs("li", { className: "flex items-center justify-between gap-3 py-2.5", children: [_jsxs("div", { className: "flex min-w-0 flex-1 items-center gap-2.5", children: [isImg && item.previewUrl ? (_jsx("button", { type: "button", "aria-label": `${item.name} 미리보기`, onClick: () => setPreviewSrc({ src: item.previewUrl, name: item.name }), className: "size-10 shrink-0 cursor-pointer overflow-hidden rounded-control border border-line bg-surface-subtle outline-transparent focus-visible:outline-2 focus-visible:outline-primary", children: _jsx("img", { src: item.previewUrl, alt: item.name, className: "size-full object-cover" }) })) : (_jsx("span", { className: "inline-flex size-10 shrink-0 items-center justify-center rounded-control bg-surface-subtle text-ink-secondary", children: _jsx(FileTextIcon, {}) })), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("p", { className: "truncate text-body-sm font-medium text-ink", children: item.name }), _jsxs("p", { className: "mt-0.5 text-caption tabular-nums text-ink-muted", children: [formatFileSize(item.size), uploading ? ` · 업로드 중 ${Math.round(item.progress)}%` : ""] }), uploading && (_jsx("div", { className: "mt-1.5 h-1 w-full overflow-hidden rounded-full bg-zinc-200", children: _jsx("div", { style: { width: `${Math.min(100, Math.max(0, item.progress))}%` }, className: "h-full rounded-full bg-primary transition-[width] duration-200" }) }))] })] }), !disabled && (_jsx("button", { type: "button", "aria-label": `${item.name} 삭제`, onClick: () => removeItem(item.id), className: "pressable -mr-1 inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-control text-ink-muted outline-transparent hover:bg-surface-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-primary", children: _jsx(CloseIcon, { className: "size-4" }) }))] }, item.id));
                }) })), _jsx(ImagePreview, { open: previewSrc !== null, onClose: () => setPreviewSrc(null), images: previewSrc
                    ? [{ src: previewSrc.src, alt: previewSrc.name, caption: previewSrc.name }]
                    : [] })] }));
}
