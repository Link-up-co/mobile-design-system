import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("RootLayout loads Pretendard Variable CDN, sets 15px base body, and configures viewportFit=cover", () => {
  const layout = readFileSync(new URL("../src/app/layout.tsx", import.meta.url), "utf8");
  assert.match(layout, /pretendardvariable-dynamic-subset\.min\.css/);
  assert.match(layout, /viewportFit:\s*"cover"/);
  assert.match(layout, /text-\[15px\]/);

  const css = readFileSync(new URL("../src/styles/theme.css", import.meta.url), "utf8");
  assert.match(css, /--font-sans:\s*"Pretendard Variable"/);
});
