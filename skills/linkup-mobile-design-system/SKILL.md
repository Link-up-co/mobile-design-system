---
name: linkup-mobile-design-system
description: "Use when building Link-Up B2C mobile web or PWA storefronts with @linkup/mobile-design-system."
version: 1.1.0
author: Link-Up Inc.
license: MIT
metadata:
  hermes:
    tags: [design-system, mobile-web, pwa, storefront, linkup, tailwind-v4]
    homepage: https://link-up-co.github.io/mobile-design-system/
    related_skills: [linkup-admin-design-system, pwa-mobile-web-app]
---

# Link-Up Mobile UI Design System (`@linkup/mobile-design-system`)

Link-Up 고객용 B2C 모바일 웹 · PWA 스토어프론트(SecretOrder, WorldBeerMarket, Drinkit B2C 등)를 일관된 디자인 토큰·인터랙션·컴포넌트로 구축하기 위한 공식 스킬입니다.
*(주의: B2B 사내 관리자 콘솔(`0px` 직각 규격)을 작업할 때는 이 스킬 대신 `linkup-admin-design-system`(`@linkup/design-system`)을 사용하세요.)*

- **라이브 쇼케이스**: https://link-up-co.github.io/mobile-design-system/
- **GitHub 저장소**: https://github.com/Link-up-co/mobile-design-system

---

## 1. 설치 및 프로젝트 초기 세팅 (Quick Start)

### ① 패키지 & AI 코딩 스킬 설치
```bash
# 1. GitHub 조직 저장소에서 패키지 설치 (특정 버전 고정 시 #v0.1.0 추가)
npm install github:Link-up-co/mobile-design-system

# 2. AI 에이전트(Claude Code · Cursor · Codex · Hermes)에 공식 모바일 스킬 등록
npx linkup-mds install-skill
```

### ② 전역 스타일 연결 (`src/app/globals.css` 또는 `app/globals.css`)
Tailwind CSS v4가 기본적으로 무시하는 `node_modules` 내부 컴포넌트 클래스를 스캔하도록 **반드시 `@import`와 `@source` 두 줄을 함께 선언**합니다. (`@source` 상대경로는 `globals.css` 파일 위치 기준입니다.)
```css
@import "tailwindcss";
@import "@linkup/mobile-design-system/styles.css";
/* src/app/globals.css 일 때: ../../node_modules/... | app/globals.css 일 때: ../node_modules/... */
@source "../../node_modules/@linkup/mobile-design-system/src";
```

### ③ 루트 레이아웃 설정 (`src/app/layout.tsx`)
모바일 기본 본문 크기(`15px`), `Pretendard Variable` 폰트, 노치/홈바 `viewportFit: "cover"`, 브랜드 프리셋(`data-brand`)을 지정합니다.
```tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "서비스명" };

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" data-neutral="zinc" data-brand="cobalt">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="bg-surface font-sans text-[15px] leading-[1.5] text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
```

---

## 2. 절대 디자인 & 인터랙션 규칙 (Mandatory Rules)

1. **타겟 뷰포트 & 타이포그래피 스케일**:
   - **갤럭시 S25(`412×915`) · 삼성 인터넷 브라우저**를 1순위 기준으로 설계하며 `360px` 폭까지 가로 스크롤(`overflow-x`)이 절대 발생하지 않아야 합니다.
   - 기본 본문은 **`15px`**(`text-body`)이며 시맨틱 스케일(`hero` 24px · `title` 19px · `section` 16px · `body` 15px · `body-sm` 13px · `caption` 12px · `price` 22px)만 사용합니다. 모든 가격·수량·할인율·날짜·카운트에는 **`tabular-nums`**와 `formatNumber` / `formatCurrency`를 적용합니다.
2. **3단 시맨틱 라운드 규격**:
   - 컨트롤(버튼·인풋·셀렉트·라디오버튼): **`rounded-control` (`8px`)**
   - 카드·상품 썸네일·스낵바: **`rounded-card` (`12px`)**
   - 바텀시트 상단 모서리: **`rounded-t-sheet` (`20px`)**
   - 임의의 `rounded-2xl`, `rounded-3xl` 남용을 피하고 위 3단 토큰으로 통일합니다.
