import test from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { Field, Input, controlClass } from "../src/mobile/Input";

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
