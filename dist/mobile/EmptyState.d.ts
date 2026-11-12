import type { ReactNode } from "react";
export type EmptyStateProps = {
    /** 상단 라인 아이콘 슬롯 (생략 시 기본 원형 안내 아이콘 노출) */
    icon?: ReactNode;
    title: ReactNode;
    description?: ReactNode;
    /** 하단 CTA 버튼 슬롯 (예: `<Button size="sm" variant="secondary">상품 둘러보기</Button>`) */
    action?: ReactNode;
    /** 리스트 내부 등에 좁게 넣을 때 여백 축소 */
    compact?: boolean;
    className?: string;
};
/**
 * 검색 결과 없음 · 빈 장바구니 · 내역 없음 안내용 미니멀 `EmptyState`.
 */
export declare function EmptyState({ icon, title, description, action, compact, className, }: EmptyStateProps): import("react").JSX.Element;
