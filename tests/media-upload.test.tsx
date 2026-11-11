import test from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import {
  FileUploader,
  ImagePreview,
  ImageUploader,
  formatFileSize,
} from "../src/mobile";

test("formatFileSize formats bytes, KB, and MB cleanly", () => {
  assert.equal(formatFileSize(0), "0 B");
  assert.equal(formatFileSize(512), "512 B");
  assert.equal(formatFileSize(2048), "2.0 KB");
  assert.equal(formatFileSize(150 * 1024), "150 KB");
  assert.equal(formatFileSize(2.5 * 1024 * 1024), "2.5 MB");
});

test("ImagePreview renders nothing when closed and renders fullscreen viewer with counter and slides when open", () => {
  assert.equal(
    renderToStaticMarkup(<ImagePreview open={false} onClose={() => {}} images={["/a.png"]} />),
    ""
  );

  const openHtml = renderToStaticMarkup(
    <ImagePreview
      open
      onClose={() => {}}
      initialIndex={1}
      images={[
        { src: "/a.png", alt: "첫번째" },
        { src: "/b.png", alt: "두번째", caption: "전용잔 사진" },
      ]}
    />
  );

  assert.match(openHtml, /data-image-preview=""/);
  assert.match(openHtml, /2 \/ 2/);
  assert.match(openHtml, /전용잔 사진/);
  assert.match(openHtml, /aria-label="미리보기 닫기"/);
});

test("ImageUploader renders add camera tile with count, cover badge, thumbnails, and delete buttons", () => {
  const html = renderToStaticMarkup(
    <ImageUploader
      maxCount={5}
      showCoverBadge
      defaultValue={[
        { id: "1", url: "/img1.png", name: "위스키.png" },
        { id: "2", url: "/img2.png", name: "와인.png" },
      ]}
    />
  );

  assert.match(html, /data-image-uploader=""/);
  assert.match(html, /aria-label="이미지 추가 \(2\/5\)"/);
  assert.match(html, />대표</);
  assert.match(html, /aria-label="위스키\.png 크게 보기"/);
  assert.match(html, /aria-label="위스키\.png 삭제"/);
});

test("FileUploader renders dropzone trigger, flat attached file list, progress bar, and image preview button", () => {
  const html = renderToStaticMarkup(
    <FileUploader
      maxCount={5}
      defaultValue={[
        { id: "f1", name: "사업자등록증.pdf", size: 512_000, progress: 65 },
        { id: "f2", name: "매장사진.png", size: 1_048_576, type: "image/png", previewUrl: "/s.png" },
      ]}
    />
  );

  assert.match(html, /data-file-uploader=""/);
  assert.match(html, /파일 선택 또는 여기로 끌어놓기/);
  assert.match(html, /사업자등록증\.pdf/);
  assert.match(html, /업로드 중 65%/);
  assert.match(html, /aria-label="매장사진\.png 미리보기"/);
  assert.match(html, /aria-label="사업자등록증\.pdf 삭제"/);
});
