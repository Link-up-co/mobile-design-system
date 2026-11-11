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
