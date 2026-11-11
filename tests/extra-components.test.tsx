import test from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import {
  Accordion,
  Button,
  Dialog,
  EmptyState,
  FAB,
  PhoneInput,
  ProductCardSkeleton,
  Skeleton,
  SwipeTabs,
  Switch,
  Tabs,
  formatPhoneNumber,
} from "../src/mobile";

test("PhoneInput formats Korean mobile and Seoul landline numbers and posts clean digits", () => {
  assert.equal(formatPhoneNumber("01012345678"), "010-1234-5678");
  assert.equal(formatPhoneNumber("0112345678"), "011-234-5678");
  assert.equal(formatPhoneNumber("0212345678"), "02-1234-5678");
  assert.equal(formatPhoneNumber("021234567"), "02-123-4567");

  const html = renderToStaticMarkup(
    <PhoneInput id="tel" name="phone" defaultValue="010-9876-5432" />
  );
  assert.match(html, /<input type="hidden" name="phone" value="01098765432"\/>/);
  assert.match(html, /value="010-9876-5432"/);
  assert.match(html, /aria-label="연락처 지우기"/);
});

test("Dialog renders nothing when closed and supports 1-button alert and 2-button danger confirm", () => {
  assert.equal(
    renderToStaticMarkup(<Dialog open={false} onClose={() => {}} title="제목" />),
    ""
  );

  const alertHtml = renderToStaticMarkup(
    <Dialog open onClose={() => {}} title="성인인증 안내" description="만 19세 이상 구매 가능" />
  );
  assert.match(alertHtml, /role="dialog"/);
  assert.match(alertHtml, /grid-cols-1/);
  assert.match(alertHtml, />확인</);

  const dangerHtml = renderToStaticMarkup(
    <Dialog
      open
      onClose={() => {}}
      title="주문 취소"
      cancelLabel="닫기"
      confirmLabel="취소하기"
      confirmVariant="danger"
    />
  );
  assert.match(dangerHtml, /role="alertdialog"/);
  assert.match(dangerHtml, /grid-cols-2/);
  assert.match(dangerHtml, />닫기</);
  assert.match(dangerHtml, />취소하기</);
});

test("Tabs and SwipeTabs render flat tablist, counts, aria-selected, and swipeable tabpanels", () => {
  const tabsHtml = renderToStaticMarkup(
    <Tabs
      defaultActiveKey="review"
      items={[
        { key: "info", label: "상품정보" },
        { key: "review", label: "리뷰", count: 128 },
      ]}
    />
  );
  assert.match(tabsHtml, /role="tablist"/);
  assert.match(tabsHtml, /aria-selected="true"[^>]*><span>리뷰<\/span><span[^>]*>128<\/span>/);

  const swipeHtml = renderToStaticMarkup(
    <SwipeTabs
      defaultActiveKey="b"
      tabs={[
        { key: "a", label: "탭A", content: <p>내용A</p> },
        { key: "b", label: "탭B", content: <p>내용B</p> },
      ]}
    />
  );
  assert.match(swipeHtml, /translate3d\(-100%, 0, 0\)/);
  assert.match(swipeHtml, /내용B/);
});

test("Switch renders role=switch with aria-checked, optional label row, and hidden form input when checked", () => {
  const onHtml = renderToStaticMarkup(
    <Switch name="push" defaultChecked label="푸시 알림" description="준비 완료 시 알림" />
  );
  assert.match(onHtml, /role="switch"/);
  assert.match(onHtml, /aria-checked="true"/);
  assert.match(onHtml, /<input type="hidden" name="push" value="on"\/>/);
  assert.match(onHtml, /푸시 알림/);

  const offHtml = renderToStaticMarkup(<Switch name="push" aria-label="알림 토글" />);
  assert.match(offHtml, /aria-checked="false"/);
  assert.doesNotMatch(offHtml, /type="hidden"/);
});

test("Accordion renders 1px flat border-y divide-y list and expands defaultOpenKeys", () => {
  const html = renderToStaticMarkup(
    <Accordion
      defaultOpenKeys={["q1"]}
      items={[
        { key: "q1", title: "질문1", content: "답변1" },
        { key: "q2", title: "질문2", content: "답변2" },
      ]}
    />
  );
  assert.match(html, /divide-y divide-line border-y border-line/);
  assert.match(html, /aria-expanded="true"/);
  assert.match(html, /aria-expanded="false"/);
  assert.match(html, /grid-template-rows:1fr/);
  assert.match(html, /grid-template-rows:0fr/);
});

test("EmptyState, Skeleton, and FAB render clean markup with accessible attributes", () => {
  const emptyHtml = renderToStaticMarkup(
    <EmptyState
      title="장바구니가 비었습니다"
      description="상품을 담아보세요"
      action={<Button size="sm">담으러 가기</Button>}
    />
  );
  assert.match(emptyHtml, /data-empty-state=""/);
  assert.match(emptyHtml, /장바구니가 비었습니다/);
  assert.match(emptyHtml, /담으러 가기/);

  const skelHtml = renderToStaticMarkup(
    <>
      <Skeleton variant="circle" className="size-10" />
      <ProductCardSkeleton variant="grid" />
      <ProductCardSkeleton variant="list" />
    </>
  );
  assert.match(skelHtml, /data-skeleton=""/);
  assert.match(skelHtml, /data-product-skeleton="grid"/);
  assert.match(skelHtml, /data-product-skeleton="list"/);

  const fabHtml = renderToStaticMarkup(<FAB aria-label="글쓰기" />);
  assert.match(fabHtml, /data-fab-container=""/);
  assert.match(fabHtml, /aria-label="글쓰기"/);
});
