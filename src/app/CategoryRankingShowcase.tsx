"use client";

import { useState } from "react";
import {
  CategoryRanking,
  Snackbar,
  Toast,
  type RankingCategoryTab,
} from "../mobile";

function DrinkThumb({
  bg,
  accent,
  code,
  shape = "bottle",
}: {
  bg: string;
  accent: string;
  code: string;
  shape?: "bottle" | "wine" | "can";
}) {
  return (
    <div
      style={{ backgroundColor: bg }}
      className="flex size-full items-center justify-center p-2"
    >
      <svg aria-hidden="true" viewBox="0 0 72 72" className="size-4/5">
        {shape === "bottle" && (
          <>
            <path
              d="M30 8h12v6l-1.5 7c5 3 8.5 7.5 8.5 13.5v25.5a4 4 0 0 1-4 4H27a4 4 0 0 1-4-4V34.5c0-6 3.5-10.5 8.5-13.5L30 14V8Z"
              fill="#FFFFFF"
              stroke="#18181B"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <rect x="29" y="6" width="14" height="4" rx="1" fill="#18181B" />
            <rect
              x="26.5"
              y="36"
              width="19"
              height="16"
              rx="1.5"
              fill={accent}
              stroke="#18181B"
              strokeWidth="1.6"
            />
          </>
        )}
        {shape === "wine" && (
          <>
            <path
              d="M31 7h10v9l5.5 10.5V60a4 4 0 0 1-4 4h-13a4 4 0 0 1-4-4V26.5L31 16V7Z"
              fill="#FFFFFF"
              stroke="#18181B"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <rect x="30" y="5" width="12" height="4" rx="1" fill="#18181B" />
            <rect
              x="28"
              y="34"
              width="16"
              height="18"
              rx="1.5"
              fill={accent}
              stroke="#18181B"
              strokeWidth="1.6"
            />
          </>
        )}
        {shape === "can" && (
          <>
            <rect
              x="22"
              y="12"
              width="28"
              height="50"
              rx="5"
              fill="#FFFFFF"
              stroke="#18181B"
              strokeWidth="2"
            />
            <line x1="24" y1="17" x2="48" y2="17" stroke="#18181B" strokeWidth="1.8" />
            <rect
              x="22"
              y="26"
              width="28"
              height="22"
              fill={accent}
              stroke="#18181B"
              strokeWidth="1.6"
            />
          </>
        )}
        <text
          x="36"
          y={shape === "can" ? "39" : "46"}
          textAnchor="middle"
          fontSize="5"
          fontWeight="800"
          fill="#18181B"
        >
          {code}
        </text>
      </svg>
    </div>
  );
}

type RawItem = {
  id: string;
  name: string;
  subtitle: string;
  salesLabel: string;
  price: number;
  originalPrice?: number;
  rankChange?: number | "NEW";
  bg: string;
  accent: string;
  code: string;
  shape?: "bottle" | "wine" | "can";
};

