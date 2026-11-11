"use client";

import { useState } from "react";
import { Button, Snackbar, Toast, type ToastVariant } from "../mobile";

export function FeedbackShowcase() {
  const [toastState, setToastState] = useState<{
    open: boolean;
    variant: ToastVariant;
    msg: string;
    seq: number;
  }>({ open: false, variant: "default", msg: "", seq: 0 });

  const [snackState, setSnackState] = useState<{ open: boolean; seq: number }>({
    open: false,
    seq: 0,
  });

  function showToast(variant: ToastVariant, msg: string) {
    setToastState((prev) => ({ open: true, variant, msg, seq: prev.seq + 1 }));
  }

  return (
    <div className="space-y-2.5 rounded-card border border-line bg-surface p-4">
      <div className="grid grid-cols-2 gap-2">
        <Button
          size="sm"
          variant="secondary"
          onClick={() => showToast("default", "상품 공유 링크가 복사되었습니다.")}
        >
          기본 토스트 (상단)
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => showToast("success", "성인인증이 완료되었습니다.")}
        >
          성공 토스트 (체크)
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => showToast("danger", "1인 최대 구매 수량을 초과했습니다.")}
        >
          주의 토스트 (경고)
        </Button>
        <Button
          size="sm"
          variant="primary"
          onClick={() => setSnackState((prev) => ({ open: true, seq: prev.seq + 1 }))}
        >
          하단 스낵바 열기
        </Button>
      </div>

      <Toast
        open={toastState.open}
        triggerKey={toastState.seq}
        variant={toastState.variant}
        message={toastState.msg}
        onClose={() => setToastState((prev) => ({ ...prev, open: false }))}
      />

      <Snackbar
        open={snackState.open}
        triggerKey={snackState.seq}
        message="픽업 매장이 강남본점으로 변경되었습니다."
        actionLabel="실행 취소"
        onAction={() => showToast("default", "이전 매장으로 되돌렸습니다.")}
        onClose={() => setSnackState((prev) => ({ ...prev, open: false }))}
      />
    </div>
  );
}
