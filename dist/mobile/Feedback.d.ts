import { type ReactNode } from "react";
export type ToastVariant = "default" | "success" | "danger";
export type ToastProps = {
    open: boolean;
    onClose: () => void;
    message: ReactNode;
    variant?: ToastVariant;
    /** 자동 닫힘 시간(ms). 0 이하이면 자동 닫힘 해제 (기본 2200ms) */
    duration?: number;
    /** 연속 호출 시 타이머·애니메이션 재시작용 키 */
    triggerKey?: number | string;
    className?: string;
};
/**
 * 모바일 상단 플로팅 토스트 메시지 (버튼 없는 가벼운 상태 알림 캡슐).
 */
export declare function Toast({ open, onClose, message, variant, duration, triggerKey, className, }: ToastProps): ReactNode;
export type SnackbarProps = {
    open: boolean;
    onClose: () => void;
    message: ReactNode;
    /** 우측 보조 액션 문구 (예: "장바구니 보기", "실행 취소") */
    actionLabel?: string;
    onAction?: () => void;
    /** 자동 닫힘 시간(ms). 0 이하이면 자동 닫힘 해제 (기본 3200ms) */
    duration?: number;
    /** 연속 담기 시 타이머 리셋 및 재진입 모션 키 */
    triggerKey?: number | string;
    className?: string;
};
/**
 * 모바일 하단 플로팅 스낵바 (장바구니 담기·실행 취소 등 액션 동반 하단 바).
 */
export declare function Snackbar({ open, onClose, message, actionLabel, onAction, duration, triggerKey, className, }: SnackbarProps): ReactNode;