const RAW_CATEGORIES: readonly {
  key: string;
  label: string;
  items: readonly RawItem[];
}[] = [
  {
    key: "all",
    label: "전체",
    items: [
      { id: "a1", name: "산토리 가쿠빈 위스키 700ml", subtitle: "재패니즈 위스키 · 40%", salesLabel: "주간 1,420병", price: 39800, originalPrice: 46000, rankChange: 0, bg: "#FEF3C7", accent: "#FDE047", code: "KAKU" },
      { id: "a2", name: "발베니 12년 더블우드 싱글몰트", subtitle: "스페이사이드 · 700ml", salesLabel: "주간 980병", price: 109000, originalPrice: 125000, rankChange: 2, bg: "#F4F4F5", accent: "#FDBA74", code: "12 YR" },
      { id: "a3", name: "모엣 샹동 임페리얼 브뤼 샴페인", subtitle: "프랑스 샹파뉴 · 750ml", salesLabel: "주간 815병", price: 74900, originalPrice: 89000, rankChange: 1, bg: "#ECFCCB", accent: "#BEF264", code: "MOET", shape: "wine" },
      { id: "a4", name: "산토리 히비키 재패니즈 하모니", subtitle: "블렌디드 · 700ml", salesLabel: "주간 640병", price: 136000, originalPrice: 160000, rankChange: "NEW", bg: "#FFEDD5", accent: "#FDBA74", code: "HIBIKI" },
      { id: "a5", name: "아사히 수퍼드라이 생맥주캔 24입", subtitle: "라거 · 340ml × 24캔", salesLabel: "주간 590박스", price: 54900, originalPrice: 64000, rankChange: -1, bg: "#E0F2FE", accent: "#7DD3FC", code: "DRY", shape: "can" },
    ],
  },
  {
    key: "whisky",
    label: "위스키",
    items: [
      { id: "w1", name: "산토리 가쿠빈 위스키 700ml", subtitle: "재패니즈 위스키 · 40%", salesLabel: "주간 1,420병", price: 39800, originalPrice: 46000, rankChange: 0, bg: "#FEF3C7", accent: "#FDE047", code: "KAKU" },
      { id: "w2", name: "발베니 12년 더블우드 싱글몰트", subtitle: "스페이사이드 · 700ml", salesLabel: "주간 980병", price: 109000, originalPrice: 125000, rankChange: 1, bg: "#F4F4F5", accent: "#FDBA74", code: "12 YR" },
      { id: "w3", name: "맥캘란 12년 셰리 오크 캐스크", subtitle: "싱글몰트 · 700ml", salesLabel: "주간 610병", price: 148000, originalPrice: 168000, rankChange: -1, bg: "#FEE2E2", accent: "#FCA5A5", code: "SHERRY" },
      { id: "w4", name: "조니워커 블루라벨 750ml", subtitle: "블렌디드 스카치 · 40%", salesLabel: "주간 410병", price: 259000, originalPrice: 295000, rankChange: 2, bg: "#DBEAFE", accent: "#93C5FD", code: "BLUE" },
      { id: "w5", name: "글렌피딕 15년 솔레라 리저브", subtitle: "싱글몰트 · 700ml", salesLabel: "주간 385병", price: 112000, rankChange: "NEW", bg: "#EDE9FE", accent: "#C4B5FD", code: "15 YR" },
    ],
  },
  {
    key: "wine",
    label: "와인·샴페인",
    items: [
      { id: "v1", name: "모엣 샹동 임페리얼 브뤼 샴페인", subtitle: "프랑스 · 스파클링", salesLabel: "주간 815병", price: 74900, originalPrice: 89000, rankChange: 0, bg: "#ECFCCB", accent: "#BEF264", code: "MOET", shape: "wine" },
      { id: "v2", name: "클라우디 베이 소비뇽 블랑", subtitle: "뉴질랜드 말보로 · 화이트", salesLabel: "주간 690병", price: 43900, originalPrice: 52000, rankChange: 1, bg: "#E0F2FE", accent: "#BAE6FD", code: "CLOUDY", shape: "wine" },
      { id: "v3", name: "1865 셀렉티드 빈야드 카베르네", subtitle: "칠레 마이포밸리 · 레드", salesLabel: "주간 540병", price: 32900, originalPrice: 42000, rankChange: -1, bg: "#FFE4E6", accent: "#FDA4AF", code: "1865", shape: "wine" },
      { id: "v4", name: "돔 페리뇽 빈티지 브뤼 750ml", subtitle: "프랑스 샹파뉴 · 샴페인", salesLabel: "주간 220병", price: 349000, rankChange: "NEW", bg: "#FEF3C7", accent: "#FDE68A", code: "DOM", shape: "wine" },
    ],
  },
  {
    key: "sake",
    label: "사케·전통주",
    items: [
      { id: "s1", name: "닷사이 23 준마이다이긴조 720ml", subtitle: "일본 야마구치 · 16%", salesLabel: "주간 520병", price: 98000, originalPrice: 115000, rankChange: 0, bg: "#F4F4F5", accent: "#CBD5E1", code: "DASSAI", shape: "wine" },
      { id: "s2", name: "화요 41도 오크 숙성 증류식 소주", subtitle: "국내산 쌀 100% · 375ml", salesLabel: "주간 470병", price: 38900, originalPrice: 43000, rankChange: 2, bg: "#FFEDD5", accent: "#FDBA74", code: "HWAYO" },
      { id: "s3", name: "쿠보타 만쥬 준마이다이긴조", subtitle: "일본 니가타 · 720ml", salesLabel: "주간 330병", price: 84000, originalPrice: 96000, rankChange: -1, bg: "#FEF3C7", accent: "#FDE047", code: "MANJU", shape: "wine" },
      { id: "s4", name: "일품진로 오크25 리미티드", subtitle: "숙성 증류주 · 375ml", salesLabel: "주간 295병", price: 22900, rankChange: "NEW", bg: "#EDE9FE", accent: "#DDD6FE", code: "OAK25" },
    ],
  },
  {
    key: "beer",
    label: "맥주·하이볼",
    items: [
      { id: "b1", name: "아사히 수퍼드라이 생맥주캔 24입", subtitle: "라거 · 340ml × 24캔", salesLabel: "주간 590박스", price: 54900, originalPrice: 64000, rankChange: 0, bg: "#E0F2FE", accent: "#7DD3FC", code: "DRY", shape: "can" },
      { id: "b2", name: "짐빔 하이볼 레몬 350ml 12캔", subtitle: "RTD 하이볼 · 5%", salesLabel: "주간 480팩", price: 28900, originalPrice: 34800, rankChange: 1, bg: "#FEF9C3", accent: "#FDE047", code: "BEAM", shape: "can" },
      { id: "b3", name: "기네스 드래프트 스타우트 440ml 8캔", subtitle: "아일랜드 흑맥주 · 4.2%", salesLabel: "주간 360팩", price: 21900, originalPrice: 26000, rankChange: -1, bg: "#F4F4F5", accent: "#A1A1AA", code: "STOUT", shape: "can" },
      { id: "b4", name: "산토리 가쿠 하이볼 캔 355ml 6입", subtitle: "재패니즈 하이볼 · 7%", salesLabel: "주간 310팩", price: 23400, rankChange: "NEW", bg: "#FEF3C7", accent: "#FBBF24", code: "HIGH", shape: "can" },
    ],
  },
  {
    key: "liqueur",
    label: "리큐르·진",
    items: [
      { id: "l1", name: "헨드릭스 진 오리지널 700ml", subtitle: "스코틀랜드 진 · 44%", salesLabel: "주간 340병", price: 52900, originalPrice: 62000, rankChange: 1, bg: "#DCFCE7", accent: "#86EFAC", code: "GIN" },
      { id: "l2", name: "피치트리 오리지널 복숭아 리큐르", subtitle: "네덜란드 · 700ml · 20%", salesLabel: "주간 310병", price: 24900, originalPrice: 29000, rankChange: -1, bg: "#FFEDD5", accent: "#FDBA74", code: "PEACH" },
      { id: "l3", name: "예거마이스터 허브 리큐르 700ml", subtitle: "독일 · 35%", salesLabel: "주간 280병", price: 33900, originalPrice: 39000, rankChange: 0, bg: "#ECFCCB", accent: "#A3E635", code: "JAGER" },
      { id: "l4", name: "봄베이 사파이어 런던 드라이 진", subtitle: "영국 · 750ml · 47%", salesLabel: "주간 245병", price: 36900, rankChange: "NEW", bg: "#DBEAFE", accent: "#60A5FA", code: "BOMBAY" },
    ],
  },
];

