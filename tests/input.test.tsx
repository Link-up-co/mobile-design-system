import test from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import {
  BirthDateInput,
  EmailInput,
  Field,
  Input,
  OtpInput,
  PasswordInput,
  SearchBar,
  Textarea,
  buildEmailSuggestions,
  computeTextareaLayout,
  controlClass,
  formatBirthDate,
  isValidEmail,
  stripBirthDigits,
} from "../src/mobile/Input";
import { QuantityStepper, clampQuantity } from "../src/mobile/QuantityStepper";

test("Input uses light gray fill (bg-canvas/70), h-11 (44px), 15px text-body, and focus surface + primary border/ring", () => {
  const html = renderToStaticMarkup(<Input id="phone" placeholder="휴대폰 번호 입력" />);
  assert.match(html, /^<input[^>]*id="phone"/);
  for (const cls of ["rounded-control", "bg-canvas/70", "focus:bg-surface", "focus:border-primary", "focus:ring-primary/15", "h-11", "text-body"]) {
    assert.ok(html.includes(cls), `missing class: ${cls}`);
  }
  assert.match(controlClass("md", true), /border-danger[^"]*focus:ring-danger\/15/);
});

test("Field renders label, required mark, and error or help text", () => {
  const errHtml = renderToStaticMarkup(
    <Field label="주문자명" htmlFor="buyer" required error="주문자명을 입력해 주세요.">
      <Input id="buyer" invalid />
    </Field>
  );
  assert.match(errHtml, /<label for="buyer"[^>]*>주문자명<span[^>]*>\*<\/span><\/label>/);
  assert.match(errHtml, /aria-invalid="true"/);
  assert.match(errHtml, /<p role="alert"[^>]*text-danger">주문자명을 입력해 주세요\.<\/p>/);
});

test("Textarea places maxLength counter inside bottom-right and hides scrollbar (subtle-scrollbar)", () => {
  assert.deepEqual(computeTextareaLayout(44, 140), { height: 44, overflowY: "hidden" });
  assert.deepEqual(computeTextareaLayout(92, 140), { height: 92, overflowY: "hidden" });
  assert.deepEqual(computeTextareaLayout(180, 140), { height: 140, overflowY: "auto" });

  const html = renderToStaticMarkup(
    <Textarea id="memo" name="memo" defaultValue="얼음 많이 주세요" maxLength={100} maxHeight={140} placeholder="요청사항 입력" />
  );
  assert.match(html, /<textarea[^>]*rows="1"[^>]*maxLength="100"/);
  assert.match(html, /resize-none/);
  assert.match(html, /subtle-scrollbar/);
  // 내부 우측 하단 카운터 확인
  assert.match(html, /class="[^"]*px-3\.5 pb-2 text-right text-caption[^"]*">9 \/ 100<\/div>/);
});

test("PasswordInput renders type=password with visibility toggle button", () => {
  const html = renderToStaticMarkup(<PasswordInput id="pw" name="password" placeholder="비밀번호 입력" />);
  assert.match(html, /<input[^>]*type="password"[^>]*id="pw"/);
  assert.match(html, /<button type="button"[^>]*aria-label="비밀번호 보기"/);
});

test("EmailInput builds domain suggestions, validates format, and renders email keyboard attributes + clear button", () => {
  const s1 = buildEmailSuggestions("yoonmin");
  assert.equal(s1[0]?.email, "yoonmin@naver.com");
  assert.equal(s1[1]?.email, "yoonmin@gmail.com");

  const s2 = buildEmailSuggestions("yoonmin@ka");
  assert.deepEqual(
    s2.map((s) => s.email),
    ["yoonmin@kakao.com"]
  );

  // 완성된 이메일과 동일하면 불필요한 추천을 숨김
  assert.deepEqual(buildEmailSuggestions("yoonmin@naver.com"), []);

  assert.equal(isValidEmail("user@link-up.kr"), true);
  assert.equal(isValidEmail("user@invalid"), false);
  assert.equal(isValidEmail("bad email@naver.com"), false);

  const html = renderToStaticMarkup(
    <EmailInput id="email" name="email" defaultValue="yoonmin@link-up.kr" />
  );
  assert.match(html, /<input[^>]*type="email"[^>]*inputMode="email"[^>]*autoCapitalize="none"/);
  assert.match(html, /value="yoonmin@link-up\.kr"/);
  assert.match(html, /aria-label="이메일 지우기"/);
});

test("BirthDateInput formats YYYY.MM.DD and posts clean 8-digit value", () => {
  assert.equal(stripBirthDigits("1995-08-1599"), "19950815");
  assert.equal(formatBirthDate("1995"), "1995");
  assert.equal(formatBirthDate("199508"), "1995.08");
  assert.equal(formatBirthDate("19950815"), "1995.08.15");

  const html = renderToStaticMarkup(<BirthDateInput id="birth" name="birth" defaultValue="19950815" />);
  assert.match(html, /<input type="hidden" name="birth" value="19950815"\/>/);
  assert.match(html, /<input[^>]*inputMode="numeric"[^>]*id="birth"[^>]*value="1995\.08\.15"/);
});

test("OtpInput renders N numeric cells with one-time-code autocomplete and posts combined value", () => {
  const html = renderToStaticMarkup(<OtpInput id="otp" name="otp" length={6} defaultValue="482" />);
  assert.match(html, /<input type="hidden" name="otp" value="482"\/>/);
  const cells = [...html.matchAll(/aria-label="인증번호 (\d)번째 자리"/g)];
  assert.equal(cells.length, 6);
  assert.match(html, /autoComplete="one-time-code"/);
  assert.match(html, /value="4"/);
  assert.match(html, /value="8"/);
  assert.match(html, /value="2"/);
});

test("QuantityStepper clamps between min and max, disables boundary buttons, and renders animated count-up display", () => {
  assert.equal(clampQuantity(0, 1, 10), 1);
  assert.equal(clampQuantity(15, 1, 10), 10);
  assert.equal(clampQuantity(4, 1, 10), 4);

  const atMin = renderToStaticMarkup(<QuantityStepper id="qty" name="qty" defaultValue={1} min={1} max={5} />);
  assert.match(atMin, /<button type="button"[^>]*aria-label="수량 감소"[^>]*disabled=""/);
  assert.match(atMin, /<input[^>]*id="qty"[^>]*name="qty"[^>]*value="1"/);
  assert.match(atMin, /data-stepper-value="1"/);
  assert.doesNotMatch(atMin, /aria-label="수량 증가"[^>]*disabled=""/);

  const atMax = renderToStaticMarkup(<QuantityStepper defaultValue={5} min={1} max={5} />);
  assert.match(atMax, /<button type="button"[^>]*aria-label="수량 증가"[^>]*disabled=""/);
});

test("SearchBar attaches search input and submit button, and shows clear button when value is non-empty", () => {
  const empty = renderToStaticMarkup(<SearchBar id="q" name="q" placeholder="주류·매장 검색" buttonLabel="검색" />);
  assert.match(empty, /<input[^>]*type="search"[^>]*id="q"[^>]*name="q"/);
  assert.doesNotMatch(empty, /aria-label="검색어 지우기"/);
  assert.match(empty, /<button type="submit"[^>]*><span[^>]*>검색<\/span><\/button>/);

  const filled = renderToStaticMarkup(<SearchBar id="q2" name="q" defaultValue="산토리" buttonLabel="검색" />);
  assert.match(filled, /aria-label="검색어 지우기"/);
  assert.match(filled, /value="산토리"/);
});
