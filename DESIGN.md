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
- Stage 5-4 Auth Inputs & Textarea refinement (2026-11-06):
  - `<PasswordInput>`: 우측 눈 아이콘 보기(`text`) ↔ 숨기기(`password`) 토글 버튼 내장.
  - `<BirthDateInput>`: 모바일 숫자 키패드(`inputMode="numeric"`)로 8자리 숫자를 치면 `YYYY.MM.DD` 자동 포맷, `name` 지정 시 숫자 8자리(`19950815`) hidden 전송.
  - `<OtpInput>`: 6자리(기본 `length={6}`) 분할 숫자 셀, 타이핑 시 다음 칸 자동 포커스·Backspace 이전 칸 이동·붙여넣기 및 SMS 자동완성(`autoComplete="one-time-code"`) 지원.
  - `<Textarea>`: 글자수 제한 카운터(`현재 / 최대`)를 박스 **내부 좌측 하단** 전용 푸터 줄에 배치(스크롤 시 본문과 겹침 없음)하고, 스크롤바를 숨김(`subtle-scrollbar`: `scrollbar-width: none` / `::-webkit-scrollbar { display: none }`).
- Stage 6 Radio & Checkbox (2026-11-06):
  - `<Checkbox>` / `<CheckboxGroup>`: 20×20px(`rounded-[6px]`) 터치 박스 + 체크 선 드로잉 애니메이션(200ms) + `allLabel` 전체 동의(일부 선택 시 `−` 표시) + `description` 보조 문구 지원.
  - `<Radio>` / `<RadioGroup>`: 20×20px 원형 라디오 + 선택 시 안쪽 흰 원 스케일업(150ms) + `description` 보조 문구 지원.
  - `<RadioButtonGroup>`: 버튼형 라디오 2종 — `outline`(테두리+연한 브랜드 채움, `subLabel` 가격/부가정보 및 `columns` 그리드 지원) 및 `segmented`(회색 트랙 위 흰 탭 전환형).
- Stage 7 BottomSheet (2026-11-11):
  - `<BottomSheet>`: 상단 `rounded-t-sheet`(`20px`), 배경 디밍 서서히 진입(480ms) + 컨텐츠 아래에서 슬라이드업(480ms), 닫힘 시 디밍·컨텐츠 동시 퇴장(360ms) 후 언마운트.
  - `title`(유/무) × `showClose`(유/무, 기본 `true`) × `footer`(유/무) 모든 조합 지원, `Escape`·배경 터치 닫기 및 `body` 스크롤 잠금 내장.
- Stage 8 Select (2026-11-11):
  - `<Select>`: `controlClass` 기반 셀렉트 트리거 + `<BottomSheet>` 연동. 트리거 클릭 시 바텀시트가 올라오고, 옵션을 선택하면 값 반영과 함께 바텀시트가 부드럽게 내려감.
  - 옵션이 8개 이상이거나 `searchable` 지정 시 시트 상단에 고정 검색창 자동 노출(`label`·`description` 실시간 필터링 + 시트 높이 고정으로 타이핑 시 흔들림 방지).
  - `<Select>` 검색·성능 확장: 외부 패키지 없이 한글 초성 검색(`ㅅㅅ`→성수, `ㅂㅅㅅㅁ`→부산서면, 조합 중 혼합어 `강ㄴ`→강남) 및 고정 행 높이(`48px`/`60px`) 가상 스크롤(`computeVirtualRange`, `overscan=5`) 적용.
- Stage 9 ProductCard (2026-11-11):
  - `<ProductCard>`: `variant="grid"`(1/2 폭 2열 정방형 썸네일 세로형) 및 `variant="list"`(96×96 썸네일 + 우측 정보 풀폭 가로 리스트형, 1px 구분선 호환) 2종 지원.
  - `originalPrice` 전달 시 정가 취소선 및 할인율(`computeDiscountRate`) 자동 계산, `onWishToggle`(하트 탄력 팝) · `onCartClick`(장바구니 담기) 콜백 전달 시에만 액션 버튼 선택적 노출, `soldOut` 일시품절 오버레이 지원.
- Stage 10 AppHeader (2026-11-11):
  - `<AppHeader>`: 높이 `52px`(`h-13`) + 상단 `safe-area-inset-top`, 좌측 뒤로가기(`IconButton` + `BackIcon`, 기본 `history.back()` 폴백) 바로 옆 좌측 정렬 타이틀(`min-w-0 flex-1 truncate`로 길어지면 `...` 말줄임) + 우측 `actions` 슬롯(기능버튼 1~2개 `shrink-0` 고정).
- Stage 11 Toast & Snackbar (2026-11-11):
  - `<Toast>`: 상단 플로팅 캡슐 알림(`default` / `success` / `danger`), 320ms 슬라이드다운 진입 · 260ms 퇴장 후 언마운트.
  - `<Snackbar>`: 하단 플로팅 다크 바(`rounded-card`), 메시지 + 우측 보조 액션 버튼(`actionLabel`), 340ms 슬라이드업 진입 · 260ms 퇴장. `ProductCard` 장바구니 `담기` 액션과 연동.
