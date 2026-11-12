"use client";

import { useState } from "react";
import { CheckIcon, Toast } from "../mobile";

const INSTALL_CMD = `npm install github:Link-up-co/mobile-design-system
npx linkup-mds install-skill`;

const CSS_SNIPPET = `@import "tailwindcss";
@import "@linkup/mobile-design-system/styles.css";
@source "../../node_modules/@linkup/mobile-design-system/src";`;

export function QuickStartBanner() {
  const [copiedKey, setCopiedKey] = useState<"install" | "css" | null>(null);
  const [toastSeq, setToastSeq] = useState(0);

  async function copy(key: "install" | "css", text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setToastSeq((n) => n + 1);
    } catch {
      // ignore clipboard errors in insecure context
    }
  }

  return (
    <div className="space-y-2.5 rounded-card border border-line bg-surface-subtle p-3.5">
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-caption font-bold text-ink">1. 패키지 & AI 스킬 설치</span>
          <button
            type="button"
            onClick={() => copy("install", INSTALL_CMD)}
            className="pressable inline-flex h-6 cursor-pointer items-center gap-1 rounded-[6px] border border-line bg-surface px-2 text-[11px] font-semibold text-ink-secondary hover:text-ink"
          >
            {copiedKey === "install" && <CheckIcon className="size-3 text-success" />}
            {copiedKey === "install" ? "복사됨" : "복사"}
          </button>
        </div>
        <pre className="subtle-scrollbar overflow-x-auto rounded-control bg-ink px-3 py-2 text-[11.5px] leading-[1.5] text-white">
          <code>{INSTALL_CMD}</code>
        </pre>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-caption font-bold text-ink">2. globals.css 연결 (Tailwind v4)</span>
          <button
            type="button"
            onClick={() => copy("css", CSS_SNIPPET)}
            className="pressable inline-flex h-6 cursor-pointer items-center gap-1 rounded-[6px] border border-line bg-surface px-2 text-[11px] font-semibold text-ink-secondary hover:text-ink"
          >
            {copiedKey === "css" && <CheckIcon className="size-3 text-success" />}
            {copiedKey === "css" ? "복사됨" : "복사"}
          </button>
        </div>
        <pre className="subtle-scrollbar overflow-x-auto rounded-control bg-ink px-3 py-2 text-[11.5px] leading-[1.5] text-white">
          <code>{CSS_SNIPPET}</code>
        </pre>
      </div>

      <Toast
        open={copiedKey !== null && toastSeq > 0}
        triggerKey={toastSeq}
        variant="success"
        message="클립보드에 복사되었습니다."
        onClose={() => setCopiedKey(null)}
      />
    </div>
  );
}
