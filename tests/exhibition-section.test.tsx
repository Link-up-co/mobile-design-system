import test from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { ExhibitionSection } from "../src/mobile/ExhibitionSection";

test("ExhibitionSection renders title, subtitle, view-all link, and horizontal ProductCard slide list", () => {
  const html = renderToStaticMarkup(
    <ExhibitionSection
      title="주말 홈바 추천 기획전"
      subtitle="전용잔 패키지 한정 수량 특가"
      moreHref="/exhibitions/weekend-homebar"
      items={[
        {
          id: "p1",
          name: "산토리 히비키 재패니즈 하모니",
          subtitle: "700ml",
          price: 136000,
          originalPrice: 160000,
          href: "/products/p1",
          onWishToggle: () => {},
          onCartClick: () => {},
        },
        {
          id: "p2",
          name: "발베니 12년 더블우드",
          subtitle: "700ml",
          price: 109000,
          href: "/products/p2",
        },
      ]}
    />
  );

  assert.match(html, /data-exhibition-section=""/);
  assert.match(html, /<h2[^>]*>주말 홈바 추천 기획전<\/h2>/);
  assert.match(html, /전용잔 패키지 한정 수량 특가/);
  assert.match(html, /<a href="\/exhibitions\/weekend-homebar"[^>]*><span>전체보기<\/span>/);
  assert.match(html, /snap-x snap-mandatory/);
  assert.match(html, /-mx-5 scroll-pl-5 px-5/);
  assert.match(html, /산토리 히비키 재패니즈 하모니/);
  assert.match(html, /136,000원/);
  assert.match(html, /15%/);
  assert.match(html, /발베니 12년 더블우드/);
});

test("ExhibitionSection omits view-all trigger and subtitle when not provided", () => {
  const html = renderToStaticMarkup(
    <ExhibitionSection
      title="신규 입고 주류"
      bleed={false}
      items={[{ id: "p1", name: "맥캘란 12년", price: 148000 }]}
    />
  );

  assert.match(html, /신규 입고 주류/);
  assert.doesNotMatch(html, /전체보기/);
  assert.doesNotMatch(html, /-mx-5/);
});
