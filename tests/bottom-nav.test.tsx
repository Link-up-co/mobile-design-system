import test from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { BottomNav } from "../src/mobile/BottomNav";
import { CategoryIcon, HeartIcon, HomeIcon, UserIcon } from "../src/mobile/icons";

test("BottomNav defaults to full-width flat liquid glass with spacer, aria-current=page, 1.6x active icon, numeric badge, and dot indicator", () => {
  const html = renderToStaticMarkup(
    <BottomNav
      defaultActiveKey="home"
      items={[
        { key: "home", label: "홈", href: "/", icon: (a) => <HomeIcon filled={a} /> },
        { key: "category", label: "카테고리", href: "/categories", icon: (a) => <CategoryIcon filled={a} /> },
        { key: "wish", label: "찜", badge: 120, icon: (a) => <HeartIcon filled={a} /> },
        { key: "my", label: "마이", dot: true, icon: (a) => <UserIcon filled={a} /> },
      ]}
    />
  );

  assert.match(html, /data-bottom-nav-spacer=""/);
  assert.match(html, /data-position="fixed"/);
  assert.match(html, /data-liquid-pill=""/);
  assert.match(html, /translate3d\(0%, 0, 0\)/);
  assert.match(html, /saturate\(195%\)/);
  assert.match(html, /border-t border-white\/80/);
  assert.match(html, /<a href="\/" aria-label="홈" aria-current="page"/);
  assert.match(html, /data-active="true"[^>]*\[&amp;_svg\]:size-7[^>]*text-primary/);
  assert.match(html, /data-active="false"[^>]*\[&amp;_svg\]:size-7[^>]*text-ink-secondary/);
  assert.match(html, /stroke-width="1\.15"/);
  assert.doesNotMatch(html, />홈</);
  assert.doesNotMatch(html, />카테고리</);
  assert.match(html, /99\+/);
  assert.match(html, /data-nav-dot=""/);
  assert.match(html, /grid-template-columns:repeat\(4, minmax\(0, 1fr\)\)/);
});

test("BottomNav omits spacer in static mode", () => {
  const html = renderToStaticMarkup(
    <BottomNav
      position="static"
      items={[{ key: "home", label: "홈", icon: <HomeIcon /> }]}
    />
  );
  assert.doesNotMatch(html, /data-bottom-nav-spacer=""/);
  assert.match(html, /data-position="static"/);
});
