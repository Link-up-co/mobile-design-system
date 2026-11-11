import test from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { Checkbox, CheckboxGroup } from "../src/mobile/Checkbox";
import { Radio, RadioButtonGroup, RadioGroup } from "../src/mobile/Radio";

test("Checkbox renders 20px rounded-md box with animated stroke checkmark and supports indeterminate", () => {
  const html = renderToStaticMarkup(<Checkbox name="agree" label="만 19세 이상 성인입니다" defaultChecked />);
  assert.match(html, /^<label[^>]*>/);
  assert.match(html, /<input[^>]*type="checkbox"[^>]*name="agree"[^>]*checked=""/);
  assert.match(html, /만 19세 이상 성인입니다<\/span><\/span><\/label>$/);

  const mixed = renderToStaticMarkup(<Checkbox label="전체 동의" indeterminate />);
  assert.match(mixed, /aria-checked="mixed"/);
});

test("CheckboxGroup supports multi-select and optional allLabel toggle", () => {
  const options = [
    { value: "age", label: "성인인증 동의" },
    { value: "pickup", label: "현장 수령 안내 동의" },
  ];
  const html = renderToStaticMarkup(
    <CheckboxGroup name="terms" options={options} defaultValue={["age"]} allLabel="전체 약관 동의" />
  );
  assert.match(html, /role="group"/);
  assert.match(html, /aria-checked="mixed"/);
  assert.match(html, /value="age"/);
  assert.match(html, /value="pickup"/);
});

test("Radio and RadioGroup render native radio inputs with circular indicator", () => {
  const single = renderToStaticMarkup(<Radio name="pay" value="card" label="신용·체크카드" defaultChecked />);
  assert.match(single, /<input[^>]*type="radio"[^>]*rounded-full/);

  const group = renderToStaticMarkup(
    <RadioGroup
      name="pickupTime"
      defaultValue="today"
      options={[
        { value: "today", label: "오늘 바로 픽업", description: "결제 후 30분 내 준비 완료" },
        { value: "tomorrow", label: "내일 예약 픽업", description: "원하는 시간대 지정" },
      ]}
    />
  );
  assert.match(group, /role="radiogroup"/);
  assert.match(group, /value="today"[^>]*checked=""|checked=""[^>]*value="today"/);
  assert.match(group, /결제 후 30분 내 준비 완료/);
});

test("RadioButtonGroup renders button-style radio options (grid and chip variants)", () => {
  const options = [
    { value: "single", label: "단품 1병", subLabel: "42,800원" },
    { value: "set", label: "하이볼 잔 패키지", subLabel: "46,900원" },
  ];
  const grid = renderToStaticMarkup(
    <RadioButtonGroup name="pkg" options={options} defaultValue="set" columns={2} />
  );
  assert.match(grid, /role="radiogroup"/);
  assert.match(grid, /grid-cols-2/);
  assert.match(grid, /type="radio"/);
  assert.match(grid, /하이볼 잔 패키지/);
  assert.match(grid, /46,900원/);

  const segmented = renderToStaticMarkup(
    <RadioButtonGroup
      name="temp"
      variant="segmented"
      options={[
        { value: "cold", label: "냉장 보관" },
        { value: "room", label: "상온 보관" },
      ]}
      defaultValue="cold"
    />
  );
  assert.match(segmented, /bg-canvas/);
  assert.match(segmented, /냉장 보관/);
});
