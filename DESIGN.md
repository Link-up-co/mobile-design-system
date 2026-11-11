# Link-Up Mobile UI Design System (`@linkup/mobile-design-system`)

고객용 B2C 모바일 웹 / PWA(시크릿오더 · 월드비어마켓 · 드링킷 등)를 위한 표준 모바일 디자인 시스템입니다.
갤럭시 S25(412×915) · 삼성 인터넷 브라우저 환경을 1순위 기준으로 설계했습니다.

- **경로**: `/Users/leeyoonmin/Documents/hermes/mobile-design-system`
- **프리뷰 서버**: `:3420` (`npm run dev` — LAN IP 자동 허용)
- **스택**: React 19 · Next.js 16 · Tailwind CSS v4 · `clsx` (외부 UI/캐러셀 라이브러리 무의존)

---

## 1. 디자인 토큰 (`src/styles/theme.css`, `src/tokens/index.ts`)

| 구분 | 설정값 |
|---|---|
| **폰트** | `Pretendard Variable` · 기본 본문 **`15px`** (`0.9375rem`, `leading-[1.5]`), `viewport-fit=cover` |
| **중립 컬러 (`Zinc`)** | `canvas` `#F4F4F5` · `surface` `#FFFFFF` · `surface-subtle` `#FAFAFA` · `line` `#E4E4E7` · `line-strong` `#D4D4D8` · `ink` `#18181B` · `ink-secondary` `#52525B` · `ink-muted` `#71717A` |
| **브랜드 프리셋 (`data-brand`)** | `cobalt` `#0066FF`(기본) · `ink` `#18181B` · `amber` `#EA580C` · `emerald` `#059669` · `rose` `#E11D48` (또는 `--mds-primary` CSS 변수 직접 주입) |
| **시맨틱 컬러** | `success` `#15803D` · `warning` `#B45309` · `danger` `#DC2626` |
| **모서리 둥글기** | `rounded-control` **`8px`**(버튼·인풋) · `rounded-card` **`12px`**(카드·스낵바) · `rounded-t-sheet` **`20px`**(바텀시트 상단) |
| **타이포그래피 스케일** | `hero` 24px · `title` 19px · `section` 16px · `body` 15px · `body-sm` 13px · `caption` 12px · `price` 22px (`tabular-nums`) |
| **핵심 유틸리티** | `pressable`(눌림 135ms / 복원 180ms `scale: 0.965`) · `subtle-scrollbar`(스크롤바 숨김) · `formatCurrency` · `buildListReturnHref`(목록 복귀 쿼리 보존) |

---

## 2. 레이아웃 & 인터랙션 원칙

1. **심플한 외형 + 디테일하고 확실한 인터랙션**: 장식용 그라데이션·좌측 강조선(`border-l-*`)·불필요한 안내 문구는 배제하고, 모든 조작 요소에 hover·press·focus-visible 및 상태 전환 모션을 부여합니다(`prefers-reduced-motion` 존중).
2. **풀폭 플랫 계층**: 세로 상품 목록·랭킹·아코디언·첨부 목록은 박스 안에 박스를 중첩하지 않고 스크린 양끝까지 꽉 차는 `1px` 구분선(`border-y divide-y divide-line`) 플랫 리스트로 구성합니다.
3. **안전 영역(Safe Area) 기본 대응**: 상단 헤더(`safe-area-inset-top`)와 바텀시트·하단 탭바·하단 CTA·스낵바(`safe-area-inset-bottom`) 모두 모바일 노치/홈 인디케이터 영역을 자동 반영합니다.

---

## 3. 컴포넌트 카탈로그 (`src/mobile/index.ts`)

### 상단 · 하단 내비게이션 & 액션
- **`AppHeader`**: 좌측 뒤로가기 + 바로 옆 좌측 타이틀(길면 `...` 말줄임) + 우측 기능 `IconButton` 1~2개 (`52px`)
- **`BottomNav` / `LiquidGlassBottomNav`**: 하단 메인 탭바(플랫 리퀴드 글라스 바 & 플로팅 캡슐 독, `28px` 아이콘 전용, 슬라이딩 글라스 필 + 배지/알림 점)
- **`FixedBottomButton`** (`BottomActionBar`): 하단 고정 구매/확인 CTA 바(`52px`, 찜 슬롯·보조 버튼 분할·주문 요약 슬롯·본문 여백 스페이서 지원)
- **`FAB` / `ScrollTopFAB`**: 우측 하단 `+` 플로팅 액션 버튼 및 최상단 이동 버튼 (`BottomNav` 위 자동 이격)

### 타이포 · 버튼 · 배지
- **`Text`**: 모바일 시맨틱 타이포그래피 (`hero` ~ `price`)
- **`Button` / `IconButton`**: `primary` · `soft` · `secondary` · `danger` · `ghost`, 높이 `36 / 44 / 52px`, 로딩 스피너 및 배지 카운트
- **`Tag`**: 커머스 상태 배지(`베스트`·`인기`·`행사`·`추천` 시맨틱 톤 자동 추론 및 커스텀 HEX 틴트)

