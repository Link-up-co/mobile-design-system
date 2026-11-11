import test from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { Button, IconButton, buttonClass } from "../src/mobile/Button";
import { CartIcon, SearchIcon } from "../src/mobile/icons";

test("Button defaults to type=button, primary, md(h-11 = 44px), rounded-control(8px), pressable", () => {
  const html = renderToStaticMarkup(<Button>바로 주문</Button>);
  assert.match(html, /^<button type="button"[^>]*pressable[^>]*rounded-control[^>]*bg-primary[^>]*h-11/);
});

test("Button supports variants (primary, soft, secondary, danger, ghost), sizes (sm h-9, md h-11, lg h-[52px]), fullWidth, icon, and loading", () => {
  assert.match(buttonClass("soft", "sm"), /bg-primary-soft[^"]*text-primary[^"]*h-9/);
  assert.match(buttonClass("secondary", "md"), /border-line[^"]*bg-surface[^"]*h-11/);
  assert.match(buttonClass("danger", "lg", true), /bg-danger[^"]*h-\[52px\][^"]*w-full/);

  const loading = renderToStaticMarkup(
    <Button loading icon={<CartIcon />}>
      장바구니 담기
    </Button>
  );
  assert.match(loading, /disabled=""[^>]*aria-busy="true"/);
  assert.match(loading, /<span class="inline-flex items-center gap-1\.5 transition-opacity opacity-0"><svg[\s\S]*?<\/svg>장바구니 담기<\/span>/);
  assert.match(loading, /animate-\[spin_0\.6s_linear_infinite\]/);
});

test("IconButton requires aria-label and renders square touch target with optional badge count", () => {
  const html = renderToStaticMarkup(<IconButton aria-label="장바구니" badge={3} icon={<CartIcon />} />);
  assert.match(html, /^<button type="button"[^>]*size-11[^>]*aria-label="장바구니"/);
  assert.match(html, />3<\/span><\/button>$/);
  const plain = renderToStaticMarkup(<IconButton aria-label="검색" size="sm" icon={<SearchIcon />} />);
  assert.match(plain, /size-9/);
});
