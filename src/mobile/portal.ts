import type { ReactNode } from "react";
import { createPortal } from "react-dom";

export function resolveActiveBrand(): string | undefined {
  if (typeof document === "undefined") return undefined;
  return (
    document.querySelector("main[data-brand]")?.getAttribute("data-brand") ??
    document.documentElement.getAttribute("data-brand") ??
    undefined
  );
}

/** 부모 space-y / divide-y / transform 영향을 받지 않도록 오버레이를 document.body로 포탈 렌더링 */
export function renderOverlayPortal(node: ReactNode): ReactNode {
  if (typeof document === "undefined") return node;
  return createPortal(node, document.body);
}
