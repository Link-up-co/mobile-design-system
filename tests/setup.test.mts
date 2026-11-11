import test from "node:test";
import assert from "node:assert/strict";
import { buildListReturnHref, formatCurrency, formatNumber } from "../src/tokens/index.ts";

test("mobile tokens utilities format currency and preserve list query params", () => {
  assert.equal(formatNumber(12500), "12,500");
  assert.equal(formatCurrency(12500), "12,500원");
  assert.equal(
    buildListReturnHref("/shop", { tab: "beer", sort: "popular", q: "" }),
    "/shop?tab=beer&sort=popular"
  );
});
