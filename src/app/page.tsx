import {
  BirthDateInput,
  Button,
  CartIcon,
  CheckboxGroup,
  Field,
  IconButton,
  Input,
  OtpInput,
  PasswordInput,
  QuantityStepper,
  RadioButtonGroup,
  RadioGroup,
  SearchBar,
  SearchIcon,
  Select,
  Text,
  Textarea,
} from "../mobile";
import { BRAND_PRESETS, buildListReturnHref, type BrandPreset } from "../tokens/index.ts";
import { BottomSheetShowcase } from "./BottomSheetShowcase";

const STORE_REGIONS = [
  ["서울 강남구", ["강남본점", "역삼점", "선릉점", "삼성코엑스점", "신사가로수길점", "압구정점", "청담점", "대치점", "도곡점", "양재점"]],
  ["서울 성동·마포·용산", ["성수점", "서울숲점", "왕십리점", "연남·홍대점", "합정점", "망원점", "상수점", "한남점", "이태원점", "용산아이파크점"]],
  ["서울 영등포·송파·종로", ["여의도점", "더현대여의도점", "문래점", "잠실롯데점", "석촌호수점", "방이점", "광화문점", "익선동점", "을지로점", "명동점"]],
  ["경기 남부·분당·수원", ["판교점", "정자점", "서현점", "광교중앙점", "수원인계점", "수원행궁점", "동탄호수점", "기흥점", "죽전점", "평택고덕점"]],
  ["경기 북부·인천", ["일산킨텍스점", "일산라페스타점", "파주운정점", "김포구래점", "송도센트럴점", "부평점", "구월점", "청라점", "하남미사점", "다산점"]],
  ["부산·경남", ["부산서면점", "부산센텀점", "해운대점", "광안리점", "전포카페거리점", "남포동점", "동래점", "창원상남점", "김해내외점", "진주혁신점"]],
  ["대구·경북·울산", ["대구동성로점", "대구수성못점", "범어점", "포항영일대점", "경주황리단길점", "구미인동점", "울산삼산점", "울산성남점", "안동옥동점", "김천혁신점"]],
  ["대전·충청·강원·제주", ["대전둔산점", "대전봉명점", "세종나성점", "청주성안길점", "천안불당점", "강릉교동점", "속초해변점", "춘천명동점", "전주객리단길점", "제주노형점"]],
] as const;

const ALL_PICKUP_STORES = STORE_REGIONS.flatMap(([region, branches]) =>
  branches.map((branch, idx) => ({
    value: `${region}-${idx}`,
    label: `시크릿오더 ${branch}`,
    description: `${region} · 스마트오더 당일 픽업`,
  }))
);

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
          <Field label="비밀번호 (보기/숨기기 토글)" htmlFor="m-pw" required>
            <PasswordInput id="m-pw" name="password" defaultValue="linkup2026!" placeholder="비밀번호를 입력하세요" />
          </Field>
          <Field label="생년월일 (성인인증 · 숫자 8자리 자동 포맷)" htmlFor="m-birth" required help="숫자만 입력하면 YYYY.MM.DD로 자동 변환됩니다">
            <BirthDateInput id="m-birth" name="birth" defaultValue="19950815" />
          </Field>
          <Field label="인증번호 (6자리 OTP)" htmlFor="m-otp" required help="휴대폰으로 전송된 6자리 숫자를 입력하세요">
            <OtpInput id="m-otp" name="otp" length={6} defaultValue="482" />
          </Field>
          <Field label="픽업 희망 시간 (바텀시트 Select)" htmlFor="m-pickup-slot" required>
            <Select
              id="m-pickup-slot"
              name="pickupSlot"
              title="픽업 희망 시간 선택"
              placeholder="방문 시간을 선택하세요"
              defaultValue="18-20"
              options={[
                { value: "now", label: "지금 바로 방문 (30분 내 준비)" },
                { value: "16-18", label: "오후 4:00 ~ 6:00" },
                { value: "18-20", label: "오후 6:00 ~ 8:00 (퇴근 시간대)" },
                { value: "20-22", label: "오후 8:00 ~ 10:00" },
              ]}
            />
          </Field>
          <Field label="픽업 매장 선택 (80개 매장 가상 스크롤 · 초성 검색)" htmlFor="m-pickup-store" required help="예: 'ㅅㅅ'(성수), 'ㅂㅅㅅㅁ'(부산서면), '강ㄴ'(강남) 입력">
            <Select
              id="m-pickup-store"
              name="pickupStore"
              title="전국 픽업 매장 선택 (80개)"
              placeholder="픽업할 매장을 선택하세요"
              searchPlaceholder="매장명 또는 초성 검색 (예: ㅅㅅ, ㄱㄴ, 부산)"
              options={ALL_PICKUP_STORES}
            />
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

      <section className="space-y-3">
        <Text variant="section">Radio & Checkbox (기본형 · 버튼형 · 세그먼트형)</Text>
        <div className="space-y-5 rounded-card border border-line bg-surface p-4">
          <div className="space-y-2">
            <span className="block text-body-sm font-semibold text-ink-secondary">상품 구성 선택 (버튼형 라디오 · Outline)</span>
            <RadioButtonGroup
              name="pkg"
              defaultValue="set"
              columns={2}
              options={[
                { value: "single", label: "단품 1병", subLabel: "42,800원" },
                { value: "set", label: "전용잔 패키지", subLabel: "46,900원" },
              ]}
            />
          </div>

          <div className="space-y-2">
            <span className="block text-body-sm font-semibold text-ink-secondary">보관 상태 선택 (버튼형 라디오 · Segmented)</span>
            <RadioButtonGroup
              name="temp"
              variant="segmented"
              defaultValue="cold"
              options={[
                { value: "cold", label: "시원하게 냉장" },
                { value: "room", label: "상온 보관" },
              ]}
            />
          </div>

          <div className="space-y-1.5">
            <span className="block text-body-sm font-semibold text-ink-secondary">픽업 일정 (기본 원형 라디오)</span>
            <RadioGroup
              name="pickupTime"
              defaultValue="today"
              options={[
                { value: "today", label: "오늘 바로 픽업", description: "결제 후 30분 내 매장에서 수령" },
                { value: "reserve", label: "희망일 예약 픽업", description: "원하는 방문 날짜와 시간 지정" },
              ]}
            />
          </div>

          <div className="space-y-1.5">
            <span className="block text-body-sm font-semibold text-ink-secondary">주문 필수 동의 (체크박스 그룹)</span>
            <CheckboxGroup
              name="terms"
              allLabel="필수 약관 전체 동의"
              defaultValue={["age"]}
              options={[
                { value: "age", label: "만 19세 이상 성인입니다 (필수)", description: "수령 시 신분증 지참 필수" },
                { value: "pickup", label: "주류 매장 대면 수령 안내 확인 (필수)" },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <Text variant="section">BottomSheet (디밍 + 슬라이드업 · 4가지 조합)</Text>
        <BottomSheetShowcase />
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
