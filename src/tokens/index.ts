type QueryValue = string | number | boolean | null | undefined;

export function formatNumber(value: number | string | null | undefined): string {
  const num = typeof value === "string" ? Number(value) : (value ?? 0);
  return Number.isFinite(num) ? num.toLocaleString("ko-KR") : "0";
}

export function formatCurrency(value: number | string | null | undefined, suffix = "원"): string {
  return `${formatNumber(value)}${suffix}`;
}

/** 목록 복귀/이동 주소. 배열 값은 같은 키를 반복, 빈 값은 생략 */
export function buildListReturnHref(basePath: string, params: Record<string, QueryValue | QueryValue[]>): string {
  const search = new URLSearchParams();
  for (const [key, raw] of Object.entries(params)) {
    for (const v of Array.isArray(raw) ? raw : [raw]) {
      if (v === undefined || v === null || v === "") continue;
      search.append(key, String(v));
    }
  }
  const qs = search.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}
