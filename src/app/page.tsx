import { BRAND_PRESETS, buildListReturnHref, type BrandPreset } from "../tokens/index.ts";

const SWATCHES: readonly { name: string; varName: string }[] = [
  { name: "primary", varName: "--mds-primary" },
  { name: "primary-hover", varName: "--mds-primary-hover" },
  { name: "primary-soft", varName: "--mds-primary-soft" },
  { name: "surface", varName: "--mds-surface" },
  { name: "surface-subtle", varName: "--mds-surface-subtle" },
  { name: "canvas", varName: "--mds-canvas" },
  { name: "line", varName: "--mds-line" },
  { name: "line-strong", varName: "--mds-line-strong" },
  { name: "ink", varName: "--mds-ink" },
  { name: "ink-secondary", varName: "--mds-ink-secondary" },
  { name: "ink-muted", varName: "--mds-ink-muted" },
  { name: "success", varName: "--mds-success" },
  { name: "warning", varName: "--mds-warning" },
  { name: "danger", varName: "--mds-danger" },
];

export default async function MobileGalleryPage({
  searchParams,
}: {
  searchParams?: Promise<{ brand?: string }>;
}) {
  const params = (await searchParams) ?? {};
  const activeBrand: BrandPreset = BRAND_PRESETS.some((b) => b.key === params.brand)
    ? (params.brand as BrandPreset)
    : "cobalt";

  return (
    <main data-brand={activeBrand} className="mx-auto min-h-dvh max-w-[412px] space-y-8 bg-surface p-5 shadow-xs">
      <header className="space-y-1">
        <h1 className="text-lg font-bold tracking-tight text-ink">Link-Up Mobile UI</h1>
        <p className="text-xs text-ink-muted">갤럭시 S25 · 삼성 인터넷 기준 · Pretendard 15px</p>
      </header>

      <section className="space-y-2.5">
        <h2 className="text-sm font-semibold text-ink">브랜드 포인트 프리셋 (서비스별 전환)</h2>
        <div className="flex flex-wrap gap-1.5">
          {BRAND_PRESETS.map((b) => {
            const active = b.key === activeBrand;
            return (
              <a
                key={b.key}
                href={buildListReturnHref("/", { brand: b.key === "cobalt" ? undefined : b.key })}
                className={`pressable inline-flex h-8 items-center gap-1.5 rounded-control border px-2.5 text-xs font-semibold ${
                  active
                    ? "border-primary bg-primary text-primary-fg"
                    : "border-line bg-surface text-ink-secondary hover:bg-surface-subtle"
                }`}
              >
                <span
                className={`size-2.5 rounded-full border ${active ? "border-white/70" : "border-black/15"}`}
                style={{ backgroundColor: b.hex }}
              />
                {b.label}
              </a>
            );
          })}
        </div>
      </section>

      <section className="space-y-2.5">
        <h2 className="text-sm font-semibold text-ink">시맨틱 컬러 토큰 (Zinc + {activeBrand})</h2>
        <div className="grid grid-cols-3 gap-2">
          {SWATCHES.map((s) => (
            <div key={s.name} className="overflow-hidden rounded-card border border-line bg-surface">
              <div className="h-10 border-b border-line" style={{ backgroundColor: `var(${s.varName})` }} />
              <div className="px-2 py-1.5 text-[11px] font-medium text-ink-secondary">{s.name}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-2.5">
        <h2 className="text-sm font-semibold text-ink">모서리 둥글기 (Radius)</h2>
        <div className="grid grid-cols-3 gap-2 text-center text-xs font-medium text-ink-secondary">
          <div className="flex h-14 items-center justify-center rounded-control border border-line bg-surface-subtle">
            control · 8px
          </div>
          <div className="flex h-14 items-center justify-center rounded-card border border-line bg-surface-subtle">
            card · 12px
          </div>
          <div className="flex h-14 items-center justify-center rounded-t-sheet border border-line bg-surface-subtle">
            sheet · 20px
          </div>
        </div>
      </section>
    </main>
  );
}
