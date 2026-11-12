import type { ButtonHTMLAttributes, ReactNode } from "react";
import { type ButtonVariant } from "./Button.js";
export type FixedBottomButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
    /** 주 블록 버튼 문구 */
    children: ReactNode;
    variant?: ButtonVariant;
    loading?: boolean;
    icon?: ReactNode;
    /** 좌측 보조 아이콘 슬롯 (예: 상품 상세 찜하기 버튼) */
    leading?: ReactNode;
    /** 좌측 보조 블록 버튼 (예: "장바구니", "이전") */
    secondaryAction?: {
        label: ReactNode;
        onClick?: () => void;
        variant?: ButtonVariant;
        disabled?: boolean;
        loading?: boolean;
    };
    /** 버튼 상단 보조 요약 영역 (예: 총 결제예정금액 한 줄 요약) */
    topSlot?: ReactNode;
    /** `"fixed"`: 뷰포트 하단 고정(기본) · `"sticky"`: 스크롤 컨테이너 하단 점착 · `"static"`: 문서 흐름 내 배치 */
    position?: "fixed" | "sticky" | "static";
    /** `position="fixed"`일 때 본문 하단이 가려지지 않도록 동일 높이 스페이서를 함께 렌더링할지 여부 (기본 `true`) */
    reserveSpace?: boolean;
    /** 모바일 컨테이너 최대 폭 클래스 (기본 `"max-w-[412px]"`) */
    maxWidthClassName?: string;
    className?: string;
};
/**
 * 모바일 하단 고정 블록 버튼 (`52px` lg 블록 CTA + Safe Area 대응).
 * - 단일 블록 버튼, `[보조 버튼 + 주 버튼]` 2분할, `[좌측 찜 아이콘 + 주 버튼]`, 상단 금액 요약 슬롯 모두 지원
 * - `position="fixed"` 시 본문 가림 방지 스페이서(`reserveSpace`) 자동 확보
 */
export declare function FixedBottomButton({ children, variant, loading, disabled, icon, leading, secondaryAction, topSlot, position, reserveSpace, maxWidthClassName, className, ...buttonRest }: FixedBottomButtonProps): import("react").JSX.Element;
