import test from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import {
  Select,
  computeVirtualRange,
  filterSelectOptions,
  matchesKoreanQuery,
  type SelectOption,
} from "../src/mobile/Select";

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

test("filterSelectOptions supports plain text, Korean choseong (초성), and mixed composition queries", () => {
  assert.equal(filterSelectOptions(STORES, "").length, 3);
  assert.deepEqual(
    filterSelectOptions(STORES, "성수").map((o) => o.value),
    ["seongsu"]
  );
  // 초성 검색: ㅅㅅ -> 성수, ㄱㄴㅂㅈ -> 강남본점, ㅂㅅ -> description의 부산
  assert.deepEqual(
    filterSelectOptions(STORES, "ㅅㅅㅈ").map((o) => o.value),
    ["seongsu"]
  );
  assert.deepEqual(
    filterSelectOptions(STORES, "ㄱㄴㅂㅈ").map((o) => o.value),
    ["gangnam"]
  );
  assert.deepEqual(
    filterSelectOptions(STORES, "ㅂㅅㅈㄱ").map((o) => o.value),
    ["busan"]
  );
  // 타이핑 중 혼합 조합(완성형 + 초성): '강ㄴ', '서ㅁ'
  assert.ok(matchesKoreanQuery("시크릿오더 강남본점", "강ㄴ"));
  assert.ok(matchesKoreanQuery("시크릿오더 서면점", "서ㅁ"));
  assert.equal(filterSelectOptions(STORES, "없는매장").length, 0);
});

test("Select virtualizes large option lists so only visible window + overscan nodes mount", () => {
  const range = computeVirtualRange(500, 60, 600, 300, 3);
  assert.deepEqual(range, {
    start: 7,
    end: 18,
    offsetY: 420,
    totalHeight: 30000,
  });

  const hugeOptions: SelectOption[] = Array.from({ length: 500 }, (_, i) => ({
    value: `store-${i}`,
    label: `픽업 매장 ${i + 1}호점`,
    description: `서울 권역 ${i + 1}`,
  }));
  const html = renderToStaticMarkup(
    <Select title="전국 매장" options={hugeOptions} defaultOpen />
  );
  const renderedOptionCount = (html.match(/role="option"/g) ?? []).length;
  assert.ok(
    renderedOptionCount > 0 && renderedOptionCount < 40,
    `expected virtualized subset (<40), got ${renderedOptionCount}`
  );
  assert.match(html, /height:30000px/);
});
