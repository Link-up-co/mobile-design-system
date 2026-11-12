# @linkup/mobile-design-system

Link-Up 고객용 B2C 모바일 웹 / PWA 스토어프론트(시크릿오더 · 월드비어마켓 · 드링킷 등)를 위한 **모바일 UI 디자인 시스템** 및 **AI 코딩 에이전트 스킬(`linkup-mobile-design-system`)** 패키지입니다.

- **라이브 컴포넌트 프리뷰**: https://link-up-co.github.io/mobile-design-system/
- *(사내 B2B 관리자 콘솔 `0px` 직각 디자인 시스템은 [`@linkup/design-system`](https://github.com/Link-up-co/design-system)을 사용하세요.)*

---

## 1. 빠른 시작 (Quick Start)

### ① 패키지 설치
```bash
# 최신 main 설치
npm install github:Link-up-co/mobile-design-system

# 특정 릴리스 버전 고정 설치 (권장)
npm install github:Link-up-co/mobile-design-system#v0.1.0
```

### ② AI 코딩 에이전트 스킬 설치 (Claude Code · Cursor · Codex · Hermes)
```bash
npx linkup-mds install-skill
```
실행 시 현재 프로젝트(`.claude/skills/linkup-mobile-design-system/SKILL.md`, `.agents/skills/...`, `DESIGN.md`)와 사용자 홈 에이전트 폴더에 공식 모바일 디자인 시스템 규칙과 컴포넌트 레퍼런스가 자동 설치됩니다.

### ③ 전역 스타일 연결 (`src/app/globals.css` 또는 `app/globals.css`)
Tailwind CSS v4가 패키지 내부 컴포넌트 클래스를 스캔할 수 있도록 **아래 두 줄을 반드시 함께 추가**합니다.
```css
@import "tailwindcss";
@import "@linkup/mobile-design-system/styles.css";
/* globals.css가 src/app/에 있으면 ../../node_modules/..., app/에 있으면 ../node_modules/... */
@source "../../node_modules/@linkup/mobile-design-system/src";
```

### ④ 루트 레이아웃 설정 (`src/app/layout.tsx`)
```tsx
import type { Viewport } from "next";
import "./globals.css";

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

## 2. 브랜드 프리셋 전환 (`data-brand`)

`<html data-brand="...">` 속성만 바꾸면 모든 버튼·포커스 링·체크박스·라디오·탭 인디케이터 색상이 서비스 브랜드에 맞게 일괄 전환됩니다.

| `data-brand` 값 | 대표 색상 | 전경 텍스트(`primary-fg`) | 추천 용도 |
|---|---|---|---|
| `cobalt` *(기본)* | `#0066FF` | `#FFFFFF` | 시크릿오더 · 기본 B2C 커머스 |
| `gold` | `#EFB81C` | `#18181B` | 월드비어마켓 · 맥주/주류 골드 테마 |
| `ink` | `#18181B` | `#FFFFFF` | 모노톤 프리미엄 스토어 |
| `amber` | `#EA580C` | `#FFFFFF` | 푸드 · 다이닝 · 타임특가 |
| `emerald` | `#059669` | `#FFFFFF` | 신선 · 친환경 스토어 |
| `rose` | `#E11D48` | `#FFFFFF` | 와인 · 기프트 큐레이션 |

커스텀 브랜드 색상을 직접 주입하려면 루트에 `--mds-primary`, `--mds-primary-hover`, `--mds-primary-soft`, `--mds-primary-fg` CSS 변수를 지정하면 됩니다.

---

## 3. 제공 컴포넌트 카탈로그

```tsx
import {
  // Navigation & Action Bars
  AppHeader, BottomNav, LiquidGlassBottomNav, FixedBottomButton, FAB, ScrollTopFAB,
  // Typography, Buttons & Tags
  Text, Button, IconButton, buttonClass, Tag, TagList,
  // Inputs & Form Controls
  Field, Input, PhoneInput, EmailInput, PasswordInput, BirthDateInput, OtpInput,
  SearchBar, Textarea, QuantityStepper, Select,
  // Selection, Tabs & Accordion
  Checkbox, CheckboxGroup, Radio, RadioGroup, RadioButtonGroup, Switch,
  Tabs, SwipeTabs, Accordion,
  // Commerce, Banners & Media
  ProductCard, BannerSlider, ExhibitionSection, CategoryRanking,
  ImageUploader, FileUploader, ImagePreview,
  // Overlays, Feedback & States
  BottomSheet, Dialog, Toast, Snackbar, EmptyState, Skeleton, ProductCardSkeleton,
} from "@linkup/mobile-design-system";

import { formatNumber, formatCurrency, buildListReturnHref } from "@linkup/mobile-design-system/tokens";
```

| 분류 | 컴포넌트 | 핵심 기능 |
|---|---|---|
| **내비게이션 · 액션** | `AppHeader` | 좌측 뒤로가기 + 바로 옆 좌측 타이틀(긴 제목 자동 `...` 말줄임) + 우측 버튼 1~2개 (`52px`) |
| | `BottomNav` / `LiquidGlassBottomNav` | `28px` 아이콘 전용 하단 메인 탭바, 슬라이딩 글라스 필 + 배지/알림 점 |
| | `FixedBottomButton` | 하단 고정 `52px` 구매 CTA 바 (`safe-area` · 좌측 찜 슬롯 · 상단 요약 슬롯 지원) |
| | `FAB` / `ScrollTopFAB` | 우측 하단 `+` 플로팅 액션 버튼 및 최상단 복귀 버튼 |
| **기본 요소** | `Text` | `hero`(24) · `title`(19) · `section`(16) · `body`(15) · `body-sm`(13) · `caption`(12) · `price`(22) |
| | `Button` / `IconButton` | `primary` · `soft` · `secondary` · `danger` · `ghost`, 높이 `36/44/52px`, 로딩 스피너·배지 |
| | `Tag` | `베스트`·`인기`·`행사`·`추천` 시맨틱 컬러 자동 추론 및 HEX 커스텀 배지 |
| **입력 · 폼** | `Field` / `Input` | 연회색 채움(`bg-canvas/70`) → 포커스 흰 배경·Primary 링, 라벨·필수표시·에러 문구 |
| | `PhoneInput` / `BirthDateInput` | 휴대폰 하이픈(`010-1234-5678`) 및 생년월일(`YYYY.MM.DD`) 자동 포맷 + 순수 숫자 hidden 전송 |
| | `EmailInput` / `PasswordInput` | 실시간 `@도메인` 자동완성 드롭다운 / 우측 눈 아이콘 보기·숨기기 토글 |
| | `OtpInput` | 6자리 분할 인증번호 셀(자동 칸 이동 · Backspace 복귀 · SMS `one-time-code` 자동완성) |
| | `SearchBar` | 좌측 검색 아이콘 + 지우기(`×`) + 우측 실행 버튼 결합형 |
| | `Textarea` | 1줄(`44px`) 자동 높이 증가 + 박스 내부 우하단 글자수 카운터 + 스크롤바 숨김 |
| | `QuantityStepper` | 380ms 2겹 카운트업/다운 슬라이드 수량 조절기 |
| | `Select` | `<BottomSheet>` 연동 셀렉트 + **한글 초성 검색**(`ㅅㅅ`→성수) + 대량 옵션 **가상 스크롤** |
| **선택 · 전환** | `Checkbox` / `CheckboxGroup` | 체크 선 드로잉 모션 + `allLabel` 전체 동의(`indeterminate` 자동 표시) |
| | `RadioGroup` / `RadioButtonGroup` | 원형 라디오 및 버튼형 라디오 2종(`outline` 바운스·중심채움 / `segmented` 흰 박스 슬라이드) |
| | `Switch` / `Tabs` / `SwipeTabs` / `Accordion` | 촉각 스트레치 스위치, 탭 자동 중앙 스크롤 + 스와이프 패널, `1px` 플랫 아코디언 |
| **커머스 · 미디어** | `ProductCard` | `grid`(1/2 폭 2열 + `[찜\|담기]` 분할바) 및 `list`(스크린 풀폭 `1px` 구분선 카드), 찜 스파클 버스트 |
| | `BannerSlider` / `ExhibitionSection` / `CategoryRanking` | 무한 루프 배너, `2.3개` 노출 기획전 가로 스냅 레일, 카테고리별 판매 순위 슬라이드 |
| | `ImageUploader` / `FileUploader` / `ImagePreview` | 대표 이미지 업로더, 진행률 파일 업로더, 더블탭 `2.2x` 줌 풀스크린 라이트박스 |
| **오버레이 · 피드백** | `BottomSheet` / `Dialog` | 서서히 디밍 + 슬라이드업 바텀시트(타이틀·닫기·푸터 전 조합, `body` 포탈), 확인/위험 모달 |
| | `Toast` / `Snackbar` | 상단 상태 알림 캡슐(`default`/`success`/`danger`) & 하단 액션 스낵바 |
| | `EmptyState` / `Skeleton` | 빈 화면 안내 및 `ProductCardSkeleton` 쉬머 플레이스홀더 |

---

## 4. 로컬 개발 및 기여 가이드

```bash
# 로컬 프리뷰 갤러리 실행 (http://localhost:3420)
npm run dev

# 배포 패키지(dist/) 컴파일 + 전체 테스트 + 타입체크 실행
npm run check

# GitHub Pages 정적 빌드 테스트 (out/)
npm run build:pages
```

> **기여 주의사항**: 컴포넌트를 수정한 뒤에는 반드시 `npm run check`를 실행하여 갱신된 `dist/` 산출물을 함께 커밋해 주세요(CI에서 `dist/` 동기화 여부를 자동 검증합니다).