3. **풀폭 플랫 리스트 계층 & 좌측 강조 보더 절대 금지**:
   - 세로 상품 목록(`ProductCard variant="list"`), 카테고리 랭킹(`CategoryRanking`), FAQ(`Accordion`), 첨부파일 목록(`FileUploader`), 게시판 목록은 둥근 박스 안에 박스를 중첩하지 않고 **스크린 좌우 끝까지 꽉 차는 `1px` 구분선(`border-y divide-y divide-line`) 플랫 리스트**로 구성합니다(패딩 컨테이너 안에서는 `-mx-4` / `-mx-5`로 풀블리드 처리).
   - 사이드/알림/카드 어디에도 **좌측 두꺼운 컬러 보더(`border-l-2`, `border-l-4`)를 절대 사용하지 않습니다.**
4. **심플한 외형 + 부드럽고 확실한 촉각 인터랙션**:
   - 모든 단독 클릭·터치 컨트롤(버튼, 아이콘버튼, 칩)에는 `pressable` 유틸리티(`135ms` 눌림 `scale: 0.965` / `180ms` 복원, `prefers-reduced-motion` 존중)와 명시적 `hover` · `focus-visible:outline-2 focus-visible:outline-primary` 상태를 적용합니다.
   - 풀폭 리스트 행이나 `Accordion` 헤더에는 `pressable`을 걸어 글씨가 줄어들게 하지 말고 `active:bg-surface-subtle` 배경 하이라이트를 사용합니다.
   - 화면에 불필요한 부제목·조작 설명글·가짜 프로모션 박스를 넣지 않으며, 중앙 정렬 한국어 제목/안내문(`Dialog`, `EmptyState`)에는 `break-keep`을 적용합니다.
5. **브랜드 프리셋 전환 & 명도 대비 보장**:
   - 루트(또는 섹션)의 `data-brand="cobalt | gold | ink | amber | emerald | rose"` 속성으로 서비스별 브랜드 색상을 교체합니다 (`cobalt` `#0066FF` 기본, `gold` `#EFB81C` 맥주 골드 등).
   - 컴포넌트에 `#0066FF` 같은 HEX를 하드코딩하지 말고 반드시 `bg-primary text-primary-fg`, `border-primary`, `bg-primary-soft`, `text-primary-ink` 시맨틱 토큰을 사용합니다. 특히 `gold`(`#EFB81C`)처럼 밝은 컬러에서는 버튼 전경이 자동으로 `#18181B`(`text-primary-fg`)가 되며 흰 배경 위 강조 텍스트는 `text-primary-ink`(`#8A5A00`)를 써야 가독성이 확보됩니다.
6. **목록 ➔ 상세/수정 ➔ 목록 복귀 시 상태 보존 (`buildListReturnHref`)**:
   - 상품 목록·게시판에서 상세 화면에 들어갔다가 목록으로 돌아올 때 **원래 보던 `page` 번호와 검색어·카테고리·정렬·필터 상태를 URL 쿼리스트링으로 반드시 유지**해야 합니다(`1페이지 초기화 절대 금지`).
7. **고정 오버레이 포탈 규칙**:
   - `BottomSheet`, `Dialog`, `Toast`, `Snackbar`, `ImagePreview`는 내부적으로 `document.body`에 포탈 렌더링되므로 부모의 `space-y-*` 여백 점프나 `transform` 클리핑이 발생하지 않습니다. 단, SSR 하이드레이션 일치성을 위해 초기 렌더 시 `open={false}`에서 시작해 클라이언트 이벤트로 여는 패턴을 사용합니다.
8. **배너·일러스트 그래픽 규격**:
   - AI 실사풍 이미지("밤티")나 과장된 네온 그라데이션을 금지하며, 프로모션 배너·빈 상태 일러스트는 깔끔한 한국형 블랙 아웃라인(`#18181B`) 벡터 그래픽과 선명한 플랫 컬러로 구성합니다.