### 입력 · 폼 컨트롤
- **`Field` / `Input`**: 연회색 채움(`bg-canvas/70`) → 포커스 시 흰 배경 + Primary 링 전환, 라벨·필수표시·에러 문구
- **`PhoneInput`**: 휴대폰·유선번호 자동 하이픈(`010-1234-5678`) + 숫자 hidden 전송 + 지우기 버튼
- **`EmailInput`**: 모바일 이메일 자판 + 실시간 `@도메인` 자동완성 드롭다운 + 형식 검증(`isValidEmail`)
- **`PasswordInput`**: 우측 눈 아이콘 보기/숨기기 토글 내장 비밀번호 입력창
- **`BirthDateInput`**: 성인인증·회원가입용 숫자 8자리 자동 마스킹(`YYYY.MM.DD`) + 숫자 8자리 hidden 전송
- **`OtpInput`**: 6자리 분할 인증번호 셀(자동 포커스 이동·Backspace 복귀·붙여넣기·`one-time-code` SMS 자동완성)
- **`SearchBar`**: 좌측 검색 아이콘 + 지우기(`×`) + 우측 실행 버튼 결합형
- **`Textarea`**: 1줄(`44px`) 시작 자동 높이 증가(`maxHeight` 초과 시 스크롤 전환) + 내부 우측 하단 글자수 카운터 + 스크롤바 숨김
- **`QuantityStepper`**: 380ms 2겹 카운트업/다운 슬라이드 수량 스텝퍼
- **`Select`**: `<BottomSheet>` 연동 셀렉트 박스 + **한글 초성·혼합어 검색**(`matchesKoreanQuery`) + 대량 옵션 **가상 스크롤**(`computeVirtualRange`)

### 선택 · 전환 · 접기
- **`Checkbox` / `CheckboxGroup`**: 20px 체크 드로잉 모션 + `allLabel` 전체 동의(`indeterminate` 자동 표시)
- **`Radio` / `RadioGroup`**: 20px 원형 라디오
- **`RadioButtonGroup`**: 버튼형 라디오 2종 — `outline`(스프링 바운스 + 중심 배경 확산 채움, 그리드 열·보조 가격 지원) & `segmented`(슬라이딩 흰색 썸 전환)
- **`Switch`**: 촉각 스트레치 스위치(단독 및 풀폭 라벨 행)
- **`Tabs` / `SwipeTabs`**: `1px` 언더라인 탭바(선택 탭 자동 중앙 스크롤 + 슬라이딩 인디케이터 + 좌우 스와이프 패널)
- **`Accordion`**: `1px` 플랫 구분선 접기/펼치기 리스트

### 커머스 전시 · 상품 · 미디어
- **`ProductCard`**:
  - `variant="grid"` (1/2 폭 2열 카드): 정방형 썸네일 + 사진 아래 `[ 정사각형 찜 | 담기 ]` 일체형 분할 버튼 + 정가 취소선·할인율(`%`) 자동 계산
  - `variant="list"` (스크린 풀폭 리스트 카드): 좌우 여백 없이 화면 끝까지 차는 `1px` 구분선 행 + `96×96` 썸네일 + 우측 찜/장바구니 버튼
  - 찜 ON 시 커진 하트(`21px`) 탄성 팝 + 원형 링 파동 + 6방향 스파클 인터랙션, 스트레치드 링크로 터치 영역 분리
- **`BannerSlider`**: 풀블리드/인셋 무한 루프 캐러셀(포인터 드래그 스냅·자동재생·`1 / N` 카운터 배지)
- **`ExhibitionSection`**: 홈 기획전 섹션 헤더 + `2.3개` 노출 가로 스냅 상품 레일
- **`CategoryRanking`**: 카테고리 탭 자동 중앙 정렬 + 좌우 스와이프 판매 랭킹 리스트(`1~3위` 강조·순위 등락 표시)
- **`ImageUploader` / `FileUploader` / `ImagePreview`**: 대표 배지 멀티 이미지 업로더, 진행률 플랫 파일 업로더, 더블탭 줌 풀스크린 라이트박스

### 오버레이 · 피드백 · 상태
- **`BottomSheet`**: 서서히 어두워지는 디밍(480ms) + 슬라이드업/다운(480ms/360ms), `title` 유/무 × `showClose` 유/무 × `footer` 유/무 전체 조합 지원
- **`Dialog`**: 1버튼 알림 / 2버튼 확인·위험 중앙 모달
- **`Toast` / `Snackbar`**: 상단 상태 알림 캡슐(`default`/`success`/`danger`) & 하단 액션 스낵바(장바구니 담기 연동)
- **`EmptyState` / `Skeleton` / `ProductCardSkeleton`**: 빈 화면 안내 및 로딩 스켈레톤

---

## 4. 다른 서비스에서 가져다 쓰기

```tsx
// 1) 루트 레이아웃에서 테마 CSS 로드 및 브랜드 프리셋 지정
import "@linkup/mobile-design-system/styles.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" data-neutral="zinc" data-brand="cobalt">
      <body className="bg-surface font-sans text-[15px] leading-[1.5] text-ink antialiased">
        {children}
      </body>
    </html>
  );
}

// 2) 화면에서 컴포넌트 및 토큰 유틸 사용
import { AppHeader, ProductCard, Select, BottomSheet, Snackbar } from "@linkup/mobile-design-system";
import { formatCurrency, buildListReturnHref } from "@linkup/mobile-design-system/tokens";
```

## 5. 검증 명령어

```bash
npm test          # 58개 단위·SSR 마크업 테스트 (node:test)
npm run typecheck # TypeScript strict 검증 (tsc --noEmit)
npm run check     # 테스트 + 타입체크 일괄 실행
npm run build     # Next.js 프로덕션 빌드 검증
```
