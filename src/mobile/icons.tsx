import clsx from "clsx";

type P = { className?: string };

/** 디자인 시스템 전체 표준 라인 아이콘 두께 */
export const ICON_STROKE_WIDTH = 1.15;

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: ICON_STROKE_WIDTH,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function CartIcon({ filled = false, className }: { filled?: boolean; className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={clsx("size-5 shrink-0", className)}>
      <path
        d="M2.5 3.5h2l2.1 9.2h8.8l1.8-6.7H5.2"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={filled ? 1.5 : ICON_STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="16" r={filled ? 1.35 : 1.1} fill="currentColor" />
      <circle cx="14.5" cy="16" r={filled ? 1.35 : 1.1} fill="currentColor" />
    </svg>
  );
}

export function SearchIcon({ filled = false, className }: { filled?: boolean; className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={clsx("size-5 shrink-0", className)}>
      <circle
        cx="9"
        cy="9"
        r="5.5"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={filled ? 1.75 : ICON_STROKE_WIDTH}
      />
      {filled && <circle cx="9" cy="9" r="2.2" fill="var(--mds-surface)" />}
      <path
        d="M13.2 13.2L17 17"
        fill="none"
        stroke="currentColor"
        strokeWidth={filled ? 2 : ICON_STROKE_WIDTH}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BackIcon({ className }: P) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={clsx("size-5 shrink-0", className)}>
      <path d="M12.5 4L6.5 10l6 6" {...stroke} />
    </svg>
  );
}

export function CloseIcon({ className }: P) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={clsx("size-5 shrink-0", className)}>
      <path d="M5 5l10 10M15 5L5 15" {...stroke} />
    </svg>
  );
}

export function ChevronDownIcon({ open, className }: { open?: boolean; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={clsx("size-4 shrink-0 transition-transform duration-200", open && "rotate-180", className)}
    >
      <path d="M5 7.5l5 5 5-5" {...stroke} />
    </svg>
  );
}

export function CheckIcon({ className }: P) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={clsx("size-4 shrink-0", className)}>
      <path d="M4.5 10.5l3.5 3.5 7.5-8" {...stroke} />
    </svg>
  );
}

export function EyeIcon({ className }: P) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={clsx("size-5 shrink-0", className)}>
      <path d="M2 10s3-5.5 8-5.5S18 10 18 10s-3 5.5-8 5.5S2 10 2 10Z" {...stroke} />
      <circle cx="10" cy="10" r="2.25" {...stroke} />
    </svg>
  );
}

export function EyeOffIcon({ className }: P) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={clsx("size-5 shrink-0", className)}>
      <path d="M3 3l14 14M8.6 8.7a2.25 2.25 0 0 0 3.1 3.1M6.1 6.2C3.8 7.6 2 10 2 10s3 5.5 8 5.5c1.6 0 3-.5 4.2-1.2M9.5 4.6C9.7 4.5 9.8 4.5 10 4.5c5 0 8 5.5 8 5.5a14.4 14.4 0 0 1-2.2 2.9" {...stroke} />
    </svg>
  );
}

export function CalendarIcon({ className }: P) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={clsx("size-4 shrink-0", className)}>
      <rect x="3" y="4.5" width="14" height="12.5" rx="2" {...stroke} />
      <path d="M3 8.5h14M6.5 2.75v3M13.5 2.75v3" {...stroke} />
    </svg>
  );
}

export function HeartIcon({ filled = false, className }: { filled?: boolean; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={clsx("size-5 shrink-0", className)}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? 1.5 : ICON_STROKE_WIDTH}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 17.3s-7-4.35-7-9.35A4.05 4.05 0 0 1 10 5.15a4.05 4.05 0 0 1 7 2.8c0 5-7 9.35-7 9.35Z" />
    </svg>
  );
}

