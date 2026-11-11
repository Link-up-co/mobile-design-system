"use client";

import { useState } from "react";
import {
  Button,
  FileUploader,
  ImagePreview,
  ImageUploader,
  Toast,
  type UploadedFileItem,
  type UploadedImageItem,
} from "../mobile";

// 한국형 검은 외곽선 벡터 보틀 일러스트 샘플 Data URI (AI 실사 이미지 배제)
const SAMPLE_SVG_1 =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
      <rect width="240" height="240" fill="#FEF3C7"/>
      <circle cx="120" cy="120" r="78" fill="#FFFFFF" stroke="#18181B" stroke-width="4"/>
      <rect x="108" y="48" width="24" height="24" rx="4" fill="#F59E0B" stroke="#18181B" stroke-width="4"/>
      <path d="M92 94c0-14 14-22 16-22h24c2 0 16 8 16 22v82a8 8 0 0 1-8 8h-40a8 8 0 0 1-8-8V94Z" fill="#D97706" stroke="#18181B" stroke-width="4"/>
      <rect x="98" y="114" width="44" height="36" rx="3" fill="#FFFBEB" stroke="#18181B" stroke-width="3.5"/>
    </svg>`
  );

const SAMPLE_SVG_2 =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
      <rect width="240" height="240" fill="#FFE4E6"/>
      <circle cx="120" cy="120" r="78" fill="#FFFFFF" stroke="#18181B" stroke-width="4"/>
      <path d="M88 76h64c-4 32-16 48-32 48s-28-16-32-48Z" fill="#FB7185" stroke="#18181B" stroke-width="4"/>
      <path d="M120 124v52M98 176h44" fill="none" stroke="#18181B" stroke-width="4" stroke-linecap="round"/>
    </svg>`
  );

const INITIAL_IMAGES: UploadedImageItem[] = [
  { id: "sample-1", url: SAMPLE_SVG_1, name: "시음노트_싱글몰트_전용잔.png" },
  { id: "sample-2", url: SAMPLE_SVG_2, name: "매장픽업_와인테이스팅.png" },
];

const INITIAL_FILES: UploadedFileItem[] = [
  {
    id: "doc-1",
    name: "주류소매업_사업자등록증_사본.pdf",
    size: 842_100,
    type: "application/pdf",
  },
  {
    id: "doc-2",
    name: "매장외관_간판사진.png",
    size: 1_480_000,
    type: "image/png",
    previewUrl: SAMPLE_SVG_1,
  },
];

export function MediaUploadShowcase() {
  const [images, setImages] = useState<UploadedImageItem[]>(INITIAL_IMAGES);
  const [files, setFiles] = useState<UploadedFileItem[]>(INITIAL_FILES);
  const [standaloneOpen, setStandaloneOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {/* 1) ImageUploader + ImagePreview 연동 */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-[16px] font-bold tracking-tight text-ink">
            ImageUploader & ImagePreview (사진 첨부 · 풀스크린 미리보기)
          </h2>
          {images.length > 0 && (
            <Button size="sm" variant="ghost" onClick={() => setStandaloneOpen(true)}>
              전체 미리보기
            </Button>
          )}
        </div>

        <ImageUploader
          value={images}
          onChange={setImages}
          maxCount={5}
          maxSizeMB={10}
          showCoverBadge
          onReject={(reason) => {
            if (reason === "max-count") setToastMsg("최대 5장까지만 첨부할 수 있습니다");
            else if (reason === "max-size") setToastMsg("10MB 이하 이미지만 첨부 가능합니다");
            else setToastMsg("이미지 파일만 선택해 주세요");
          }}
        />

        <ImagePreview
          open={standaloneOpen}
          onClose={() => setStandaloneOpen(false)}
          images={images.map((it) => ({
            src: it.url,
            alt: it.name,
            caption: it.name,
          }))}
        />
      </section>

      {/* 2) FileUploader (문서·일반 파일 첨부 리스트) */}
      <section className="space-y-3">
        <h2 className="text-[16px] font-bold tracking-tight text-ink">
          FileUploader (문서 · 일반 파일 첨부 및 이미지 미리보기)
        </h2>
        <FileUploader
          value={files}
          onChange={setFiles}
          accept=".pdf,.png,.jpg,.jpeg,.hwp,.zip"
          helperText="PDF, HWP, JPG, PNG · 최대 20MB (최대 5개)"
          maxCount={5}
          maxSizeMB={20}
          onReject={(reason) => {
            setToastMsg(
              reason === "max-count"
                ? "파일은 최대 5개까지 첨부할 수 있습니다"
                : "20MB 이하 파일만 첨부 가능합니다"
            );
          }}
        />
      </section>

      <Toast
        open={toastMsg !== null}
        onClose={() => setToastMsg(null)}
        message={toastMsg ?? ""}
      />
    </div>
  );
}
