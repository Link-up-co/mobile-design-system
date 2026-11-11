import clsx from "clsx";

type P = { className?: string };
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function CartIcon({ className }: P) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={clsx("size-5 shrink-0", className)}>
      <path d="M2.5 3.5h2l2.1 9.2h8.8l1.8-6.7H5.2" {...stroke} />
      <circle cx="8" cy="16" r="1.25" fill="currentColor" />
      <circle cx="14.5" cy="16" r="1.25" fill="currentColor" />
    </svg>
  );
}

export function SearchIcon({ className }: P) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={clsx("size-5 shrink-0", className)}>
      <circle cx="9" cy="9" r="5.5" {...stroke} />
      <path d="M13.2 13.2L17 17" {...stroke} />
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
