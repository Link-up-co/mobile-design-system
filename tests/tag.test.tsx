import test from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { ProductCard, Tag, inferTagVariant } from "../src/mobile";

test("inferTagVariant maps Korean merchandising keywords to semantic tones", () => {
  assert.equal(inferTagVariant("베스트"), "solid");
  assert.equal(inferTagVariant("인기"), "danger");
  assert.equal(inferTagVariant("행사"), "warning");
  assert.equal(inferTagVariant("추천"), "primary");
  assert.equal(inferTagVariant("신상"), "success");
  assert.equal(inferTagVariant("기타안내"), "neutral");
});

test("Tag supports inferred variants, explicit variants, and custom HEX tinting, and renders inside ProductCard", () => {
  const customHtml = renderToStaticMarkup(<Tag color="#7C3AED">시그니처</Tag>);
  assert.match(customHtml, /data-tag-variant="custom"/);
  assert.match(customHtml, /color:#7C3AED/i);

  const cardHtml = renderToStaticMarkup(
    <ProductCard
      variant="grid"
      name="산토리 히비키"
      price={136000}
      tags={["베스트", "인기", { label: "행사", variant: "warning" }, "추천"]}
    />
  );
  assert.match(cardHtml, /data-product-tags=""/);
  assert.match(cardHtml, /data-tag-variant="solid"[^>]*>베스트<\/span>/);
  assert.match(cardHtml, /data-tag-variant="danger"[^>]*>인기<\/span>/);
  assert.match(cardHtml, /data-tag-variant="warning"[^>]*>행사<\/span>/);
  assert.match(cardHtml, /data-tag-variant="primary"[^>]*>추천<\/span>/);
});