---

## 3. 전체 컴포넌트 & 유틸리티 상세 레퍼런스

```tsx
import {
  // Typography & Badges
  Text, Tag, TagList, inferTagVariant,
  // Buttons & Floating Actions
  Button, IconButton, buttonClass, FAB, ScrollTopFAB, FixedBottomButton,
  // Form & Inputs
  Field, Input, controlClass, PhoneInput, formatPhoneNumber, stripPhoneDigits,
  EmailInput, isValidEmail, buildEmailSuggestions, PasswordInput,
  BirthDateInput, formatBirthDate, stripBirthDigits, OtpInput,
  SearchBar, Textarea, QuantityStepper, clampQuantity,
  Select, filterSelectOptions, matchesKoreanQuery, computeVirtualRange,
  // Selection, Tabs & Collapsible
  Checkbox, CheckboxGroup, Radio, RadioGroup, RadioButtonGroup, Switch,
  Tabs, SwipeTabs, Accordion,
  // Commerce, Banners & Media
  ProductCard, computeDiscountRate, BannerSlider, ExhibitionSection, CategoryRanking,
  ImageUploader, FileUploader, formatFileSize, ImagePreview,
  // Navigation, Overlays & Feedback
  AppHeader, BottomNav, LiquidGlassBottomNav,
  BottomSheet, Dialog, Toast, Snackbar, EmptyState, Skeleton, ProductCardSkeleton,
  // Icons (slender 1.15px stroke, optional filled prop)
  HomeIcon, CategoryIcon, MapPinIcon, SearchIcon, CartIcon, HeartIcon, UserIcon,
  BackIcon, CloseIcon, ChevronDownIcon, CheckIcon, PlusIcon, ArrowUpIcon,
  EyeIcon, EyeOffIcon, CalendarIcon, AlertCircleIcon, CameraIcon, UploadIcon, FileTextIcon,
} from "@linkup/mobile-design-system";

import {
  BRAND_PRESETS, formatNumber, formatCurrency, buildListReturnHref, type BrandPreset,
} from "@linkup/mobile-design-system/tokens";
```

### 3-1. 내비게이션 · 하단 액션바
- **`AppHeader`**: `{ title?: string; showBack?: boolean; onBack?: () => void; actions?: ReactNode; sticky?: boolean; bordered?: boolean }`
  - 좌측 뒤로가기 버튼(`onBack` 생략 시 `history.back()`) + 바로 오른쪽 옆 좌측 정렬 타이틀(길어지면 `min-w-0 flex-1 truncate`로 자동 `...` 말줄임) + 우측 `IconButton` 1~2개(`actions`). 높이 `52px` + 상단 `safe-area-inset-top`.
- **`BottomNav`** / **`LiquidGlassBottomNav`**: `{ items: BottomNavItem[]; activeKey: string; onSelect?: (key: string) => void; position?: "fixed" | "static"; reserveSpace?: boolean }`
  - `BottomNavItem`: `{ key: string; label: string; icon: ReactNode; activeIcon?: ReactNode; href?: string; badge?: number; dot?: boolean }`
  - 하단 메인 탭바(4~5탭 권장). 텍스트 라벨 없이 균일한 `28px` 아이콘 전용으로 렌더링되며(`label`은 `aria-label`로 자동 연결), 활성 탭으로 리퀴드 글라스 필이 슬라이딩 이동합니다. `position="fixed"`(기본)일 때 본문 가림 방지 스페이서가 자동 확보됩니다.
- **`FixedBottomButton`**: `{ children: ReactNode; secondaryAction?: { label: ReactNode; onClick?: () => void; disabled?: boolean }; leading?: ReactNode; topSlot?: ReactNode; position?: "fixed" | "static"; reserveSpace?: boolean } & ButtonProps`
  - 상품 상세·장바구니·주문서 하단 고정 `52px` CTA 바(`safe-area-inset-bottom` 내장). `leading`(좌측 찜 아이콘 등), `secondaryAction`(좌측 보조 버튼 2분할), `topSlot`(상단 수량·최소주문 달성률 요약 줄) 지원.
