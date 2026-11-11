import test from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { BannerSlider, normalizeSlideIndex } from "../src/mobile/BannerSlider";

test("normalizeSlideIndex wraps negative and overflowing indices safely", () => {
  assert.equal(normalizeSlideIndex(0, 4), 0);
  assert.equal(normalizeSlideIndex(4, 4), 0);
  assert.equal(normalizeSlideIndex(-1, 4), 3);
  assert.equal(normalizeSlideIndex(5, 0), 0);
});

test("BannerSlider renders full-bleed carousel with loop clones, counter badge, and view-all trigger", () => {
  const html = renderToStaticMarkup(
    <BannerSlider
      variant="bleed"
      slides={[
        { id: "b1", imageSrc: "/banners/1.jpg", alt: "첫 번째 기획전", href: "/events/1" },
        { id: "b2", imageSrc: "/banners/2.jpg", alt: "두 번째 기획전", href: "/events/2" },
        { id: "b3", imageSrc: "/banners/3.jpg", alt: "세 번째 기획전", href: "/events/3" },
      ]}
      onViewAllClick={() => {}}
    />
  );

  assert.match(html, /aria-roledescription="carousel"/);
  assert.match(html, /data-variant="bleed"/);
  assert.match(html, /href="\/events\/1"/);
  assert.match(html, /src="\/banners\/1\.jpg"/);
  assert.match(html, /data-banner-counter=""/);
  assert.match(html, /전체 배너 보기 \(1 \/ 3\)/);
  assert.match(html, /배너 자동재생 일시정지/);
});

test("BannerSlider renders inset variant with dot tabs and omits loop controls for single slide", () => {
  const multiDots = renderToStaticMarkup(
    <BannerSlider
      variant="inset"
      indicator="dots"
      defaultIndex={1}
      slides={[
        { id: "s1", alt: "배너 1", media: <div>슬라이드 1</div> },
        { id: "s2", alt: "배너 2", media: <div>슬라이드 2</div> },
      ]}
    />
  );
  assert.match(multiDots, /data-variant="inset"/);
  assert.match(multiDots, /rounded-card/);
  assert.match(multiDots, /data-banner-dots=""/);
  assert.match(multiDots, /aria-selected="true"[^>]*aria-label="2번 배너로 이동"/);

  const single = renderToStaticMarkup(
    <BannerSlider slides={[{ id: "only", alt: "단독 배너", imageSrc: "/only.jpg" }]} />
  );
  assert.doesNotMatch(single, /data-banner-counter=""/);
  assert.doesNotMatch(single, /data-banner-dots=""/);
});
