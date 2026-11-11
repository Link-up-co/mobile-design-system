import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { Text } from "../src/mobile/Text";

test("theme.css defines high-contrast mobile typography tokens (24/19/16/15/13/12, price 22)", () => {
  const css = readFileSync(new URL("../src/styles/theme.css", import.meta.url), "utf8");
  for (const token of [
    "--text-hero: 1.5rem",
    "--text-title: 1.1875rem",
    "--text-section: 1rem",
    "--text-body: 0.9375rem",
    "--text-body-sm: 0.8125rem",
    "--text-caption: 0.75rem",
    "--text-price: 1.375rem",
  ]) {
    assert.ok(css.includes(token), `missing token: ${token}`);
  }
});

test("Text renders semantic tag, typography variant, and tone", () => {
  assert.match(renderToStaticMarkup(<Text variant="hero">이번 주 픽업 특가</Text>), /^<h1 class="[^"]*text-hero font-bold/);
  assert.match(renderToStaticMarkup(<Text variant="title">상품 상세</Text>), /^<h1 class="[^"]*text-title font-bold/);
  assert.match(renderToStaticMarkup(<Text variant="section">픽업 매장 안내</Text>), /^<h2 class="[^"]*text-section font-semibold/);
  assert.match(renderToStaticMarkup(<Text variant="price" tone="primary">42,800원</Text>), /tabular-nums[^"]*text-primary/);
  assert.match(renderToStaticMarkup(<Text as="p" variant="body-sm" tone="secondary">안내</Text>), /^<p class="[^"]*text-body-sm[^"]*text-ink-secondary/);
});
