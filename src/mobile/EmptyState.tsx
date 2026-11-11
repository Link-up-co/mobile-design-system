import clsx from "clsx";
import type { ReactNode } from "react";
import { AlertCircleIcon } from "./icons";

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
export function EmptyState({
  icon,
  title,
  description,
  action,
  compact = false,
  className,
}: EmptyStateProps) {
  return (
    <div
      data-empty-state=""
      className={clsx(
        "flex w-full flex-col items-center justify-center px-6 text-center",
        compact ? "py-8" : "py-14",
        className
      )}
    >
      <div className="mb-3 inline-flex size-12 items-center justify-center rounded-full bg-surface-subtle text-ink-muted [&_svg]:size-6">
        {icon ?? <AlertCircleIcon />}
      </div>
      <p className="break-keep text-body font-bold tracking-tight text-ink">{title}</p>
      {description && (
        <p className="mt-1 max-w-[260px] break-keep text-body-sm leading-[1.45] text-ink-muted">
          {description}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