- **`FAB` / `ScrollTopFAB`**: 우측 하단 `+` 작성 플로팅 버튼(`hasBottomNav` 지정 시 탭바 위로 자동 이격) 및 스크롤 최상단 복귀 버튼.

### 3-2. 기본 요소 (타이포 · 버튼 · 태그)
- **`Text`**: `variant="hero" | "title" | "section" | "body" | "body-sm" | "caption" | "price"`, `tone="default" | "secondary" | "muted" | "primary" | "danger" | "success"`, `as` 태그 지정 가능.
- **`Button`**: `variant="primary" | "soft" | "secondary" | "danger" | "ghost"`, `size="sm"(36px) | "md"(44px, 기본) | "lg"(52px)`, `fullWidth`, `loading`(폭 유지 스피너), `icon`. 기본 `type="button"`.
- **`IconButton`**: `{ "aria-label": string; icon: ReactNode; size?: "sm"(36) | "md"(44); badge?: number }` — `badge`가 `99` 초과면 `"99+"` 표시.
- **`Tag`**: `{ children: ReactNode; variant?: "solid" | "primary" | "danger" | "warning" | "success" | "neutral"; color?: string }` — `"베스트"`, `"인기"`, `"특가"`, `"신상품"` 등 한글 문구만 넘겨도 `inferTagVariant`가 자동으로 시맨틱 컬러를 매핑하며 HEX 직접 지정도 지원합니다.

### 3-3. 입력 · 폼 컨트롤 (기본 높이 `44px`, 연회색 `bg-canvas/70` → 포커스 흰 배경 + Primary 링)
- **`Field`**: `{ label: string; htmlFor: string; required?: boolean; help?: string; error?: string; children: ReactNode }` — `error`가 있으면 `role="alert"` 빨간 문구를 표시하고 `help`를 대체합니다.
- **`Input`**: `{ size?: "sm" | "md" | "lg"; invalid?: boolean } & InputHTMLAttributes`
- **`PhoneInput`**: `{ name?: string; value?: string; defaultValue?: string; onChange?: (digits: string, formatted: string) => void; invalid?: boolean }`
  - `010-1234-5678` / `02-1234-5678` 실시간 하이픈 포맷팅 + 우측 지우기(`×`) 버튼 + `name` 지정 시 숫자만(`01012345678`) hidden input으로 폼 전송. **(주의: `onChange` 첫 번째 인자는 숫자 문자열 `digits`, 두 번째가 하이픈 포함 `formatted`입니다.)**
- **`EmailInput`**: `{ domains?: readonly string[]; onValueChange?: (email: string) => void } & InputProps` — `@` 입력 시 주요 도메인(`naver.com`, `gmail.com`, `kakao.com` 등) 자동완성 드롭다운 노출.
- **`PasswordInput`**: 우측 눈 아이콘으로 비밀번호 보기(`text`) ↔ 숨기기(`password`) 즉시 토글.
- **`BirthDateInput`**: `{ name?: string; value?: string; defaultValue?: string; onChange?: (digits: string, formatted: string) => void }`
  - 모바일 숫자 키패드(`inputMode="numeric"`)로 8자리 입력 시 `1995.08.15` 자동 마스킹 + `name` 지정 시 `19950815` hidden 전송.
- **`OtpInput`**: `{ length?: number(기본 6); name?: string; value?: string; defaultValue?: string; onChange?: (code: string) => void; onComplete?: (code: string) => void; invalid?: boolean }`
  - 6칸 분할 인증번호 입력(타이핑 시 다음 칸 자동 이동, `Backspace` 이전 칸 이동, 전체 붙여넣기, SMS `autoComplete="one-time-code"` 내장).
