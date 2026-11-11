"use client";

import { useState } from "react";
import { ProductCard } from "../mobile";

function BottleIllustration({
  tone,
  accent,
  code,
}: {
  tone: string;
  accent: string;
  code: string;
}) {
  return (
    <div
      style={{ backgroundColor: tone }}
      className="flex size-full items-center justify-center p-3 transition-transform duration-300 ease-out group-hover:scale-[1.04]"
    >
      <svg aria-hidden="true" viewBox="0 0 80 80" className="size-4/5">
        {/* 보틀 실루엣 (깔끔한 블랙 라인 일러스트) */}
        <path
          d="M34 10h12v6l-1.5 8c5.5 3.5 9.5 8.5 9.5 15v27a4 4 0 0 1-4 4H30a4 4 0 0 1-4-4V39c0-6.5 4-11.5 9.5-15L34 16v-6Z"
          fill="#FFFFFF"
          stroke="#18181B"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <rect x="33" y="8" width="14" height="4.5" rx="1.2" fill="#18181B" />
        <rect
          x="29.5"
          y="40"
          width="21"
          height="18"
          rx="1.5"
          fill={accent}
          stroke="#18181B"
          strokeWidth="1.6"
        />
        <text
          x="40"
          y="51"
          textAnchor="middle"
          fontSize="5.2"
          fontWeight="800"
          fill="#18181B"
        >
          {code}
        </text>
      </svg>
    </div>
  );
}

const SAMPLE_PRODUCTS = [
  {
    id: "hibiki",
    name: "산토리 히비키 재패니즈 하모니",
    subtitle: "블렌디드 위스키 · 700ml · 43%",
    price: 136000,
    originalPrice: 160000,
    wished: true,
    soldOut: false,
    tone: "#FEF3C7",
    accent: "#FDE68A",
    code: "HIBIKI",
  },
  {
    id: "balvenie",
    name: "발베니 12년 더블우드 싱글몰트",
    subtitle: "싱글몰트 스카치 · 700ml · 40%",
    price: 109000,
    originalPrice: 125000,
    wished: false,
    soldOut: false,
    tone: "#F4F4F5",
    accent: "#FDBA74",
    code: "12 YR",
  },
  {
    id: "macallan",
    name: "맥캘란 12년 셰리 오크 캐스크",
    subtitle: "싱글몰트 스카치 · 700ml · 40%",
    price: 148000,
    originalPrice: undefined,
    wished: false,
    soldOut: false,
    tone: "#FEE2E2",
    accent: "#FCA5A5",
    code: "SHERRY",
  },
  {
    id: "yamazaki",
    name: "산토리 야마자키 12년 한정 수량",
    subtitle: "싱글몰트 재패니즈 · 700ml · 43%",
    price: 289000,
    originalPrice: 320000,
    wished: false,
    soldOut: true,
    tone: "#E0E7FF",
    accent: "#C7D2FE",
    code: "1923",
  },
] as const;

export function ProductCardShowcase() {
  const [cartNotice, setCartNotice] = useState<string | null>(null);

  function addCart(name: string) {
    setCartNotice(`'${name}' 상품을 장바구니에 담았습니다.`);
  }

  return (
    <div className="space-y-6">
      {cartNotice && (
        <div className="rounded-control bg-ink px-3.5 py-2.5 text-body-sm font-medium text-white">
          {cartNotice}
        </div>
      )}

      {/* 1) 1/2 카드 (2열 그리드) */}
      <div className="space-y-2.5">
        <span className="block text-body-sm font-semibold text-ink-secondary">1/2 카드 (2열 Grid)</span>
        <div className="grid grid-cols-2 gap-x-3 gap-y-5">
          {SAMPLE_PRODUCTS.map((p) => (
            <ProductCard
              key={p.id}
              variant="grid"
              name={p.name}
              subtitle={p.subtitle}
              price={p.price}
              originalPrice={p.originalPrice}
              soldOut={p.soldOut}
              defaultWished={p.wished}
              thumbnail={<BottleIllustration tone={p.tone} accent={p.accent} code={p.code} />}
              onClick={() => {}}
              onWishToggle={() => {}}
              onCartClick={() => addCart(p.name)}
            />
          ))}
        </div>
      </div>

      {/* 2) 가로 전체 카드 (좌우 여백 없이 스크린 풀폭 · 1px 구분선 플랫 리스트) */}
      <div className="space-y-2">
        <span className="block text-body-sm font-semibold text-ink-secondary">가로 전체 카드 (스크린 풀폭 · 1px 구분선)</span>
        <div className="-mx-5 divide-y divide-line border-y border-line">
          {SAMPLE_PRODUCTS.slice(0, 3).map((p) => (
            <ProductCard
              key={p.id}
              variant="list"
              name={p.name}
              subtitle={p.subtitle}
              price={p.price}
              originalPrice={p.originalPrice}
              soldOut={p.soldOut}
              defaultWished={p.wished}
              thumbnail={<BottleIllustration tone={p.tone} accent={p.accent} code={p.code} />}
              onClick={() => {}}
              onWishToggle={() => {}}
              onCartClick={() => addCart(p.name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
