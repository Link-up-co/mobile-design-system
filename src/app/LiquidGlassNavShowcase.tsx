"use client";

import { useState } from "react";
import {
  Button,
  CategoryIcon,
  HeartIcon,
  HomeIcon,
  LiquidGlassBottomNav,
  MapPinIcon,
  Tag,
  UserIcon,
  type BottomNavItem,
} from "../mobile";

const GLASS_ITEMS: readonly BottomNavItem[] = [
  { key: "home", label: "홈", icon: (active) => <HomeIcon filled={active} /> },
  { key: "category", label: "카테고리", icon: (active) => <CategoryIcon filled={active} /> },
  { key: "stores", label: "픽업매장", icon: (active) => <MapPinIcon filled={active} /> },
  { key: "wish", label: "찜", badge: 4, icon: (active) => <HeartIcon filled={active} /> },
  { key: "my", label: "마이", dot: true, icon: (active) => <UserIcon filled={active} /> },
];

export function LiquidGlassNavShowcase() {
  const [activeKey, setActiveKey] = useState("stores");
  const [liveFixed, setLiveFixed] = useState(false);

  return (
    <div className="space-y-3">
      {/* 뒤쪽 텍스트·라인·컬러 카드가 물방울 렌즈처럼 굴절되는지 직접 스크롤해 볼 수 있는 데모 스테이지 */}
      <div className="relative h-56 overflow-hidden rounded-card border border-line bg-[#F8FAFC]">
        <div className="subtle-scrollbar h-full space-y-2.5 overflow-y-auto p-3.5 pb-24">
          {/* 선명한 컬러·기하학 카드들 (유리 테두리 굴절 체감용) */}
          <div className="flex items-center justify-between rounded-card border-[1.5px] border-[#18181B] bg-[#FEF08A] px-3.5 py-3">
            <div>
              <span className="text-[11px] font-extrabold text-[#18181B]">SINGLE MALT FESTA</span>
              <p className="text-body font-extrabold text-[#18181B]">산토리 히비키 · 야마자키 입고</p>
            </div>
            <div className="flex size-11 items-center justify-center rounded-full border-[1.5px] border-[#18181B] bg-[#F97316] text-caption font-extrabold text-white">
              22%
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="rounded-card border-[1.5px] border-[#18181B] bg-[#BFDBFE] p-3">
              <Tag variant="solid">베스트</Tag>
              <p className="mt-1.5 text-body-sm font-extrabold text-[#18181B]">당일 30분 픽업</p>
              <p className="text-caption font-semibold text-[#1E3A8A]">강남 · 성수 · 여의도</p>
            </div>
            <div className="rounded-card border-[1.5px] border-[#18181B] bg-[#FECDD3] p-3">
              <Tag variant="danger">인기</Tag>
              <p className="mt-1.5 text-body-sm font-extrabold text-[#18181B]">그랑 크뤼 와인전</p>
              <p className="text-caption font-semibold text-[#881337]">한정 수량 큐레이션</p>
            </div>
          </div>

          <div
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, #DCFCE7 0px, #DCFCE7 12px, #86EFAC 12px, #86EFAC 24px)",
            }}
            className="flex items-center justify-between rounded-card border-[1.5px] border-[#18181B] px-3.5 py-3"
          >
            <span className="rounded-control bg-white/90 px-2 py-0.5 text-body-sm font-extrabold text-[#18181B]">
              하이볼 글라스 패키지 증정
            </span>
            <span className="text-body font-extrabold text-[#18181B]">39,800원</span>
          </div>
        </div>

        {/* 스테이지 하단에 떠 있는 리퀴드 글래스 바 (Fixed 모드 활성화 시 중복 렌더 방지) */}
        {!liveFixed && (
          <div className="pointer-events-none absolute inset-x-0 bottom-2.5 z-20 px-3">
            <div className="pointer-events-auto">
              <LiquidGlassBottomNav
                position="static"
                activeKey={activeKey}
                onActiveChange={setActiveKey}
                items={GLASS_ITEMS}
                ariaLabel="리퀴드 글래스 5탭 미리보기"
              />
            </div>
          </div>
        )}
      </div>

      <Button
        size="sm"
        variant={liveFixed ? "primary" : "soft"}
        fullWidth
        onClick={() => setLiveFixed((v) => !v)}
      >
        {liveFixed
          ? "화면 하단 플로팅 리퀴드 글래스 닫기"
          : "실제 화면 하단 플로팅(Fixed) 리퀴드 글래스 켜기"}
      </Button>

      {liveFixed && (
        <LiquidGlassBottomNav
          position="fixed"
          reserveSpace={false}
          activeKey={activeKey}
          onActiveChange={setActiveKey}
          items={GLASS_ITEMS}
        />
      )}
    </div>
  );
}
