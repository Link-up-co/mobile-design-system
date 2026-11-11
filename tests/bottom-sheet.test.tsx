import test from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { BottomSheet } from "../src/mobile/BottomSheet";
import { Button } from "../src/mobile/Button";

test("BottomSheet renders nothing when closed", () => {
  const html = renderToStaticMarkup(
    <BottomSheet open={false} onClose={() => {}} title="픽업 매장 선택">
      <p>내용</p>
    </BottomSheet>
  );
  assert.equal(html, "");
});

test("BottomSheet supports with/without title, close button, and footer", () => {
  // 1) 타이틀 O + 닫기버튼 O + 하단버튼 O
  const full = renderToStaticMarkup(
    <BottomSheet
      open
      onClose={() => {}}
      title="픽업 매장 선택"
      showClose
      footer={<Button fullWidth>선택 완료</Button>}
    >
      <p>강남점</p>
    </BottomSheet>
  );
  assert.match(full, /role="dialog"/);
  assert.match(full, /aria-modal="true"/);
  assert.match(full, /rounded-t-sheet/);
  assert.match(full, /픽업 매장 선택/);
  assert.match(full, /aria-label="닫기"/);
  assert.match(full, /선택 완료/);
  assert.match(full, /data-sheet-backdrop=""/);

  // 2) 타이틀 O + 닫기버튼 X + 하단버튼 X
  const titleOnly = renderToStaticMarkup(
    <BottomSheet open onClose={() => {}} title="성인인증 안내" showClose={false}>
      <p>신분증을 지참해 주세요.</p>
    </BottomSheet>
  );
  assert.match(titleOnly, /성인인증 안내/);
  assert.doesNotMatch(titleOnly, /aria-label="닫기"/);
  assert.doesNotMatch(titleOnly, /data-sheet-footer=""/);

  // 3) 타이틀 X + 닫기버튼 O + 하단버튼 X
  const closeOnly = renderToStaticMarkup(
    <BottomSheet open onClose={() => {}} showClose aria-label="상품 상세 안내">
      <p>원산지 정보</p>
    </BottomSheet>
  );
  assert.doesNotMatch(closeOnly, /<h2/);
  assert.match(closeOnly, /aria-label="닫기"/);

  // 4) 타이틀 X + 닫기버튼 X + 하단버튼 X
  const bare = renderToStaticMarkup(
    <BottomSheet open onClose={() => {}} showClose={false} aria-label="빠른 메뉴">
      <p>공유하기</p>
    </BottomSheet>
  );
  assert.doesNotMatch(bare, /<h2/);
  assert.doesNotMatch(bare, /aria-label="닫기"/);
  assert.doesNotMatch(bare, /data-sheet-header=""/);
  assert.doesNotMatch(bare, /data-sheet-footer=""/);
});
