"use client";

import { useState } from "react";
import { BottomSheet, Button, RadioGroup } from "../mobile";

type SheetDemoKey = "full" | "noClose" | "noTitle" | "bare" | null;

export function BottomSheetShowcase() {
  const [active, setActive] = useState<SheetDemoKey>(null);
  const [store, setStore] = useState("gangnam");

  return (
    <div className="rounded-card border border-line bg-surface p-4">
      <div className="grid grid-cols-2 gap-2">
        <Button size="sm" variant="secondary" onClick={() => setActive("full")}>
          타이틀 O · 닫기 O · 버튼 O
        </Button>
        <Button size="sm" variant="secondary" onClick={() => setActive("noClose")}>
          타이틀 O · 닫기 X · 버튼 O
        </Button>
        <Button size="sm" variant="secondary" onClick={() => setActive("noTitle")}>
          타이틀 X · 닫기 O · 버튼 X
        </Button>
        <Button size="sm" variant="secondary" onClick={() => setActive("bare")}>
          타이틀 X · 닫기 X · 버튼 X
        </Button>
      </div>

      {/* 1) 타이틀 O + 우측 닫기 O + 하단 버튼 O */}
      <BottomSheet
        open={active === "full"}
        onClose={() => setActive(null)}
        title="픽업 매장 선택"
        showClose
        footer={
          <Button fullWidth size="lg" onClick={() => setActive(null)}>
            이 매장으로 선택 완료
          </Button>
        }
      >
        <RadioGroup
          name="sheetStore"
          value={store}
          onChange={setStore}
          options={[
            { value: "gangnam", label: "시크릿오더 강남본점", description: "오늘 바로 픽업 가능 · 재고 8병" },
            { value: "seongsu", label: "시크릿오더 성수점", description: "오늘 바로 픽업 가능 · 재고 3병" },
            { value: "yeouido", label: "시크릿오더 여의도점", description: "내일 오후 2시 이후 픽업 가능" },
          ]}
        />
      </BottomSheet>

      {/* 2) 타이틀 O + 우측 닫기 X + 하단 버튼 O */}
      <BottomSheet
        open={active === "noClose"}
        onClose={() => setActive(null)}
        title="주류 대면 수령 확인"
        showClose={false}
        footer={
          <div className="grid grid-cols-2 gap-2">
            <Button variant="secondary" fullWidth onClick={() => setActive(null)}>
              취소
            </Button>
            <Button variant="primary" fullWidth onClick={() => setActive(null)}>
              확인했습니다
            </Button>
          </div>
        }
      >
        <p className="text-body text-ink-secondary">
          주류 스마트오더 상품은 매장 방문 시 본인 명의 신분증 확인 후 수령하실 수 있습니다.
        </p>
      </BottomSheet>

      {/* 3) 타이틀 X + 우측 닫기 O + 하단 버튼 X */}
      <BottomSheet
        open={active === "noTitle"}
        onClose={() => setActive(null)}
        showClose
        aria-label="테이스팅 노트 안내"
      >
        <div className="space-y-2">
          <p className="text-section font-bold text-ink">히비키 하모니 테이스팅 노트</p>
          <p className="text-body-sm text-ink-secondary">
            오렌지 껍질과 화이트 초콜릿의 은은한 단향 뒤에 미즈나라 오크 특유의 긴 여운이 이어집니다.
          </p>
        </div>
      </BottomSheet>

      {/* 4) 타이틀 X + 우측 닫기 X + 하단 버튼 X */}
      <BottomSheet
        open={active === "bare"}
        onClose={() => setActive(null)}
        showClose={false}
        aria-label="빠른 작업 선택"
      >
        <div className="divide-y divide-line">
          {["공유 링크 복사", "관심 주류함에 담기", "재입고 알림 받기"].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setActive(null)}
              className="pressable flex h-12 w-full cursor-pointer items-center text-left text-body font-medium text-ink hover:text-primary"
            >
              {item}
            </button>
          ))}
        </div>
      </BottomSheet>
    </div>
  );
}
