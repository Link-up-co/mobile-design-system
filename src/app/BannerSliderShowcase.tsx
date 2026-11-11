"use client";

import { useState } from "react";
import { BannerSlider, BottomSheet, Toast, type BannerSlide } from "../mobile";

function VectorArtwork({
  bg,
  badgeBg,
  badgeText,
  title,
  sub,
  illustration,
}: {
  bg: string;
  badgeBg: string;
  badgeText: string;
  title: string;
  sub: string;
  illustration: "whisky" | "pickup" | "wine" | "highball";
}) {
  return (
    <div
      style={{ backgroundColor: bg }}
      className="relative flex size-full items-center justify-between overflow-hidden px-5 py-4"
    >
      <div className="z-10 flex max-w-[60%] flex-col items-start gap-1.5">
        <span
          style={{ backgroundColor: badgeBg }}
          className="inline-flex items-center rounded-full border-[1.5px] border-[#18181B] px-2.5 py-0.5 text-[11px] font-extrabold tracking-tight text-[#18181B]"
        >
          {badgeText}
        </span>
        <strong className="whitespace-pre-line text-[19px] leading-[1.28] font-extrabold tracking-tight text-[#18181B]">
          {title}
        </strong>
        <span className="text-caption font-semibold text-[#3F3F46]">{sub}</span>
      </div>

      {/* 한국형 블랙 아웃라인(#18181B) + 선명한 컬러 벡터 일러스트 */}
      <div className="z-10 flex size-28 shrink-0 items-center justify-center">
        {illustration === "whisky" && (
          <svg aria-hidden="true" viewBox="0 0 112 112" className="size-full">
            <circle cx="58" cy="58" r="42" fill="#FFFFFF" stroke="#18181B" strokeWidth="2.4" />
            <path
              d="M44 18h14v8l-2 9c7 4 11 10 11 18v31a5 5 0 0 1-5 5H40a5 5 0 0 1-5-5V53c0-8 4-14 11-18l-2-9v-8Z"
              fill="#F59E0B"
              stroke="#18181B"
              strokeWidth="2.4"
              strokeLinejoin="round"
            />
            <rect x="43" y="14" width="16" height="5" rx="1.5" fill="#18181B" />
            <rect
              x="39"
              y="52"
              width="24"
              height="22"
              rx="2"
              fill="#FFFBEB"
              stroke="#18181B"
              strokeWidth="2"
            />
            {/* 온더락 글라스 */}
            <path
              d="M64 62h24l-2.5 26a4 4 0 0 1-4 3.6h-11a4 4 0 0 1-4-3.6L64 62Z"
              fill="#FFFFFF"
              stroke="#18181B"
              strokeWidth="2.4"
              strokeLinejoin="round"
            />
            <path d="M65.8 74h20.4l-1.2 13.5H67L65.8 74Z" fill="#FBBF24" stroke="#18181B" strokeWidth="2" />
            <rect
              x="70"
              y="67"
              width="9"
              height="9"
              rx="1.5"
              transform="rotate(12 70 67)"
              fill="#E0F2FE"
              stroke="#18181B"
              strokeWidth="1.8"
            />
          </svg>
        )}

        {illustration === "pickup" && (
          <svg aria-hidden="true" viewBox="0 0 112 112" className="size-full">
            <circle cx="58" cy="58" r="42" fill="#FFFFFF" stroke="#18181B" strokeWidth="2.4" />
            {/* 쇼핑백 + 보틀 */}
            <path
              d="M52 20h12v14H52V20Z"
              fill="#10B981"
              stroke="#18181B"
              strokeWidth="2.4"
              strokeLinejoin="round"
            />
            <rect x="51" y="16" width="14" height="5" rx="1.5" fill="#18181B" />
            <path
              d="M32 42h48l4 46a4 4 0 0 1-4 4H32a4 4 0 0 1-4-4l4-46Z"
              fill="#3B82F6"
              stroke="#18181B"
              strokeWidth="2.4"
              strokeLinejoin="round"
            />
            <path
              d="M45 42v-7a11 11 0 0 1 22 0v7"
              fill="none"
              stroke="#18181B"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            {/* 흰 피부 손 일러스트 포인트 */}
            <circle cx="76" cy="40" r="9" fill="#FFFDF9" stroke="#18181B" strokeWidth="2.2" />
            <rect
              x="40"
              y="58"
              width="32"
              height="18"
              rx="4"
              fill="#FFFFFF"
              stroke="#18181B"
              strokeWidth="2"
            />
            <path
              d="M50 67l4.5 4.5L63 63"
              fill="none"
              stroke="#0066FF"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}

        {illustration === "wine" && (
          <svg aria-hidden="true" viewBox="0 0 112 112" className="size-full">
            <circle cx="58" cy="58" r="42" fill="#FFFFFF" stroke="#18181B" strokeWidth="2.4" />
            <path
              d="M38 18h10v12l6 12v44a4 4 0 0 1-4 4H36a4 4 0 0 1-4-4V42l6-12V18Z"
              fill="#E11D48"
              stroke="#18181B"
              strokeWidth="2.4"
              strokeLinejoin="round"
            />
            <rect x="36" y="48" width="14" height="22" rx="1.5" fill="#FFF1F2" stroke="#18181B" strokeWidth="2" />
            {/* 와인잔 */}
            <path
              d="M64 38h20c0 12-4 20-10 20s-10-8-10-20Z"
              fill="#FFFFFF"
              stroke="#18181B"
              strokeWidth="2.4"
              strokeLinejoin="round"
            />
            <path d="M65.5 46h17c-1.2 7.5-4.4 12-8.5 12s-7.3-4.5-8.5-12Z" fill="#FB7185" stroke="#18181B" strokeWidth="2" />
            <path d="M74 58v24M66 82h16" fill="none" stroke="#18181B" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
        )}

        {illustration === "highball" && (
          <svg aria-hidden="true" viewBox="0 0 112 112" className="size-full">
            <circle cx="58" cy="58" r="42" fill="#FFFFFF" stroke="#18181B" strokeWidth="2.4" />
            <rect
              x="40"
              y="26"
              width="32"
              height="62"
              rx="5"
              fill="#FEF08A"
              stroke="#18181B"
              strokeWidth="2.4"
            />
            <rect x="40" y="26" width="32" height="12" rx="3" fill="#FFFFFF" stroke="#18181B" strokeWidth="2.4" />
            {/* 레몬 웨지 */}
            <path
              d="M62 24a14 14 0 0 1 20 18L62 24Z"
              fill="#FACC15"
              stroke="#18181B"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <circle cx="50" cy="54" r="3" fill="#FFFFFF" stroke="#18181B" strokeWidth="1.8" />
            <circle cx="61" cy="66" r="3.5" fill="#FFFFFF" stroke="#18181B" strokeWidth="1.8" />
            <circle cx="52" cy="76" r="2.5" fill="#FFFFFF" stroke="#18181B" strokeWidth="1.8" />
          </svg>
        )}
      </div>
    </div>
  );
}

const MAIN_BANNERS: readonly {
  id: string;
  alt: string;
  title: string;
  sub: string;
  badgeText: string;
  bg: string;
  badgeBg: string;
  illustration: "whisky" | "pickup" | "wine" | "highball";
}[] = [
  {
    id: "whisky-festa",
    alt: "싱글몰트 위스키 전용잔 한정 기획전 최대 22% 할인",
    badgeText: "LIMITED EDITION",
    title: "싱글몰트 위스키\n전용잔 한정 기획전",
    sub: "인기 보틀 최대 22% 특가",
    bg: "#FEF3C7",
    badgeBg: "#FDE047",
    illustration: "whisky",
  },
  {
    id: "smart-pickup",
    alt: "퇴근길 30분 당일 스마트오더 매장 픽업",
    badgeText: "TODAY PICKUP",
    title: "퇴근길 기다림 없이\n30분 당일 매장 픽업",
    sub: "전국 80개 시크릿오더 제휴점",
    bg: "#DBEAFE",
    badgeBg: "#93C5FD",
    illustration: "pickup",
  },
  {
    id: "wine-week",
    alt: "소믈리에 추천 그랑 크뤼 와인 위크",
    badgeText: "WINE CURATION",
    title: "소믈리에가 고른\n주말 디너 와인 위크",
    sub: "페어링 와인 2병 추가 혜택",
    bg: "#FFE4E6",
    badgeBg: "#FDA4AF",
    illustration: "wine",
  },
  {
    id: "highball-pack",
    alt: "홈바 하이볼 스타터 패키지 출시",
    badgeText: "HOME BAR",
    title: "탄산수만 준비하세요\n하이볼 스타터 팩",
    sub: "전용 지거 · 코스터 증정",
    bg: "#ECFCCB",
    badgeBg: "#BEF264",
    illustration: "highball",
  },
];

export function BannerSliderShowcase() {
  const [allOpen, setAllOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const slides: BannerSlide[] = MAIN_BANNERS.map((b) => ({
    id: b.id,
    alt: b.alt,
    onClick: () => setToastMsg(`'${b.title.replace("\n", " ")}' 기획전으로 이동합니다.`),
    media: (
      <VectorArtwork
        bg={b.bg}
        badgeBg={b.badgeBg}
        badgeText={b.badgeText}
        title={b.title}
        sub={b.sub}
        illustration={b.illustration}
      />
    ),
  }));

  return (
    <div className="space-y-5">
      {/* 1) 풀폭 메인배너 (좌우 여백 없는 스크린 풀폭 + 1 / N + 전체보기) */}
      <div className="space-y-2">
        <span className="block text-body-sm font-semibold text-ink-secondary">
          풀폭 메인배너 (드래그 스와이프 · 무한 루프 · 1/N 카운터)
        </span>
        <div className="-mx-5 border-y border-line">
          <BannerSlider
            variant="bleed"
            aspectRatio="16 / 9"
            slides={slides}
            onViewAllClick={() => setAllOpen(true)}
          />
        </div>
      </div>

      {/* 2) 인셋 카드형 배너 (하단 확장형 도트 인디케이터) */}
      <div className="space-y-2">
        <span className="block text-body-sm font-semibold text-ink-secondary">
          인셋 카드형 배너 (2:1 비율 · 도트 인디케이터)
        </span>
        <BannerSlider
          variant="inset"
          aspectRatio="2 / 1"
          indicator="dots"
          autoPlayMs={5000}
          slides={slides.slice(0, 3)}
          className="border border-line"
        />
      </div>

      {/* 배너 전체보기 바텀시트 */}
      <BottomSheet
        open={allOpen}
        onClose={() => setAllOpen(false)}
        title={`전체 배너 (${MAIN_BANNERS.length})`}
      >
        <div className="-mx-5 divide-y divide-line border-t border-line">
          {MAIN_BANNERS.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => {
                setAllOpen(false);
                setToastMsg(`'${b.title.replace("\n", " ")}' 기획전으로 이동합니다.`);
              }}
              className="block w-full cursor-pointer text-left transition-[filter] duration-150 active:brightness-95"
            >
              <div className="aspect-[2.2/1] w-full">
                <VectorArtwork
                  bg={b.bg}
                  badgeBg={b.badgeBg}
                  badgeText={b.badgeText}
                  title={b.title}
                  sub={b.sub}
                  illustration={b.illustration}
                />
              </div>
            </button>
          ))}
        </div>
      </BottomSheet>

      <Toast
        open={toastMsg !== null}
        onClose={() => setToastMsg(null)}
        variant="default"
        message={toastMsg ?? ""}
      />
    </div>
  );
}
