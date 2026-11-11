"use client";

import { useState } from "react";
import { Button, FixedBottomButton, HeartIcon, Toast } from "../mobile";

export function BottomActionShowcase() {
  const [wished, setWished] = useState(false);
  const [liveFixed, setLiveFixed] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  return (
    <div className="space-y-5">
      {/* 1) 기본 단일 풀폭 블록 버튼 */}
      <div className="space-y-2">
        <span className="block text-body-sm font-semibold text-ink-secondary">
          단일 블록 CTA (주문 · 신청 · 다음 단계)
        </span>
        <div className="-mx-5 border-b border-line">
          <FixedBottomButton
            position="static"
            onClick={() => setToastMsg("픽업 주문서 화면으로 이동합니다.")}
          >
            42,800원 픽업 주문하기
          </FixedBottomButton>
        </div>
      </div>

      {/* 2) 상품 상세형: 좌측 찜 + 장바구니 + 바로 픽업 주문 */}
      <div className="space-y-2">
        <span className="block text-body-sm font-semibold text-ink-secondary">
          상품 상세 조합 (찜 + 보조 버튼 + 주 블록 버튼)
        </span>
        <div className="-mx-5 border-b border-line">
          <FixedBottomButton
            position="static"
            leading={
              <button
                type="button"
                aria-label={wished ? "찜 해제" : "찜하기"}
                aria-pressed={wished}
                onClick={() => setWished((w) => !w)}
                className={`pressable inline-flex size-[52px] cursor-pointer items-center justify-center rounded-control border border-line bg-surface outline-transparent hover:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-primary ${
                  wished ? "text-danger" : "text-ink-secondary"
                }`}
              >
                <HeartIcon filled={wished} className="size-[22px]" />
              </button>
            }
            secondaryAction={{
              label: "장바구니",
              variant: "secondary",
              onClick: () => setToastMsg("장바구니에 상품을 담았습니다."),
            }}
            onClick={() => setToastMsg("바로 픽업 주문을 진행합니다.")}
          >
            바로 픽업 주문
          </FixedBottomButton>
        </div>
      </div>

      {/* 3) 상단 금액 요약 슬롯 결합형 */}
      <div className="space-y-2">
        <span className="block text-body-sm font-semibold text-ink-secondary">
          금액 요약 포함 블록 버튼 (`topSlot`)
        </span>
        <div className="-mx-5 border-b border-line">
          <FixedBottomButton
            position="static"
            topSlot={
              <div className="flex items-center justify-between text-body-sm">
                <span className="text-ink-secondary">총 2개 · 강남본점 당일 픽업</span>
                <strong className="text-section font-bold tabular-nums text-primary">
                  245,000원
                </strong>
              </div>
            }
            onClick={() => setToastMsg("245,000원 결제를 요청합니다.")}
          >
            결제하기
          </FixedBottomButton>
        </div>
      </div>

      {/* 실제 뷰포트 하단 고정(position="fixed") 라이브 토글 */}
      <div className="pt-1">
        <Button
          size="sm"
          variant={liveFixed ? "primary" : "soft"}
          fullWidth
          onClick={() => setLiveFixed((v) => !v)}
        >
          {liveFixed ? "화면 하단 고정 미리보기 닫기" : "실제 화면 하단 고정(Fixed) 미리보기 켜기"}
        </Button>
      </div>

      {liveFixed && (
        <FixedBottomButton
          position="fixed"
          reserveSpace={false}
          secondaryAction={{
            label: "닫기",
            variant: "secondary",
            onClick: () => setLiveFixed(false),
          }}
          onClick={() => setToastMsg("하단 고정 블록 버튼 클릭됨")}
        >
          136,000원 픽업 주문하기
        </FixedBottomButton>
      )}

      <Toast
        open={toastMsg !== null}
        onClose={() => setToastMsg(null)}
        variant="default"
        message={toastMsg ?? ""}
      />
    </div>
  );
}