- **`SearchBar`**: `{ buttonLabel?: ReactNode(기본 "검색"); buttonVariant?: ButtonVariant; loading?: boolean; onClear?: () => void }` — 좌측 검색 아이콘 + 값 입력 시 지우기(`×`) + 우측 실행 버튼 결합형(검색창·중복확인·쿠폰등록 공용).
- **`Textarea`**: `{ maxHeight?: number(기본 140); maxLength?: number; invalid?: boolean }`
  - 기본 1줄(`44px`)에서 엔터·줄바꿈마다 자동 높이 증가 → `maxHeight` 도달 시 내부 스크롤 전환(`subtle-scrollbar`로 스크롤바 비노출, `resize-none`). `maxLength` 지정 시 박스 **내부 우측 하단** 전용 줄에 `현재 / 최대` 카운터를 표시해 본문과 절대 겹치지 않습니다.
- **`QuantityStepper`**: `{ value?: number; defaultValue?: number; min?: number(1); max?: number(99); step?: number(1); size?: "sm" | "md"; onChange?: (v: number) => void }` — 증감 방향에 맞춰 이전 숫자와 새 숫자가 동시에 380ms 동안 슬라이드되는 2겹 카운트업/다운 모션 내장.
- **`Select`**: `{ options: readonly SelectOption[]; value?: string; defaultValue?: string; placeholder?: string; title?: string; searchable?: boolean; searchPlaceholder?: string; onChange?: (value: string, option: SelectOption) => void }`
  - 클릭 시 `<BottomSheet>`가 올라오고 옵션을 선택하면 즉시 시트가 부드럽게 닫힙니다.
  - 옵션이 8개 이상이거나 `searchable={true}`일 때 시트 상단에 검색창이 자동 고정되며, **한글 초성 검색(`ㅅㅅ` → 성수, `ㅂㅅㅅㅁ` → 부산서면) · 조합 중 혼합어(`강ㄴ` → 강남)** 및 **고정 행 높이 가상 스크롤(`computeVirtualRange`)**이 기본 내장되어 수백~수천 개 옵션도 끊김 없이 동작합니다.

### 3-4. 선택 · 탭 · 아코디언
- **`Checkbox` / `CheckboxGroup`**: `{ name: string; options: CheckboxOption[]; value?: string[]; defaultValue?: string[]; onChange?: (v: string[]) => void; allLabel?: ReactNode }` — 20px 라운드 박스에 체크 선 드로잉 애니메이션 적용, `allLabel` 지정 시 전체 동의 및 일부 선택(`indeterminate`) 자동 처리.
- **`Radio` / `RadioGroup`**: 원형 라디오 그룹(`options={[{ value, label, description }]}`).
- **`RadioButtonGroup`**: `{ name: string; options: { value: string; label: ReactNode; subLabel?: ReactNode; disabled?: boolean }[]; variant?: "outline" | "segmented"; columns?: 0 | 2 | 3 | 4 }`
  - `outline`: 선택 시 스프링 바운스(`mds-radio-bounce`) + 중심 배경 확산 채움(`data-outline-fill`) 모션이 동작하는 옵션/결제수단 그리드 버튼.
  - `segmented`: 회색 트랙 위에서 단독 흰 박스(`data-segmented-thumb`)가 300ms 동안 부드럽게 미끄러져 이동하는 세그먼트 스위치.
- **`Switch`**: `{ checked?: boolean; defaultChecked?: boolean; onChange?: (checked: boolean) => void; label?: ReactNode; description?: ReactNode }` — 단독 토글 또는 풀폭 설정 행으로 자동 렌더링.
- **`Tabs` / `SwipeTabs`**: `{ items / tabs; activeKey; onActiveChange; variant?: "scrollable" | "fixed"; bleed?: boolean }` — `1px` 하단 보더 플랫 탭바, 선택 탭 자동 중앙 스크롤 정렬 + 슬라이딩 `2px` Primary 인디케이터(`SwipeTabs`는 본문 좌우 터치 스와이프 전환 포함).
- **`Accordion`**: `{ items: { key: string; title: ReactNode; content: ReactNode }[]; multiple?: boolean; defaultOpenKeys?: string[]; bleed?: boolean }` — `1px` 상하·사이 구분선 플랫 접기/펼치기 리스트.

