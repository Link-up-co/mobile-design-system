import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { BRAND_PRESETS, type BrandPreset } from "../src/tokens/index.ts";

test("theme.css defines semantic colors, standard rounded radii (8/12/20px), Zinc neutral, and switchable data-brand presets", () => {
  const css = readFileSync(new URL("../src/styles/theme.css", import.meta.url), "utf8");
  for (const token of [
    "--color-primary: var(--mds-primary)",
    "--color-primary-hover: var(--mds-primary-hover)",
    "--color-primary-soft: var(--mds-primary-soft)",
    "--color-primary-fg: var(--mds-primary-fg)",
    "--color-canvas: var(--mds-canvas)",
    "--color-surface: var(--mds-surface)",
    "--color-surface-subtle: var(--mds-surface-subtle)",
    "--color-line: var(--mds-line)",
    "--color-line-strong: var(--mds-line-strong)",
    "--color-ink: var(--mds-ink)",
    "--color-ink-secondary: var(--mds-ink-secondary)",
    "--color-ink-muted: var(--mds-ink-muted)",
    "--radius-control: var(--mds-radius-control)",
    "--radius-card: var(--mds-radius-card)",
    "--radius-sheet: var(--mds-radius-sheet)",
    "--mds-radius-control: 8px",
    "--mds-radius-card: 12px",
    "--mds-radius-sheet: 20px",
  ]) {
    assert.ok(css.includes(token), `missing token: ${token}`);
  }

  for (const brand of ["cobalt", "ink", "amber", "emerald", "rose"] satisfies BrandPreset[]) {
    assert.match(css, new RegExp(`\\[data-brand="${brand}"\\]`));
    assert.ok(BRAND_PRESETS.some((p) => p.key === brand));
  }

  assert.match(css, /@utility pressable[\s\S]*transition-property:[^;]*scale/);
});
