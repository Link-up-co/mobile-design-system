import test from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { CategoryRanking, resolveCategoryIndex } from "../src/mobile/CategoryRanking";

test("resolveCategoryIndex returns matching index or falls back to 0", () => {
  const cats = [{ key: "all" }, { key: "whisky" }, { key: "wine" }];
  assert.equal(resolveCategoryIndex(cats, "wine"), 2);
  assert.equal(resolveCategoryIndex(cats, "unknown"), 0);
  assert.equal(resolveCategoryIndex([], "all"), 0);
});

test("CategoryRanking renders flat tablist, ranked product rows, rank deltas, and stretched links without nested buttons", () => {
  const html = renderToStaticMarkup(
    <CategoryRanking
      title="카테고리 베스트"
      defaultActiveKey="whisky"
      moreHref="/ranking"
      categories={[
        {
          key: "all",
          label: "전체",
          items: [{ id: "a1", name: "산토리 가쿠빈", price: 39800 }],
        },
        {
          key: "whisky",
          label: "위스키",
          items: [
            {
              id: "w1",
              name: "발베니 12년 더블우드",
              subtitle: "700ml",
              salesLabel: "주간 980병",
              price: 109000,
              originalPrice: 125000,
              rankChange: 2,
              href: "/products/w1",
              onCartClick: () => {},
            },
            {
              id: "w2",
              name: "글렌피딕 15년",
              price: 112000,
              rankChange: "NEW",
            },
          ],
        },
      ]}
    />
  );

  assert.match(html, /data-category-ranking=""/);
  assert.match(html, /role="tablist"/);
  assert.match(html, /role="tab"[^>]*aria-selected="true"[^>]*>위스키<\/button>/);
  assert.match(html, /translate3d\(calc\(-100% \+ 0px\), 0, 0\)/);
  assert.match(html, /▲2/);
  assert.match(html, /NEW/);
  assert.match(html, /13%/);
  assert.match(html, /109,000원/);
  assert.match(html, /주간 980병/);
  assert.match(html, /aria-label="발베니 12년 더블우드 장바구니 담기"/);
  assert.match(html, /href="\/ranking"/);
});