### 3-5. 커머스 · 미디어 업로더
- **`ProductCard`**:
  - Props: `{ variant?: "grid" | "list"; name: string; subtitle?: string; price: number; originalPrice?: number; imageSrc?: string; thumbnail?: ReactNode; tags?: readonly ProductTagInput[]; href?: string; onClick?: () => void; soldOut?: boolean; wished?: boolean; defaultWished?: boolean; onWishToggle?: (wished: boolean) => void; onCartClick?: () => void }`
  - **`variant="grid"` (1/2 폭 2열 카드)**: `1:1` 정방형 썸네일 바로 아래에 **`[ 정사각형 찜(w-10) | 담기 ]` 일체형 분할 버튼 바**가 위치하며, 그 아래 보조 정보·2줄 상품명·정가 취소선·자동 할인율(`%`)·판매가가 정렬됩니다.
  - **`variant="list"` (스크린 풀폭 리스트 카드)**: 좌우 바깥 여백 없이 화면 끝까지 차는 행(`px-4 py-3.5`) 안에 `96×96px` 썸네일 + 상품정보 + 우측 찜·장바구니 버튼을 배치합니다(`-mx-5 divide-y divide-line border-y border-line` 래퍼와 함께 사용).
  - 찜 ON 시 `21px` 하트 탄성 팝 + 원형 링 파동 + 6방향 스파클 인터랙션이 터지며, 스트레치드 링크(`after:inset-0`)로 `<a>`/`<button>` 중첩 없이 카드 본체 이동과 버튼 클릭을 완벽히 분리합니다.
- **`BannerSlider`**: `{ slides: BannerSlide[]; variant?: "bleed" | "inset"; autoPlayMs?: number; indicator?: "counter" | "dots"; onViewAllClick?: () => void }` — 무한 클론 루프 + 실시간 포인터 드래그 스냅 + `1 / N` 재생/일시정지 캡슐 배지.
- **`ExhibitionSection`**: `{ title: ReactNode; subtitle?: ReactNode; moreHref?: string; onMoreClick?: () => void; products: ExhibitionProductItem[] }` — 섹션 헤더(`전체보기 ›`) + `412px` 화면에서 약 `2.3개` 카드가 보여 가로 스크롤을 유도하는 스냅 레일.
- **`CategoryRanking`**: `{ title?: ReactNode; categories: RankingCategoryTab[]; activeKey?: string; onActiveChange?: (key: string) => void }` — 탭 자동 중앙 정렬 + 좌우 스와이프 판매 랭킹 리스트(`1~3위` Primary 강조 및 순위 등락 `▲/▼/NEW` 표시).
- **`ImageUploader` / `FileUploader` / `ImagePreview`**: 카메라·앨범 멀티 이미지 타일(`대표` 배지 + 클릭 시 풀스크린 더블탭 `2.2x` 줌 `ImagePreview` 연동) 및 진행률 표시 플랫 첨부파일 업로더.

### 3-6. 오버레이 · 피드백 · 빈 화면
- **`BottomSheet`**: `{ open: boolean; onClose: () => void; title?: ReactNode; showClose?: boolean(기본 true); footer?: ReactNode; children: ReactNode }`
  - **(주의: 닫기 버튼 제어 prop 이름은 `showCloseButton`이 아니라 `showClose`입니다.)**
  - 배경 디밍이 480ms 동안 천천히 어두워지면서 시트가 아래에서 올라오고, 닫힐 때도 360ms 퇴장 모션 후 언마운트됩니다. `title` 유/무 × `showClose` 유/무 × `footer` 유/무 8가지 조합을 모두 지원합니다.