export function CategoryRankingShowcase() {
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [snack, setSnack] = useState<{ open: boolean; msg: string; seq: number }>({
    open: false,
    msg: "",
    seq: 0,
  });

  const categories: RankingCategoryTab[] = RAW_CATEGORIES.map((cat) => ({
    key: cat.key,
    label: cat.label,
    moreHref: `#ranking-${cat.key}`,
    onMoreClick: () => setToastMsg(`'${cat.label}' 판매 순위 전체 목록으로 이동합니다.`),
    items: cat.items.map((item, i) => ({
      id: item.id,
      rank: i + 1,
      rankChange: item.rankChange,
      name: item.name,
      subtitle: item.subtitle,
      salesLabel: item.salesLabel,
      price: item.price,
      originalPrice: item.originalPrice,
      thumbnail: (
        <DrinkThumb
          bg={item.bg}
          accent={item.accent}
          code={item.code}
          shape={item.shape}
        />
      ),
      onClick: () => setToastMsg(`'${item.name}' 상세 화면으로 이동합니다.`),
      onCartClick: () =>
        setSnack((prev) => ({
          open: true,
          msg: `${item.name} 상품을 장바구니에 담았습니다.`,
          seq: prev.seq + 1,
        })),
    })),
  }));

  return (
    <div>
      <CategoryRanking
        title="실시간 카테고리 판매 랭킹"
        categories={categories}
      />

      <Snackbar
        open={snack.open}
        triggerKey={snack.seq}
        onClose={() => setSnack((prev) => ({ ...prev, open: false }))}
        message={snack.msg}
        actionLabel="장바구니"
        onAction={() => setToastMsg("장바구니로 이동합니다.")}
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
