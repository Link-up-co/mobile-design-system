import test from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { ProductCard, computeDiscountRate } from "../src/mobile/ProductCard";

test("computeDiscountRate calculates integer discount percentage safely", () => {
  assert.equal(computeDiscountRate(42500, 50000), 15);
  assert.equal(computeDiscountRate(50000, 50000), 0);
  assert.equal(computeDiscountRate(50000, undefined), 0);
});

test("ProductCard renders 1/2 grid variant with formatted price, auto discount, and optional wish/cart actions", () => {
  const html = renderToStaticMarkup(
    <ProductCard
      variant="grid"
      name="산토리 히비키 재패니즈 하모니"
      subtitle="블렌디드 위스키 · 700ml"
      price={136000}
      originalPrice={160000}
      href="/products/hibiki"
      defaultWished
      onWishToggle={() => {}}
      onCartClick={() => {}}
    />
  );
  assert.match(html, /data-variant="grid"/);
  assert.match(html, /aspect-square/);
  assert.match(html, /href="\/products\/hibiki"/);
  assert.match(html, /산토리 히비키 재패니즈 하모니/);
  assert.match(html, /15%/);
  assert.match(html, /136,000원/);
  assert.match(html, /160,000원/);
  assert.match(html, /aria-label="찜 해제"/);
  assert.match(html, /aria-label="장바구니 담기"/);
});

test("ProductCard renders full-width list variant and omits wish/cart buttons when callbacks are omitted", () => {
  const html = renderToStaticMarkup(
    <ProductCard
      variant="list"
      name="발베니 12년 더블우드"
      subtitle="싱글몰트 · 700ml"
      price={109000}
      soldOut
    />
  );
  assert.match(html, /data-variant="list"/);
  assert.match(html, /size-24/);
  assert.match(html, /일시품절/);
  assert.match(html, /109,000원/);
  assert.doesNotMatch(html, /aria-label="장바구니 담기"/);
  assert.doesNotMatch(html, /aria-label="찜하기"/);
});
