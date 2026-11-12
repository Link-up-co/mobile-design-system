import type { ReactNode } from "react";
export declare function resolveActiveBrand(): string | undefined;
/** 부모 space-y / divide-y / transform 영향을 받지 않도록 오버레이를 document.body로 포탈 렌더링 */
export declare function renderOverlayPortal(node: ReactNode): ReactNode;