- **`Dialog`**: `{ open: boolean; onClose: () => void; title: ReactNode; description?: ReactNode; confirmLabel?: string; cancelLabel?: string; confirmVariant?: "primary" | "danger"; onConfirm?: () => void; loading?: boolean }` — `cancelLabel`을 생략하면 1버튼 알림(Alert), 넘기면 2버튼 확인/위험(Confirm) 모달로 동작.
- **`Toast`**: `{ open: boolean; onClose: () => void; message: ReactNode; variant?: "default" | "success" | "danger"; duration?: number(2200); triggerKey?: number | string }` — **(주의: `variant`는 `"default" | "success" | "danger"` 3가지만 받습니다.)**
- **`Snackbar`**: `{ open: boolean; onClose: () => void; message: ReactNode; actionLabel?: string; onAction?: () => void; duration?: number(3200); triggerKey?: number | string }` — 장바구니 담기·실행 취소 등 하단 플로팅 액션 바. 연속 호출 시 `triggerKey`(증가하는 숫자)를 넘기면 타이머와 진입 모션이 매번 새로 갱신됩니다.
- **`EmptyState` / `Skeleton` / `ProductCardSkeleton`**: 검색·장바구니 빈 상태 안내 및 로딩 스켈레톤.

---

## 4. 실전 화면 조합 블루프린트 (Blueprints)

### ① 카테고리 상품 목록 + 필터 시트 + 장바구니 스낵바 + 목록 복귀 상태 유지
```tsx
"use client";
import { useState } from "react";
import {
  AppHeader, BottomNav, BottomSheet, Button, CartIcon, CheckboxGroup,
  IconButton, ProductCard, SearchIcon, Select, Snackbar, Tabs,
  HomeIcon, CategoryIcon, HeartIcon, UserIcon,
} from "@linkup/mobile-design-system";
import { buildListReturnHref } from "@linkup/mobile-design-system/tokens";

export default function ProductListPage({ page = 1, category = "whisky", sort = "popular" }) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [snack, setSnack] = useState({ open: false, msg: "", seq: 0 });

  // 상세 페이지에 전달할 복귀 주소 (원래 page, category, sort 100% 유지)
  const returnTo = buildListReturnHref("/products", { category, sort, page });

  return (
    <div className="mx-auto min-h-dvh max-w-[412px] bg-surface">
      <AppHeader
        title="주류 스토어"
        actions={
          <>
            <IconButton aria-label="검색" icon={<SearchIcon />} />
            <IconButton aria-label="장바구니" icon={<CartIcon />} badge={2} />
          </>
        }
      />

      <Tabs
        variant="scrollable"
        activeKey={category}
        items={[
          { key: "whisky", label: "위스키", count: 48 },
          { key: "wine", label: "와인·샴페인", count: 64 },
          { key: "sake", label: "사케·전통주", count: 29 },
        ]}
      />

      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div className="w-40">
            <Select
              size="sm"
              title="정렬 기준"
              defaultValue={sort}
              options={[
                { value: "popular", label: "인기순" },
                { value: "price-asc", label: "낮은 가격순" },
              ]}
            />
          </div>
          <Button size="sm" variant="secondary" onClick={() => setFilterOpen(true)}>
            상세 필터
          </Button>
        </div>

        {/* 1/2 그리드 상품 목록 */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-5">
          <ProductCard
            variant="grid"
            name="산토리 히비키 재패니즈 하모니"
            subtitle="블렌디드 · 700ml · 43%"
            price={136000}
            originalPrice={160000}
            tags={["베스트", "특가"]}
            href={`/products/hibiki?returnTo=${encodeURIComponent(returnTo)}`}
            onWishToggle={() => {}}
            onCartClick={() =>
              setSnack((s) => ({ open: true, msg: "장바구니에 상품을 담았습니다.", seq: s.seq + 1 }))
            }
          />
        </div>
      </div>

      <BottomSheet
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        title="상세 필터"
        showClose
        footer={<Button fullWidth size="lg" onClick={() => setFilterOpen(false)}>조건 적용하기</Button>}
      >
        <CheckboxGroup
          name="origin"
          allLabel="원산지 전체"
          options={[
            { value: "scotland", label: "스코틀랜드" },
            { value: "japan", label: "일본" },
          ]}
        />
      </BottomSheet>

      <Snackbar
        open={snack.open}
        triggerKey={snack.seq}
        message={snack.msg}
        actionLabel="장바구니 보기"
        onAction={() => (window.location.href = "/cart")}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
      />

      <BottomNav
        activeKey="category"
        items={[
          { key: "home", label: "홈", icon: <HomeIcon />, activeIcon: <HomeIcon filled />, href: "/" },
          { key: "category", label: "카테고리", icon: <CategoryIcon />, activeIcon: <CategoryIcon filled />, href: "/products" },
          { key: "wish", label: "관심상품", icon: <HeartIcon />, activeIcon: <HeartIcon filled />, href: "/wishlist" },
          { key: "my", label: "마이", icon: <UserIcon />, activeIcon: <UserIcon filled />, href: "/mypage" },
        ]}
      />
    </div>
  );
}
```

