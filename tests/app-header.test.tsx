import test from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { AppHeader } from "../src/mobile/AppHeader";
import { IconButton } from "../src/mobile/Button";
import { CartIcon, SearchIcon } from "../src/mobile/icons";

test("AppHeader renders left back button, title next to back button with ellipsis truncation, and 1 or 2 right actions", () => {
  const twoActions = renderToStaticMarkup(
    <AppHeader
      title="산토리 히비키 재패니즈 하모니 700ml 한정 패키지 특별 기획전"
      onBack={() => {}}
      actions={
        <>
          <IconButton aria-label="검색" icon={<SearchIcon />} />
          <IconButton aria-label="장바구니" icon={<CartIcon />} badge={2} />
        </>
      }
    />
  );
  assert.match(twoActions, /^<header[^>]*>/);
  assert.match(twoActions, /aria-label="뒤로가기"/);
  // 뒤로가기 버튼 바로 뒤에 truncate 타이틀 위치
  assert.match(twoActions, /aria-label="뒤로가기".*<h1[^>]*min-w-0 flex-1 truncate[^>]*>산토리 히비키/);
  assert.match(twoActions, /aria-label="검색"/);
  assert.match(twoActions, /aria-label="장바구니"/);

  const oneActionNoTitle = renderToStaticMarkup(
    <AppHeader
      onBack={() => {}}
      actions={<IconButton aria-label="장바구니" icon={<CartIcon />} />}
    />
  );
  assert.match(oneActionNoTitle, /aria-label="뒤로가기"/);
  assert.doesNotMatch(oneActionNoTitle, /<h1/);
  assert.match(oneActionNoTitle, /aria-label="장바구니"/);
});
