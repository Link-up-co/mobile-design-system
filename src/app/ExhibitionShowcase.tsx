"use client";

import { useState } from "react";
import { ExhibitionSection, Snackbar, Toast, type ExhibitionProductItem } from "../mobile";

function CaskBottleThumb({
  bg,
  labelBg,
  code,
}: {
  bg: string;
  labelBg: string;
  code: string;
}) {
  return (
    <div
      style={{ backgroundColor: bg }}
      className="flex size-full items-center justify-center p-3 transition-transform duration-300 ease-out group-hover:scale-[1.04]"
    >
      <svg aria-hidden="true" viewBox="0 0 80 80" className="size-4/5">
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
          fill={labelBg}
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

const EXHIBITION_PRODUCTS = [
  {
    id: "ex-hibiki",
    name: "산토리 히비키 재패니즈 하모니",
    subtitle: "블렌디드 · 700ml · 43%",
    price: 136000,
    originalPrice: 160000,
    tags: ["베스트", "인기"],
    defaultWished: true,
    bg: "#FEF3C7",
    labelBg: "#FDE68A",
    code: "HIBIKI",
  },
  {
    id: "ex-balvenie",
    name: "발베니 12년 더블우드 싱글몰트",
    subtitle: "싱글몰트 · 700ml · 40%",
    price: 109000,
    originalPrice: 125000,
    tags: ["추천", "행사"],
    defaultWished: false,
    bg: "#F4F4F5",
    labelBg: "#FDBA74",
    code: "12 YR",
  },
  {
    id: "ex-macallan",
    name: "맥캘란 12년 셰리 오크 캐스크",
    subtitle: "싱글몰트 · 700ml · 40%",
    price: 148000,
    originalPrice: 168000,
    tags: ["인기"],
    defaultWished: false,
    bg: "#FEE2E2",
    labelBg: "#FCA5A5",
    code: "SHERRY",
  },
  {
    id: "ex-glenmorangie",
    name: "글렌모렌지 오리지널 10년 전용잔",
    subtitle: "하이랜드 · 700ml · 40%",
    price: 68900,
    originalPrice: 82000,
    tags: ["행사", "증정"],
    defaultWished: false,
    bg: "#ECFCCB",
    labelBg: "#BEF264",
    code: "10 YR",
  },
  {
    id: "ex-lagavulin",
    name: "라가불린 16년 아일라 피트 몰트",
    subtitle: "아일라 · 700ml · 43%",
    price: 159000,
    originalPrice: undefined,
    tags: ["추천"],
    defaultWished: false,
    bg: "#DBEAFE",
    labelBg: "#93C5FD",
    code: "ISLAY",
  },
] as const;

export function ExhibitionShowcase() {
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [snack, setSnack] = useState<{ open: boolean; msg: string; seq: number }>({
    open: false,
    msg: "",
    seq: 0,
  });

  const items: ExhibitionProductItem[] = EXHIBITION_PRODUCTS.map((p) => ({
    id: p.id,
    name: p.name,
    subtitle: p.subtitle,
    price: p.price,
    originalPrice: p.originalPrice,
    tags: p.tags,
    defaultWished: p.defaultWished,
    thumbnail: <CaskBottleThumb bg={p.bg} labelBg={p.labelBg} code={p.code} />,
    onClick: () => setToastMsg(`'${p.name}' 상세 페이지로 이동합니다.`),
    onWishToggle: () => {},
    onCartClick: () =>
      setSnack((prev) => ({
        open: true,
        msg: `${p.name} 상품을 장바구니에 담았습니다.`,
        seq: prev.seq + 1,
      })),
  }));

  return (
    <div className="space-y-6">
      <ExhibitionSection
        title="퇴근길 당일 픽업 인기 위스키"
        subtitle="오후 6시 전 주문 시 가까운 매장에서 바로 수령"
        moreHref="#exhibition-whisky"
        onMoreClick={() => setToastMsg("'퇴근길 당일 픽업 인기 위스키' 전체 상품 목록으로 이동합니다.")}
        items={items}
      />

      <Snackbar
        open={snack.open}
        triggerKey={snack.seq}
        onClose={() => setSnack((prev) => ({ ...prev, open: false }))}
        message={snack.msg}
        actionLabel="장바구니"
        onAction={() => setToastMsg("장바구니 화면으로 이동합니다.")}
      />

      <Toast
        open={toastMsg !== null}
        onClose={() => setToastMsg(null)}
        variant="default"
        message={toastMsg ?? ""}
      />
    </div>
  );
}
