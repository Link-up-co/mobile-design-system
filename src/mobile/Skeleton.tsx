import clsx from "clsx";

export type SkeletonProps = {
  /** 형태 (`"rect"`: 기본 모서리 8px · `"card"`: 12px · `"circle"`: 원형 · `"text"`: 텍스트 줄) */
  variant?: "rect" | "card" | "circle" | "text";
  className?: string;
};

/**
 * 데이터 패칭 중 레이아웃 흔들림(CLS)을 막는 쉬머 `Skeleton`.
 */
export function Skeleton({ variant = "rect", className }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      data-skeleton=""
      className={clsx(
        "relative overflow-hidden bg-zinc-200/75",
        variant === "rect" && "rounded-control",
        variant === "card" && "rounded-card",
        variant === "circle" && "rounded-full",
        variant === "text" && "h-3.5 rounded-[4px]",
        className
      )}
    >
      <div
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.62) 50%, rgba(255,255,255,0) 100%)",
          animation: "mds-shimmer 1.5s infinite ease-in-out",
        }}
        className="absolute inset-0 motion-reduce:hidden"
      />
    </div>
  );
}

/**
 * `ProductCard` (`grid` / `list`) 규격과 1:1로 일치하는 스켈레톤 프리셋.
 */
export function ProductCardSkeleton({
  variant = "grid",
  className,
}: {
  variant?: "grid" | "list";
  className?: string;
}) {
  if (variant === "list") {
    return (
      <div
        aria-hidden="true"
        data-product-skeleton="list"
        className={clsx("flex items-center gap-3.5 py-3.5", className)}
      >
        <Skeleton variant="card" className="size-24 shrink-0" />
        <div className="min-w-0 flex-1 space-y-2">
          <Skeleton variant="text" className="w-16" />
          <Skeleton variant="text" className="w-4/5" />
          <Skeleton variant="text" className="h-5 w-28" />
        </div>
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      data-product-skeleton="grid"
      className={clsx("space-y-2.5", className)}
    >
      <Skeleton variant="card" className="aspect-square w-full" />
      <div className="space-y-1.5 px-0.5">
        <Skeleton variant="text" className="w-14" />
        <Skeleton variant="text" className="w-full" />
        <Skeleton variant="text" className="h-5 w-24" />
      </div>
    </div>
  );
}
