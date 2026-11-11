# Link-Up Mobile UI Design System (`@linkup/mobile-design-system`)

고객용 B2C 모바일 웹 / PWA(시크릿오더 · 월드비어마켓 등)를 위한 모바일 디자인 시스템입니다.
갤럭시 S25 Edge 및 삼성 인터넷 브라우저 환경을 1순위 기준으로 설계합니다.

## Mobile Decision Log
- Bootstrap (2026-11-06): `/Users/leeyoonmin/Documents/hermes/mobile-design-system` 독립 저장소 생성, Next.js 16 + React 19 + Tailwind CSS v4, 포트 `:3420`.
- Stage 1 Font (2026-11-06): `Pretendard Variable` CDN, 모바일 기본 본문 크기 `15px` (`leading-[1.5]`), `viewport-fit=cover`.
- Stage 2 Color & Radius (2026-11-06):
  - Neutral: `Zinc` (`#F4F4F5` canvas, `#FFFFFF` surface, `#E4E4E7` line, `#18181B` ink)
  - Primary Brand: 기본 `Cobalt Blue` (`#0066FF`), 서비스별로 `data-brand="cobalt|ink|amber|emerald|rose"` 또는 CSS 변수(`--mds-primary` 등)로 교체 가능 (`BRAND_PRESETS`)
  - Radius: 표준 라운드 — `rounded-control` `8px`(버튼·인풋), `rounded-card` `12px`(카드·박스), `rounded-sheet` `20px`(바텀시트 상단)
- Stage 3 Typography (2026-11-06): 시원한 대비 스케일 — `hero` 24px(700) · `title` 19px(700) · `section` 16px(600) · `body` 15px(400) · `body-sm` 13px(400) · `caption` 12px(500) · `price` 22px(800, `tabular-nums`). `<Text>` 컴포넌트 제공.
- Stage 4 Button (2026-11-06): 터치 표준 높이 `sm` 36px · `md` 44px(기본) · `lg` 52px(하단 고정 CTA, `fullWidth`). 변형: `primary`(브랜드 채움) · `soft`(`primary-soft` 채움 + `primary` 글자) · `secondary`(흰 바탕 + 1px `line`) · `danger` · `ghost`. `IconButton`(44×44px, `badge` 카운트 지원), 로딩 스피너 오버레이(폭 유지), `pressable` 0.97 축소 피드백.
- Stage 5 Input (2026-11-06): 연회색 채움형(`bg-canvas/70`, 44px `h-11`, `rounded-control` 8px) + 포커스 시 흰 배경(`bg-surface`) + `border-primary` + `ring-2 ring-primary/15`. `<Field>` 라벨·필수(`*`)·도움말·에러(`role="alert"`) 제공. 이후 컴포넌트는 사용자 요청 시 하나씩 추가.
- Stage 5-2 Textarea, QuantityStepper, SearchBar (2026-11-06):
  - `<Textarea>`: 연회색 채움(`bg-canvas/70`) + 포커스 시 흰 배경·Primary 링, `maxLength` 지정 시 우측 하단 실시간 글자수 카운터(`현재 / 최대`).
  - `<QuantityStepper>`: 모바일 수량 조절기(`−` / 숫자 / `+`), `sm` 36px · `md` 44px 정사각형 터치 버튼, `min`/`max` 경계 자동 비활성화.
  - `<SearchBar>`: 인풋 + 액션 버튼 결합형(좌측 돋보기 아이콘, 값 입력 시 `×` 지우기 버튼, 우측 `Button` 결합).
- Stage 5-3 Stepper count-up & Textarea auto-grow (2026-11-06):
  - `<QuantityStepper>`: 수량 증감 방향에 따라 숫자가 아래→위(`+1`, `starting:translate-y-2.5 starting:scale-90`) 또는 위→아래(`-1`, `starting:-translate-y-2.5`)로 200ms 동안 탄력 있게 슬라이드되는 카운트업 인터랙션 적용.
  - `<Textarea>`: 기본 1줄(`rows={1}`, 44px)에서 시작해 줄바꿈마다 높이가 자동으로 늘어나며, `maxHeight`(기본 140px)에 도달하면 높이가 고정되고 내부 세로 스크롤(`overflow-y: auto`)로 전환. 우하단 리사이즈 그립 제거(`resize-none`).
