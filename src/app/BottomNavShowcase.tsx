"use client";

import { useState } from "react";
import {
  BottomNav,
  Button,
  CartIcon,
  CategoryIcon,
  HeartIcon,
  HomeIcon,
  MapPinIcon,
  SearchIcon,
  Tag,
  UserIcon,
  type BottomNavItem,
} from "../mobile";

const FIVE_TAB_ITEMS: readonly BottomNavItem[] = [
  { key: "home", label: "홈", icon: (active) => <HomeIcon filled={active} /> },
  { key: "category", label: "카테고리", icon: (active) => <CategoryIcon filled={active} /> },
  { key: "stores", label: "픽업매장", icon: (active) => <MapPinIcon filled={active} /> },
  { key: "wish", label: "찜", badge: 4, icon: (active) => <HeartIcon filled={active} /> },
  { key: "my", label: "마이", dot: true, icon: (active) => <UserIcon filled={active} /> },
];

const FOUR_TAB_ITEMS: readonly BottomNavItem[] = [
  { key: "home", label: "홈", icon: (active) => <HomeIcon filled={active} /> },
  { key: "search", label: "검색", icon: (active) => <SearchIcon filled={active} /> },
  { key: "cart", label: "장바구니", badge: 3, icon: (active) => <CartIcon filled={active} /> },
  { key: "my", label: "마이", icon: (active) => <UserIcon filled={active} /> },
];

export function BottomNavShowcase() {
  const [active5, setActive5] = useState("home");
  const [liveFixed, setLiveFixed] = useState(false);

  return (
    <div className="space-y-5">
      {/* 1) 5탭 풀폭 플랫 리퀴드 글래스 바텀 메뉴 */}
      <div className="space-y-2">
        <span className="block text-body-sm font-semibold text-ink-secondary">
          5탭 풀폭 플랫 리퀴드 글래스 (28px 아이콘 전용 · 물방울 · 상단 베젤 굴절)
        </span>
        <div className="relative -mx-5 overflow-hidden border-y border-line bg-[#F8FAFC] pt-3">
          {/* 상단 유리 단면 굴절·투과 확인용 배경 카드 */}
          <div className="mx-5 -mb-5 grid grid-cols-2 gap-2.5 pb-1">
            <div className="rounded-card border-[1.5px] border-[#18181B] bg-[#FEF08A] p-2.5">
              <Tag variant="solid">베스트</Tag>
              <p className="mt-1 text-body-sm font-extrabold text-[#18181B]">맥캘란 12년 셰리 오크</p>
            </div>
            <div className="rounded-card border-[1.5px] border-[#18181B] bg-[#BFDBFE] p-2.5">
              <Tag variant="primary">추천</Tag>
              <p className="mt-1 text-body-sm font-extrabold text-[#18181B]">오늘 주문 당일 픽업</p>
            </div>
          </div>

          {!liveFixed && (
            <BottomNav
              position="static"
              activeKey={active5}
              onActiveChange={setActive5}
              items={FIVE_TAB_ITEMS}
              ariaLabel="5탭 메인 메뉴 미리보기"
            />
          )}
        </div>
      </div>

      {/* 2) 4탭 간결형 플랫 리퀴드 글래스 */}
      {!liveFixed && (
        <div className="space-y-2">
          <span className="block text-body-sm font-semibold text-ink-secondary">
            4탭 메인 메뉴 (홈 · 검색 · 장바구니 · 마이)
          </span>
          <div className="relative -mx-5 overflow-hidden border-y border-line bg-[#F8FAFC] pt-3">
            <div
              style={{
                backgroundImage:
                  "repeating-linear-gradient(135deg, #DCFCE7 0px, #DCFCE7 12px, #86EFAC 12px, #86EFAC 24px)",
              }}
              className="mx-5 -mb-5 flex items-center justify-between rounded-card border-[1.5px] border-[#18181B] px-3 py-2.5"
            >
              <span className="rounded-control bg-white/90 px-2 py-0.5 text-caption font-extrabold text-[#18181B]">
                전용 테이스팅 잔 증정
              </span>
              <span className="text-body-sm font-extrabold text-[#18181B]">49,000원</span>
            </div>

            <BottomNav
              position="static"
              defaultActiveKey="home"
              items={FOUR_TAB_ITEMS}
              ariaLabel="4탭 메인 메뉴 미리보기"
            />
          </div>
        </div>
      )}

      {/* 실제 화면 하단 고정(position="fixed") 라이브 토글 */}
      <div className="pt-1">
        <Button
          size="sm"
          variant={liveFixed ? "primary" : "soft"}
          fullWidth
          onClick={() => setLiveFixed((v) => !v)}
        >
          {liveFixed
            ? "화면 하단 플랫 리퀴드 글래스 닫기"
            : "실제 화면 하단 고정(Fixed) 플랫 리퀴드 글래스 켜기"}
        </Button>
      </div>

      {liveFixed && (
        <BottomNav
          position="fixed"
          reserveSpace={false}
          activeKey={active5}
          onActiveChange={setActive5}
          items={FIVE_TAB_ITEMS}
        />
      )}
    </div>
  );
}
