"use client";

import { useState } from "react";
import {
  Accordion,
  Button,
  CartIcon,
  Dialog,
  EmptyState,
  FAB,
  ProductCardSkeleton,
  ScrollTopFAB,
  SearchIcon,
  SwipeTabs,
  Switch,
  Tabs,
  Toast,
} from "../mobile";

export function ExtraComponentsShowcase() {
  const [scrollTab, setScrollTab] = useState("all");
  const [pushOn, setPushOn] = useState(true);
  const [hideSoldOut, setHideSoldOut] = useState(false);
  const [nightPush, setNightPush] = useState(false);

  const [alertOpen, setAlertOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [dangerOpen, setDangerOpen] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [liveFab, setLiveFab] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {/* 1) 범용 Tabs & SwipeTabs */}
      <section className="space-y-3">
        <h2 className="text-[16px] font-bold tracking-tight text-ink">
          Tabs & SwipeTabs (플랫 언더라인 · 선택 탭 중앙 정렬 · 좌우 슬라이드)
        </h2>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <span className="block text-body-sm font-semibold text-ink-secondary">
              가로 스크롤 탭 (선택 시 자동 중앙 정렬)
            </span>
            <Tabs
              bleed
              variant="scrollable"
              activeKey={scrollTab}
              onActiveChange={setScrollTab}
              items={[
                { key: "all", label: "전체" },
                { key: "whisky", label: "싱글몰트", count: 42 },
                { key: "wine", label: "와인·샴페인", count: 86 },
                { key: "sake", label: "사케·전통주", count: 29 },
                { key: "beer", label: "수제맥주" },
                { key: "glass", label: "전용잔 세트", count: 14 },
                { key: "gift", label: "선물추천" },
              ]}
            />
          </div>

          <div className="space-y-1.5">
            <span className="block text-body-sm font-semibold text-ink-secondary">
              균등 분할 슬라이드 탭 (탭 클릭 또는 본문 좌우 드래그)
            </span>
            <div className="overflow-hidden border-b border-line">
              <SwipeTabs
                bleed
                variant="fixed"
                tabs={[
                  {
                    key: "detail",
                    label: "상품정보",
                    content: (
                      <div className="py-4 text-body-sm leading-[1.6] text-ink-secondary">
                        셰리 오크 캐스크에서 12년간 숙성해 말린 과일과 바닐라, 은은한 스파이시 피니시가 어우러지는 대표 싱글몰트 위스키입니다.
                      </div>
                    ),
                  },
                  {
                    key: "review",
                    label: "리뷰",
                    count: 128,
                    content: (
                      <div className="divide-y divide-line">
                        <div className="py-3">
                          <span className="text-body-sm font-bold text-ink">퇴근길 성수점 10분 만에 픽업했어요</span>
                          <p className="mt-0.5 text-caption text-ink-muted">포장도 깔끔하고 전용잔 상태 최고입니다.</p>
                        </div>
                        <div className="py-3">
                          <span className="text-body-sm font-bold text-ink">선물용으로 재구매했습니다</span>
                          <p className="mt-0.5 text-caption text-ink-muted">쇼핑백 동봉 요청도 정확히 챙겨주셨어요.</p>
                        </div>
                      </div>
                    ),
                  },
                  {
                    key: "pickup",
                    label: "픽업안내",
                    content: (
                      <div className="py-4 text-body-sm leading-[1.6] text-ink-secondary">
                        결제 완료 후 알림톡이 발송되며, 방문 시 본인 명의 신분증을 지참해 주셔야 수령이 가능합니다.
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2) Switch (ON/OFF 토글 스위치) */}
      <section className="space-y-3">
        <h2 className="text-[16px] font-bold tracking-tight text-ink">
          Switch (ON/OFF 토글 스위치 · 설정 리스트)
        </h2>
        <div className="-mx-5 divide-y divide-line border-y border-line bg-surface px-5">
          <Switch
            checked={pushOn}
            onChange={setPushOn}
            label="픽업 준비 완료 알림"
            description="주문하신 주류가 매장에 준비되면 즉시 알려드립니다"
          />
          <Switch
            checked={hideSoldOut}
            onChange={setHideSoldOut}
            label="일시품절 상품 제외하고 보기"
          />
          <Switch
            size="sm"
            checked={nightPush}
            onChange={setNightPush}
            label="야간 혜택 알림 수신 (21시~08시)"
          />
        </div>
      </section>

      {/* 3) Accordion (1px 플랫 접기/펼치기) */}
      <section className="space-y-3">
        <h2 className="text-[16px] font-bold tracking-tight text-ink">
          Accordion (1px 플랫 구분선 접기/펼치기)
        </h2>
        <Accordion
          bleed
          defaultOpenKeys={["spec"]}
          items={[
            {
              key: "spec",
              title: "상품 필수 표기정보",
              subtitle: "원산지 · 도수 · 용량 안내",
              content: (
                <dl className="grid grid-cols-[88px_1fr] gap-y-1.5 text-body-sm">
                  <dt className="text-ink-muted">주종 / 도수</dt>
                  <dd className="font-medium text-ink">싱글몰트 위스키 · 40%</dd>
                  <dt className="text-ink-muted">용량 / 국가</dt>
                  <dd className="font-medium text-ink">700ml · 스코틀랜드</dd>
                </dl>
              ),
            },
            {
              key: "cancel",
              title: "픽업 기한 및 환불 규정",
              content:
                "픽업 예정일로부터 7일 이내 미수령 시 자동 취소 및 전액 환불 처리됩니다. 수령 이후에는 단순 변심 교환·환불이 불가합니다.",
            },
            {
              key: "faq",
              title: "대리 수령이 가능한가요?",
              content:
                "주류 통신판매 관련 법령에 따라 주문자 본인의 실물 신분증(모바일 신분증 포함) 확인 후에만 대면 수령이 가능합니다.",
            },
          ]}
        />
      </section>

      {/* 4) Dialog (Alert / Confirm / Danger 중앙 모달) */}
      <section className="space-y-3">
        <h2 className="text-[16px] font-bold tracking-tight text-ink">
          Dialog (중앙 알림 · 확인 · 위험 액션 모달)
        </h2>
        <div className="grid grid-cols-3 gap-2">
          <Button size="sm" variant="secondary" onClick={() => setAlertOpen(true)}>
            1버튼 알림
          </Button>
          <Button size="sm" variant="soft" onClick={() => setConfirmOpen(true)}>
            2버튼 확인
          </Button>
          <Button size="sm" variant="danger" onClick={() => setDangerOpen(true)}>
            주문취소 모달
          </Button>
        </div>

        <Dialog
          open={alertOpen}
          onClose={() => setAlertOpen(false)}
          title="성인인증이 필요합니다"
          description="주류 스마트오더 상품은 만 19세 이상 성인만 구매할 수 있습니다."
          confirmLabel="인증하기"
          onConfirm={() => {
            setAlertOpen(false);
            setToastMsg("성인인증 화면으로 이동합니다");
          }}
        />

        <Dialog
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          title="픽업 매장을 변경할까요?"
          description="매장을 변경하면 장바구니에 담긴 일부 전용 상품의 재고가 달라질 수 있습니다."
          cancelLabel="유지하기"
          confirmLabel="매장 변경"
          onConfirm={() => {
            setConfirmOpen(false);
            setToastMsg("픽업 매장이 변경되었습니다");
          }}
        />

        <Dialog
          open={dangerOpen}
          onClose={() => setDangerOpen(false)}
          title="주문을 취소하시겠습니까?"
          description="이미 매장에서 포장 준비가 시작된 경우 재주문 시 수량이 소진될 수 있습니다."
          cancelLabel="닫기"
          confirmLabel="주문 취소"
          confirmVariant="danger"
          onConfirm={() => {
            setDangerOpen(false);
            setToastMsg("주문이 정상 취소되었습니다");
          }}
        />
      </section>

      {/* 5) EmptyState & Skeleton */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-[16px] font-bold tracking-tight text-ink">
            EmptyState & Skeleton (빈 상태 · 로딩 쉬머)
          </h2>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setShowSkeleton((v) => !v)}
          >
            {showSkeleton ? "빈 상태 보기" : "로딩 스켈레톤 보기"}
          </Button>
        </div>

        {showSkeleton ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <ProductCardSkeleton variant="grid" />
              <ProductCardSkeleton variant="grid" />
            </div>
            <div className="divide-y divide-line border-t border-line">
              <ProductCardSkeleton variant="list" />
              <ProductCardSkeleton variant="list" />
            </div>
          </div>
        ) : (
          <div className="-mx-5 divide-y divide-line border-y border-line bg-surface">
            <EmptyState
              compact
              icon={<CartIcon />}
              title="장바구니에 담긴 주류가 없습니다"
              description="원하는 주류를 담고 가까운 매장에서 기다림 없이 픽업해 보세요."
              action={
                <Button size="sm" variant="primary" onClick={() => setToastMsg("인기 주류 목록으로 이동합니다")}>
                  베스트 주류 둘러보기
                </Button>
              }
            />
            <EmptyState
              compact
              icon={<SearchIcon />}
              title="검색 결과가 없습니다"
              description="철자를 확인하거나 다른 키워드로 다시 검색해 주세요."
            />
          </div>
        )}
      </section>

      {/* 6) FAB & ScrollTopFAB */}
      <section className="space-y-3">
        <h2 className="text-[16px] font-bold tracking-tight text-ink">
          FAB (우측 하단 + 플로팅 버튼 · 맨 위로 이동)
        </h2>
        <div className="flex items-center justify-between rounded-card border border-line bg-surface-subtle p-4">
          <div className="flex items-center gap-2.5">
            <FAB position="static" aria-label="새 글 작성" onClick={() => setToastMsg("+ 작성 버튼 클릭")} />
            <FAB
              position="static"
              label="시음노트 작성"
              onClick={() => setToastMsg("시음노트 작성 화면 열기")}
            />
          </div>
          <Button
            size="sm"
            variant={liveFab ? "primary" : "soft"}
            onClick={() => setLiveFab((v) => !v)}
          >
            {liveFab ? "실제 플로팅 끄기" : "우측 하단 FAB 켜기"}
          </Button>
        </div>

        {liveFab && (
          <FAB
            aria-label="시음노트 작성"
            onClick={() => setToastMsg("우측 하단 플로팅 + 버튼 클릭")}
          />
        )}
        <ScrollTopFAB offsetBottomNav={false} />
      </section>

      <Toast
        open={toastMsg !== null}
        onClose={() => setToastMsg(null)}
        message={toastMsg ?? ""}
      />
    </div>
  );
}