### ② 본인인증 · 주문서 입력 폼 패턴
```tsx
import {
  BirthDateInput, EmailInput, Field, FixedBottomButton,
  Input, OtpInput, PasswordInput, PhoneInput, RadioButtonGroup, Textarea,
} from "@linkup/mobile-design-system";

export function CheckoutForm() {
  return (
    <form className="space-y-4 p-4">
      <Field label="주문자명" htmlFor="orderer" required>
        <Input id="orderer" name="orderer" placeholder="실명을 입력하세요" />
      </Field>
      <Field label="휴대폰 번호" htmlFor="phone" required>
        <PhoneInput id="phone" name="phone" />
      </Field>
      <Field label="SMS 인증번호 (6자리)" htmlFor="otp" required>
        <OtpInput id="otp" name="otp" length={6} />
      </Field>
      <Field label="생년월일 (성인인증)" htmlFor="birth" required>
        <BirthDateInput id="birth" name="birth" />
      </Field>
      <Field label="이메일" htmlFor="email">
        <EmailInput id="email" name="email" placeholder="example@domain.com" />
      </Field>
      <Field label="비밀번호" htmlFor="pw" required>
        <PasswordInput id="pw" name="password" placeholder="8자 이상 입력" />
      </Field>
      <Field label="보관 상태" htmlFor="temp">
        <RadioButtonGroup
          name="temp"
          variant="segmented"
          defaultValue="cold"
          options={[
            { value: "cold", label: "시원하게 냉장" },
            { value: "room", label: "상온 보관" },
          ]}
        />
      </Field>
      <Field label="매장 요청사항" htmlFor="memo">
        <Textarea id="memo" name="memo" maxLength={100} placeholder="요청사항을 입력하세요" />
      </Field>

      <FixedBottomButton type="submit">결제 및 픽업 예약하기</FixedBottomButton>
    </form>
  );
}
```

---

## 5. 자주 틀리는 함정 체크리스트 (Common Pitfalls)

- **Tailwind v4 `@source` 누락 금지**: `globals.css`에 `@import "@linkup/mobile-design-system/styles.css";`만 넣고 `@source "../../node_modules/@linkup/mobile-design-system/src";`를 빼먹으면 컴포넌트 유틸리티 클래스가 생성되지 않습니다.
- **Tailwind v4 비표준 `duration-*` 주의**: `duration-220`, `duration-260` 같은 비표준 숫자는 Tailwind v4에서 `0s`로 무시될 수 있으므로 커스텀 시간은 `duration-[220ms]` 대괄호 표기 또는 인라인 `transition`을 사용하세요.
- **Tailwind v4 `scale-*` 트랜지션 속성 주의**: `scale-95` 등은 `transform`이 아니라 독립 CSS `scale` 속성을 변경하므로 커스텀 `transition-[...]` 작성 시 반드시 `scale`을 포함하세요(`pressable` 유틸리티에는 이미 포함되어 있습니다).
- **드래그 후 오클릭 방지**: 가로 스냅 레일(`ExhibitionSection`, `BannerSlider`)을 직접 확장할 때는 `Math.abs(dx) > 6` 이동 시 후속 `click` 이벤트를 막아 슬라이드 드래그 직후 상세 페이지로 잘못 이동하지 않게 하세요.
