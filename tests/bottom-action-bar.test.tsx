import test from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { FixedBottomButton } from "../src/mobile/BottomActionBar";

test("FixedBottomButton defaults to position=fixed with safe-area padding and content spacer", () => {
  const html = renderToStaticMarkup(
    <FixedBottomButton>42,800원 픽업 주문하기</FixedBottomButton>
  );
  assert.match(html, /data-bottom-action-spacer=""/);
  assert.match(html, /data-position="fixed"/);
  assert.match(html, /fixed inset-x-0 bottom-0/);
  assert.match(html, /env\(safe-area-inset-bottom,0px\)/);
  assert.match(html, /h-\[52px\]/);
  assert.match(html, /42,800원 픽업 주문하기/);
});

test("FixedBottomButton supports leading slot, secondary action split, topSlot summary, and static mode without spacer", () => {
  const html = renderToStaticMarkup(
    <FixedBottomButton
      position="static"
      leading={<button type="button" aria-label="찜하기" />}
      secondaryAction={{ label: "장바구니" }}
      topSlot={<div>총 2개 · 245,000원</div>}
    >
      바로 픽업 주문
    </FixedBottomButton>
  );
  assert.doesNotMatch(html, /data-bottom-action-spacer=""/);
  assert.match(html, /data-position="static"/);
  assert.match(html, /총 2개 · 245,000원/);
  assert.match(html, /aria-label="찜하기"/);
  assert.match(html, /장바구니/);
  assert.match(html, /바로 픽업 주문/);
});
