import { type ReactNode } from "react";
export type DialogProps = {
    open: boolean;
    onClose: () => void;
    title: ReactNode;
    description?: ReactNode;
    children?: ReactNode;
    /** 확인(우측 주 액션) 버튼 문구 (기본 `"확인"`) */
    confirmLabel?: string;
    /** 취소(좌측 보조 액션) 버튼 문구 — 생략하면 1버튼 알림(Alert) 모달로 동작 */
    cancelLabel?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    /** 주 액션 버튼 스타일 (`"danger"`는 주문 취소·계정 삭제 등 파괴적 작업용) */
    confirmVariant?: "primary" | "danger";
    loading?: boolean;
    /** 백드롭 클릭 시 닫기 허용 여부 (기본 `true`) */
    closeOnBackdrop?: boolean;
    className?: string;
};
/**
 * 모바일 중앙 확인·경고 모달 (`Dialog` — `AlertDialog` / `ConfirmDialog` 겸용).
 * - `BottomSheet`와 일관된 `backdrop-blur-[3px]` 디밍 애니메이션 + 스프링 팝인/아웃
 * - `cancelLabel` 유무에 따라 1버튼(알럿) / 2버튼(확인·취소) 레이아웃 자동 전환
 */
export declare function Dialog({ open, onClose, title, description, children, confirmLabel, cancelLabel, onConfirm, onCancel, confirmVariant, loading, closeOnBackdrop, className, }: DialogProps): ReactNode;
