import test from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { Snackbar, Toast } from "../src/mobile/Feedback";

test("Toast renders nothing when closed and renders compact status pill when open", () => {
  assert.equal(renderToStaticMarkup(<Toast open={false} onClose={() => {}} message="복사됨" />), "");

  const success = renderToStaticMarkup(
    <Toast open onClose={() => {}} variant="success" message="공유 링크가 복사되었습니다." />
  );
  assert.match(success, /role="status"/);
  assert.match(success, /data-toast=""/);
  assert.match(success, /공유 링크가 복사되었습니다\./);

  const danger = renderToStaticMarkup(
    <Toast open onClose={() => {}} variant="danger" message="재고가 부족합니다." />
  );
  assert.match(danger, /role="alert"/);
  assert.match(danger, /재고가 부족합니다\./);
});

test("Snackbar renders bottom floating bar with message and optional action button", () => {
  assert.equal(renderToStaticMarkup(<Snackbar open={false} onClose={() => {}} message="담김" />), "");

  const withAction = renderToStaticMarkup(
    <Snackbar
      open
      onClose={() => {}}
      message="산토리 히비키 상품을 장바구니에 담았습니다."
      actionLabel="장바구니 보기"
      onAction={() => {}}
    />
  );
  assert.match(withAction, /role="status"/);
  assert.match(withAction, /data-snackbar=""/);
  assert.match(withAction, /산토리 히비키 상품을 장바구니에 담았습니다\./);
  assert.match(withAction, /<button type="button"[^>]*>장바구니 보기<\/button>/);

  const plain = renderToStaticMarkup(
    <Snackbar open onClose={() => {}} message="픽업 매장이 변경되었습니다." />
  );
  assert.doesNotMatch(plain, /<button/);
});
