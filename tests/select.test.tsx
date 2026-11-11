import test from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { Select, filterSelectOptions, type SelectOption } from "../src/mobile/Select";

const STORES: SelectOption[] = [
  { value: "gangnam", label: "시크릿오더 강남본점", description: "강남역 11번 출구" },
  { value: "seongsu", label: "시크릿오더 성수점", description: "성수역 3번 출구" },
  { value: "busan", label: "시크릿오더 서면점", description: "부산 부산진구" },
];

test("Select renders trigger button, placeholder or selected label, and hidden form input", () => {
  const empty = renderToStaticMarkup(
    <Select id="store" name="store" placeholder="픽업 매장을 선택하세요" options={STORES} />
  );
  assert.match(empty, /<button[^>]*id="store"[^>]*aria-haspopup="dialog"[^>]*aria-expanded="false"/);
  assert.match(empty, /픽업 매장을 선택하세요/);
  assert.match(empty, /<input type="hidden" name="store" value=""\/>/);

  const selected = renderToStaticMarkup(
    <Select id="store" name="store" defaultValue="seongsu" options={STORES} />
  );
  assert.match(selected, /시크릿오더 성수점/);
  assert.match(selected, /<input type="hidden" name="store" value="seongsu"\/>/);
});

test("Select opens BottomSheet with option list and renders search input when searchable or >= 8 options", () => {
  const shortSheet = renderToStaticMarkup(
    <Select title="매장 선택" options={STORES} defaultValue="gangnam" defaultOpen />
  );
  assert.match(shortSheet, /role="dialog"/);
  assert.match(shortSheet, /매장 선택/);
  assert.doesNotMatch(shortSheet, /type="search"/);

  const manyOptions: SelectOption[] = Array.from({ length: 8 }, (_, i) => ({
    value: `opt-${i}`,
    label: `옵션 ${i + 1}`,
  }));
  const searchableSheet = renderToStaticMarkup(
    <Select title="주류 카테고리" options={manyOptions} defaultOpen />
  );
  assert.match(searchableSheet, /type="search"/);
});

test("filterSelectOptions filters by label and description case-insensitively", () => {
  assert.equal(filterSelectOptions(STORES, "").length, 3);
  assert.deepEqual(
    filterSelectOptions(STORES, "성수").map((o) => o.value),
    ["seongsu"]
  );
  assert.deepEqual(
    filterSelectOptions(STORES, "부산").map((o) => o.value),
    ["busan"]
  );
  assert.equal(filterSelectOptions(STORES, "없는매장").length, 0);
});
