import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

test("package.json exposes compiled dist exports, clean peerDependencies, and preserves use client directive", () => {
  const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));

  assert.equal(pkg.name, "@linkup/mobile-design-system");
  assert.deepEqual(Object.keys(pkg.dependencies), ["clsx"]);
  assert.ok(pkg.peerDependencies?.react);
  assert.ok(pkg.peerDependencies?.["react-dom"]);
  assert.equal(pkg.exports["."].default, "./dist/index.js");
  assert.equal(pkg.exports["."].types, "./dist/index.d.ts");
  assert.equal(pkg.exports["./tokens"].default, "./dist/tokens/index.js");
  assert.equal(pkg.exports["./styles.css"], "./src/styles/theme.css");
  assert.equal(pkg.bin?.["linkup-mds"], "./bin/cli.mjs");

  assert.ok(existsSync(new URL("../dist/index.js", import.meta.url)), "dist/index.js must exist");
  assert.ok(existsSync(new URL("../dist/index.d.ts", import.meta.url)), "dist/index.d.ts must exist");

  const sheetJs = readFileSync(new URL("../dist/mobile/BottomSheet.js", import.meta.url), "utf8");
  assert.ok(sheetJs.startsWith('"use client";'), 'dist client components must start with "use client";');
});
