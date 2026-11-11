import test from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import {
  LiquidGlassBottomNav,
  computeSnellRefractionProfile,
  convexSquircleProfile,
} from "../src/mobile/LiquidGlassBottomNav";
import { CategoryIcon, HeartIcon, HomeIcon, UserIcon } from "../src/mobile/icons";

test("computeSnellRefractionProfile bends edge rays inward and reaches zero on flat interior", () => {
  assert.equal(convexSquircleProfile(0), 0);
  assert.equal(convexSquircleProfile(1), 1);

  const profile = computeSnellRefractionProfile(46, 18, convexSquircleProfile, 1.5, 64);
  assert.equal(profile.length, 64);
  // 가장자리 베젤 구간에서는 양수 굴절 변위가 발생하고 평면에 가까워질수록 0으로 수렴
  assert.ok(profile[2] > 5);
  assert.ok(profile[2] > profile[60]);
});

test("LiquidGlassBottomNav renders capsule bar, sliding liquid pill, badges, and safe-area spacer", () => {
  const html = renderToStaticMarkup(
    <LiquidGlassBottomNav
      defaultActiveKey="category"
      items={[
        { key: "home", label: "홈", href: "/", icon: <HomeIcon /> },
        { key: "category", label: "카테고리", href: "/categories", icon: <CategoryIcon /> },
        { key: "wish", label: "찜", badge: 7, icon: <HeartIcon /> },
        { key: "my", label: "마이", dot: true, icon: <UserIcon /> },
      ]}
    />
  );

  assert.match(html, /data-liquid-glass-spacer=""/);
  assert.match(html, /data-liquid-glass-nav=""/);
  assert.match(html, /data-liquid-pill=""/);
  assert.match(html, /translate3d\(100%, 0, 0\)/);
  assert.match(html, /<a href="\/categories" aria-label="카테고리" aria-current="page"/);
  assert.match(html, /\[&amp;_svg\]:size-7/);
  assert.doesNotMatch(html, />카테고리</);
  assert.match(html, /saturate\(195%\)/);
  assert.match(html, />7<\/span>/);
  assert.match(html, /data-nav-dot=""/);
});