export function HomeIcon({ filled = false, className }: { filled?: boolean; className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={clsx("size-5 shrink-0", className)}>
      <path
        d="M3 8.4L10 2.8l7 5.6v8.1a1.2 1.2 0 0 1-1.2 1.2h-3.6v-5.2H7.8v5.2H4.2A1.2 1.2 0 0 1 3 16.5V8.4Z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={filled ? 1.5 : ICON_STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CategoryIcon({ filled = false, className }: { filled?: boolean; className?: string }) {
  const fill = filled ? "currentColor" : "none";
  const sw = filled ? 1.5 : ICON_STROKE_WIDTH;
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={clsx("size-5 shrink-0", className)}>
      <rect x="3" y="3" width="5.8" height="5.8" rx="1.3" fill={fill} stroke="currentColor" strokeWidth={sw} />
      <rect x="11.2" y="3" width="5.8" height="5.8" rx="1.3" fill={fill} stroke="currentColor" strokeWidth={sw} />
      <rect x="3" y="11.2" width="5.8" height="5.8" rx="1.3" fill={fill} stroke="currentColor" strokeWidth={sw} />
      <rect x="11.2" y="11.2" width="5.8" height="5.8" rx="1.3" fill={fill} stroke="currentColor" strokeWidth={sw} />
    </svg>
  );
}

export function MapPinIcon({ filled = false, className }: { filled?: boolean; className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={clsx("size-5 shrink-0", className)}>
      <path
        d="M10 17.5s5.5-5.1 5.5-9.3a5.5 5.5 0 1 0-11 0c0 4.2 5.5 9.3 5.5 9.3Z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={filled ? 1.5 : ICON_STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="10"
        cy="8.2"
        r="1.9"
        fill={filled ? "var(--mds-surface)" : "none"}
        stroke={filled ? "var(--mds-surface)" : "currentColor"}
        strokeWidth={filled ? 1.4 : ICON_STROKE_WIDTH}
      />
    </svg>
  );
}

export function UserIcon({ filled = false, className }: { filled?: boolean; className?: string }) {
  const sw = filled ? 1.5 : ICON_STROKE_WIDTH;
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={clsx("size-5 shrink-0", className)}>
      <circle
        cx="10"
        cy="6.6"
        r="3.2"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={sw}
      />
      <path
        d="M3.8 16.8c.7-3 3.1-4.8 6.2-4.8s5.5 1.8 6.2 4.8"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={sw}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PlusIcon({ className }: P) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={clsx("size-5 shrink-0", className)}>
      <path d="M10 4v12M4 10h12" {...stroke} />
    </svg>
  );
}

export function ArrowUpIcon({ className }: P) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={clsx("size-5 shrink-0", className)}>
      <path d="M10 16V4.5M5 9.5l5-5 5 5" {...stroke} />
    </svg>
  );
}

export function AlertCircleIcon({ className }: P) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={clsx("size-5 shrink-0", className)}>
      <circle cx="10" cy="10" r="7.2" {...stroke} />
      <path d="M10 6.5v4.2" {...stroke} />
      <circle cx="10" cy="13.6" r="0.7" fill="currentColor" />
    </svg>
  );
}

export function CameraIcon({ className }: P) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={clsx("size-5 shrink-0", className)}>
      <path
        d="M3 6.8a1.5 1.5 0 0 1 1.5-1.5h2l1.1-1.6h4.8l1.1 1.6h2A1.5 1.5 0 0 1 17 6.8v7.7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 14.5V6.8Z"
        {...stroke}
      />
      <circle cx="10" cy="10.6" r="2.7" {...stroke} />
    </svg>
  );
}

export function UploadIcon({ className }: P) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={clsx("size-5 shrink-0", className)}>
      <path d="M10 13V4.2M6.5 7.7L10 4.2l3.5 3.5" {...stroke} />
      <path d="M3.5 13.5v1.8a1.2 1.2 0 0 0 1.2 1.2h10.6a1.2 1.2 0 0 0 1.2-1.2v-1.8" {...stroke} />
    </svg>
  );
}

export function FileTextIcon({ className }: P) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={clsx("size-5 shrink-0", className)}>
      <path
        d="M5.2 2.8h6.3L15.2 6.5v9.5a1.2 1.2 0 0 1-1.2 1.2H5.2A1.2 1.2 0 0 1 4 16V4a1.2 1.2 0 0 1 1.2-1.2Z"
        {...stroke}
      />
      <path d="M11.2 2.8v3.9h3.9M7 10.5h6M7 13.5h4.2" {...stroke} />
    </svg>
  );
}
