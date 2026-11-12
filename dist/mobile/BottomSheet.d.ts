import { type ReactNode } from "react";
export type BottomSheetProps = {
    open: boolean;
    onClose: () => void;
    /** 상단 타이틀 (생략하면 타이틀 없는 시트) */
    title?: ReactNode;
    /** 상단 우측 닫기(×) 버튼 노출 여부 (기본 true) */
    showClose?: boolean;
    /** 하단 고정 액션 버튼 영역 (생략하면 하단 버튼 없는 시트) */
    footer?: ReactNode;
    /** title이 없을 때 스크린리더용 라벨 */
    "aria-label"?: string;
    children: ReactNode;
    className?: string;
};
/**
 * 모바일 바텀시트 (`rounded-t-sheet` 20px).
 * - 배경 디밍이 서서히 어두워지고(420ms), 시트 본체가 아래에서 부드럽게 올라옴(440ms)
 * - 닫힐 때도 배경과 시트가 동시에 천천히 내려간 뒤(340ms) 언마운트됨
 * - `title` 유/무 × `showClose` 유/무 × `footer` 유/무 조합 모두 지원
 */
export declare function BottomSheet({ open, onClose, title, showClose, footer, "aria-label": ariaLabel, children, className, }: BottomSheetProps): ReactNode;
