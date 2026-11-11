import {
  Button,
  CartIcon,
  Field,
  IconButton,
  Input,
  QuantityStepper,
  SearchBar,
  SearchIcon,
  Text,
  Textarea,
} from "../mobile";
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
        <Text variant="section">Typography (24 / 19 / 16 / 15 / 13 / 12 · 가격 22px)</Text>
        <div className="space-y-2 rounded-card border border-line bg-surface-subtle p-4">
          <Text variant="hero" className="block">히어로 24 · 오늘 픽업 특가</Text>
          <Text variant="title" className="block">화면 제목 19 · 주류 스마트오더</Text>
          <Text variant="section" className="block">섹션 제목 16 · 추천 위스키</Text>
          <Text variant="body" className="block">본문 15 · 가까운 매장에서 기다림 없이 바로 픽업하세요.</Text>
          <Text variant="body-sm" tone="secondary" className="block">보조 본문 13 · 700ml · 알코올 40% · 일본</Text>
          <Text variant="caption" tone="muted" className="block">캡션 12 · 성인인증 후 구매 가능 상품</Text>
          <Text variant="price" tone="primary" className="block">42,800원</Text>
        </div>
      </section>

      <section className="space-y-3">
        <Text variant="section">Button (sm 36 · md 44 · lg 52px)</Text>
        <div className="space-y-2.5 rounded-card border border-line bg-surface-subtle p-4">
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm">기본 sm</Button>
            <Button size="sm" variant="soft">연한 브랜드</Button>
            <Button size="sm" variant="secondary">테두리</Button>
            <Button size="sm" variant="ghost">고스트</Button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button icon={<CartIcon />}>장바구니</Button>
            <Button variant="soft">매장 선택</Button>
            <Button variant="secondary">취소</Button>
            <Button variant="danger">주문취소</Button>
          </div>
          <div className="flex items-center gap-2">
            <Button size="lg" fullWidth>
              42,800원 픽업 주문하기
            </Button>
          </div>
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <Button size="sm" loading>
                결제 요청 중
              </Button>
              <Button size="sm" disabled>
                일시품절
              </Button>
            </div>
            <div className="flex items-center gap-1">
              <IconButton aria-label="검색" icon={<SearchIcon />} />
              <IconButton aria-label="장바구니" badge={3} icon={<CartIcon />} />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <Text variant="section">Input (연회색 채움 + 포커스 흰 배경·Primary 링)</Text>
        <div className="space-y-3 rounded-card border border-line bg-surface p-4">
          <Field label="픽업 주문자명" htmlFor="m-name" required help="매장 수령 시 본인 확인에 사용됩니다">
            <Input id="m-name" placeholder="이름을 입력하세요" />
          </Field>
          <Field label="휴대폰 번호" htmlFor="m-phone" required error="올바른 휴대폰 번호를 입력해 주세요.">
            <Input id="m-phone" type="tel" inputMode="numeric" defaultValue="010-123" invalid />
          </Field>
          <Field label="주류·매장 검색 (인풋 + 버튼 결합)" htmlFor="m-search">
            <SearchBar id="m-search" name="q" defaultValue="산토리 가쿠빈" placeholder="주류·매장 검색" buttonLabel="검색" />
          </Field>
          <Field label="주문 수량 (Stepper)" htmlFor="m-qty">
            <div className="flex items-center justify-between">
              <span className="text-body-sm text-ink-secondary">1인 최대 10병 구매 가능</span>
              <QuantityStepper id="m-qty" name="qty" defaultValue={2} min={1} max={10} />
            </div>
          </Field>
          <Field label="픽업 요청사항 (Textarea)" htmlFor="m-memo">
            <Textarea
              id="m-memo"
              name="memo"
              defaultValue="쇼핑백 함께 준비 부탁드립니다."
              maxLength={100}
              placeholder="매장에 전달할 요청사항을 입력하세요"
            />
          </Field>
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
