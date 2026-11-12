"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useRef, useState, } from "react";
import clsx from "clsx";
import { Button } from "./Button.js";
import { CalendarIcon, CloseIcon, EyeIcon, EyeOffIcon, SearchIcon } from "./icons.js";
const SIZES = {
    sm: "h-9 px-3 text-body-sm",
    md: "h-11 px-3.5 text-body",
    lg: "h-[52px] px-4 text-section",
};
export function controlClass(size = "md", invalid = false) {
    return clsx("w-full min-w-0 rounded-control border bg-canvas/70 text-ink outline-none transition-[color,background-color,border-color,box-shadow] duration-150 ease-out placeholder:text-ink-muted", "focus:bg-surface focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50", invalid
        ? "border-danger focus:border-danger focus:ring-danger/15"
        : "border-transparent hover:border-line focus:border-primary focus:ring-primary/15", SIZES[size]);
}
export function Input({ size = "md", invalid = false, className, ...rest }) {
    return (_jsx("input", { "aria-invalid": invalid || undefined, className: clsx(controlClass(size, invalid), className), ...rest }));
}
export const DEFAULT_EMAIL_DOMAINS = [
    "naver.com",
    "gmail.com",
    "kakao.com",
    "hanmail.net",
    "daum.net",
    "nate.com",
    "icloud.com",
];
export function isValidEmail(value) {
    const trimmed = value.trim();
    if (!trimmed || /\s/.test(trimmed))
        return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed);
}
export function buildEmailSuggestions(rawValue, domains = DEFAULT_EMAIL_DOMAINS) {
    const clean = rawValue.replace(/\s+/g, "");
    if (!clean || domains.length === 0)
        return [];
    const atIndex = clean.indexOf("@");
    // '@'가 2개 이상이면 추천 생략
    if (atIndex !== -1 && clean.indexOf("@", atIndex + 1) !== -1)
        return [];
    const localPart = atIndex === -1 ? clean : clean.slice(0, atIndex);
    if (!localPart)
        return [];
    const typedDomain = atIndex === -1 ? "" : clean.slice(atIndex + 1).toLowerCase();
    return domains
        .filter((d) => d.toLowerCase().startsWith(typedDomain))
        .map((domain) => ({
        email: `${localPart}@${domain}`,
        localPart,
        domain,
    }))
        .filter((item) => item.email.toLowerCase() !== clean.toLowerCase());
}
/**
 * 모바일 이메일 입력창 (`@도메인` 실시간 자동완성 추천 + 원터치 지우기).
 * - 아이디만 입력해도 주요 메일 도메인을 하단 리스트로 제안해 영문 타이핑 부담 최소화
 */
export function EmailInput({ id, name, size = "md", invalid = false, value: controlled, defaultValue = "", domains = DEFAULT_EMAIL_DOMAINS, placeholder = "example@email.com", disabled, onChange, onFocus, onBlur, onKeyDown, className, ...rest }) {
    const [inner, setInner] = useState(() => defaultValue.replace(/\s+/g, ""));
    const [focused, setFocused] = useState(false);
    const [activeIdx, setActiveIdx] = useState(0);
    const inputRef = useRef(null);
    const val = controlled !== undefined ? controlled.replace(/\s+/g, "") : inner;
    const suggestions = focused && !disabled ? buildEmailSuggestions(val, domains) : [];
    const safeActiveIdx = suggestions.length > 0 ? Math.min(activeIdx, suggestions.length - 1) : 0;
    function commitValue(nextRaw) {
        const clean = nextRaw.replace(/\s+/g, "");
        if (controlled === undefined)
            setInner(clean);
        setActiveIdx(0);
        onChange?.(clean);
    }
    function applySuggestion(email) {
        commitValue(email);
        setFocused(false);
        inputRef.current?.focus();
    }
    function handleKeyDown(e) {
        if (suggestions.length > 0) {
            if (e.key === "ArrowDown") {
                e.preventDefault();
                setActiveIdx((i) => (i + 1) % suggestions.length);
                return;
            }
            if (e.key === "ArrowUp") {
                e.preventDefault();
                setActiveIdx((i) => (i - 1 + suggestions.length) % suggestions.length);
                return;
            }
            if (e.key === "Enter") {
                e.preventDefault();
                applySuggestion(suggestions[safeActiveIdx].email);
                return;
            }
            if (e.key === "Escape") {
                setFocused(false);
                return;
            }
        }
        onKeyDown?.(e);
    }
    return (_jsxs("div", { className: "relative w-full", children: [_jsxs("div", { className: "relative flex w-full items-center", children: [_jsx("input", { ref: inputRef, id: id, name: name, type: "email", inputMode: "email", autoComplete: "email", autoCapitalize: "none", autoCorrect: "off", spellCheck: false, disabled: disabled, "aria-invalid": invalid || undefined, "aria-autocomplete": domains.length > 0 ? "list" : undefined, "aria-expanded": domains.length > 0 ? suggestions.length > 0 : undefined, value: val, placeholder: placeholder, onFocus: (e) => {
                            setFocused(true);
                            onFocus?.(e);
                        }, onBlur: (e) => {
                            setFocused(false);
                            onBlur?.(e);
                        }, onChange: (e) => {
                            setFocused(true);
                            commitValue(e.target.value);
                        }, onKeyDown: handleKeyDown, className: clsx(controlClass(size, invalid), val.length > 0 && !disabled && "pr-9", className), ...rest }), val.length > 0 && !disabled && (_jsx("button", { type: "button", "aria-label": "\uC774\uBA54\uC77C \uC9C0\uC6B0\uAE30", onPointerDown: (e) => e.preventDefault(), onClick: () => {
                            commitValue("");
                            setFocused(true);
                            inputRef.current?.focus();
                        }, className: "pressable absolute right-2 inline-flex size-6 cursor-pointer items-center justify-center rounded-full bg-line/80 text-ink-secondary outline-transparent hover:bg-line-strong hover:text-ink focus-visible:outline-2 focus-visible:outline-primary", children: _jsx(CloseIcon, { className: "size-3.5" }) }))] }), suggestions.length > 0 && (_jsx("ul", { role: "listbox", "aria-label": "\uC774\uBA54\uC77C \uB3C4\uBA54\uC778 \uC790\uB3D9\uC644\uC131", className: "subtle-scrollbar absolute top-full right-0 left-0 z-30 mt-1.5 max-h-52 divide-y divide-line overflow-y-auto rounded-card border border-line bg-surface py-1 shadow-md", children: suggestions.map((s, idx) => {
                    const active = idx === safeActiveIdx;
                    return (_jsx("li", { role: "option", "aria-selected": active, children: _jsxs("button", { type: "button", tabIndex: -1, onPointerDown: (e) => e.preventDefault(), onClick: () => applySuggestion(s.email), className: clsx("flex w-full cursor-pointer items-center px-3.5 py-2.5 text-left text-body-sm transition-colors", active ? "bg-primary-soft/65 text-ink" : "text-ink hover:bg-surface-subtle active:bg-canvas"), children: [_jsx("span", { className: "truncate text-ink-secondary", children: s.localPart }), _jsxs("span", { className: "shrink-0 font-semibold text-primary", children: ["@", s.domain] })] }) }, s.domain));
                }) }))] }));
}
/**
 * 비밀번호 입력창.
 * - 우측 눈 아이콘 버튼으로 비밀번호 보기(`text`) ↔ 숨기기(`password`) 즉시 전환
 */
export function PasswordInput({ size = "md", invalid = false, disabled, className, ...rest }) {
    const [visible, setVisible] = useState(false);
    return (_jsxs("div", { className: "relative flex w-full items-center", children: [_jsx("input", { type: visible ? "text" : "password", disabled: disabled, "aria-invalid": invalid || undefined, className: clsx(controlClass(size, invalid), "pr-11", className), ...rest }), _jsx("button", { type: "button", disabled: disabled, "aria-label": visible ? "비밀번호 숨기기" : "비밀번호 보기", "aria-pressed": visible, onClick: () => setVisible((v) => !v), className: "pressable absolute right-1.5 inline-flex size-8 cursor-pointer items-center justify-center rounded-control text-ink-muted outline-transparent hover:bg-line/50 hover:text-ink focus-visible:outline-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-40", children: visible ? _jsx(EyeOffIcon, { className: "size-4" }) : _jsx(EyeIcon, { className: "size-4" }) })] }));
}
export function stripBirthDigits(value) {
    return value.replace(/\D/g, "").slice(0, 8);
}
export function formatBirthDate(value) {
    const digits = stripBirthDigits(value);
    if (digits.length <= 4)
        return digits;
    if (digits.length <= 6)
        return `${digits.slice(0, 4)}.${digits.slice(4)}`;
    return `${digits.slice(0, 4)}.${digits.slice(4, 6)}.${digits.slice(6, 8)}`;
}
/**
 * 생년월일 8자리 입력창 (`YYYY.MM.DD` 자동 포맷 + 모바일 숫자 키패드).
 * - 주류 스마트오더 성인인증·회원가입 시 달력을 수십 번 넘기지 않고 숫자만 치면 `1995.08.15`로 자동 마스킹
 * - `name`이 주어지면 hidden input으로 깨끗한 숫자 8자리(`19950815`)를 폼에 전송
 */
export function BirthDateInput({ name, size = "md", invalid = false, value: controlled, defaultValue = "", placeholder = "YYYY.MM.DD (8자리)", disabled, onChange, className, ...rest }) {
    const [inner, setInner] = useState(() => stripBirthDigits(defaultValue));
    const digits = controlled !== undefined ? stripBirthDigits(controlled) : inner;
    const formatted = formatBirthDate(digits);
    function handleChange(raw) {
        const nextDigits = stripBirthDigits(raw);
        if (controlled === undefined)
            setInner(nextDigits);
        onChange?.(nextDigits, formatBirthDate(nextDigits));
    }
    return (_jsxs("div", { className: "relative flex w-full items-center", children: [name && _jsx("input", { type: "hidden", name: name, value: digits }), _jsx("input", { type: "text", inputMode: "numeric", autoComplete: "bday", maxLength: 10, disabled: disabled, "aria-invalid": invalid || undefined, value: formatted, placeholder: placeholder, onChange: (e) => handleChange(e.target.value), className: clsx(controlClass(size, invalid), "pr-10 tabular-nums tracking-wide", className), ...rest }), _jsx(CalendarIcon, { className: "pointer-events-none absolute right-3.5 text-ink-muted" })] }));
}
export function stripPhoneDigits(value) {
    return value.replace(/\D/g, "").slice(0, 11);
}
export function formatPhoneNumber(value) {
    const digits = stripPhoneDigits(value);
    if (digits.startsWith("02")) {
        const d = digits.slice(0, 10);
        if (d.length <= 2)
            return d;
        if (d.length <= 5)
            return `${d.slice(0, 2)}-${d.slice(2)}`;
        if (d.length <= 9)
            return `${d.slice(0, 2)}-${d.slice(2, 5)}-${d.slice(5)}`;
        return `${d.slice(0, 2)}-${d.slice(2, 6)}-${d.slice(6, 10)}`;
    }
    if (digits.length <= 3)
        return digits;
    if (digits.length <= 7)
        return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    if (digits.length <= 10) {
        return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
    }
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
}
/**
 * 휴대폰·연락처 번호 입력창 (`010-1234-5678` / `02-1234-5678` 자동 하이픈 포맷 + 숫자 키패드).
 * - `name`이 주어지면 hidden input으로 하이픈이 제거된 순수 숫자열을 폼에 전송
 */
export function PhoneInput({ name, size = "md", invalid = false, value: controlled, defaultValue = "", placeholder = "010-0000-0000", clearable = true, disabled, onChange, className, ...rest }) {
    const [inner, setInner] = useState(() => stripPhoneDigits(defaultValue));
    const inputRef = useRef(null);
    const digits = controlled !== undefined ? stripPhoneDigits(controlled) : inner;
    const formatted = formatPhoneNumber(digits);
    const showClear = clearable && !disabled && digits.length > 0;
    function commit(raw) {
        const nextDigits = stripPhoneDigits(raw);
        if (controlled === undefined)
            setInner(nextDigits);
        onChange?.(nextDigits, formatPhoneNumber(nextDigits));
    }
    return (_jsxs("div", { className: "relative flex w-full items-center", children: [name && _jsx("input", { type: "hidden", name: name, value: digits }), _jsx("input", { ref: inputRef, type: "tel", inputMode: "numeric", autoComplete: "tel", maxLength: 13, disabled: disabled, "aria-invalid": invalid || undefined, value: formatted, placeholder: placeholder, onChange: (e) => commit(e.target.value), className: clsx(controlClass(size, invalid), showClear && "pr-10", "tabular-nums tracking-wide", className), ...rest }), showClear && (_jsx("button", { type: "button", "aria-label": "\uC5F0\uB77D\uCC98 \uC9C0\uC6B0\uAE30", onClick: () => {
                    commit("");
                    inputRef.current?.focus();
                }, className: "pressable absolute right-1.5 inline-flex size-8 cursor-pointer items-center justify-center rounded-control text-ink-muted outline-transparent hover:bg-surface-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-primary", children: _jsx(CloseIcon, { className: "size-4" }) }))] }));
}
/**
 * 모바일 OTP 인증번호 분할 입력창.
 * - 숫자 입력 시 자동으로 다음 칸 이동, Backspace 시 이전 칸 이동 및 삭제
 * - SMS 인증번호 자동완성(`autoComplete="one-time-code"`) 및 전체 붙여넣기 지원
 */
export function OtpInput({ id, name, length = 6, value: controlled, defaultValue = "", invalid = false, disabled = false, onChange, onComplete, className, }) {
    const sanitize = (s) => s.replace(/\D/g, "").slice(0, length);
    const [inner, setInner] = useState(() => sanitize(defaultValue));
    const code = controlled !== undefined ? sanitize(controlled) : inner;
    const refs = useRef([]);
    const chars = Array.from({ length }, (_, i) => code[i] ?? "");
    function updateCode(nextChars, focusIdx) {
        const joined = nextChars.join("").replace(/\D/g, "").slice(0, length);
        if (controlled === undefined)
            setInner(joined);
        onChange?.(joined);
        if (joined.length === length)
            onComplete?.(joined);
        if (focusIdx !== undefined) {
            const clamped = Math.max(0, Math.min(length - 1, focusIdx));
            refs.current[clamped]?.focus();
        }
    }
    function handleInput(index, raw) {
        const digits = raw.replace(/\D/g, "");
        if (!digits) {
            const next = [...chars];
            next[index] = "";
            updateCode(next);
            return;
        }
        // SMS 자동완성 등으로 한 번에 여러 글자가 들어온 경우
        if (digits.length > 1) {
            const next = [...chars];
            for (let i = 0; i < digits.length && index + i < length; i++) {
                next[index + i] = digits[i];
            }
            updateCode(next, Math.min(length - 1, index + digits.length));
            return;
        }
        const next = [...chars];
        next[index] = digits[0];
        updateCode(next, index < length - 1 ? index + 1 : index);
    }
    function handleKeyDown(index, e) {
        if (e.key === "Backspace") {
            if (chars[index]) {
                e.preventDefault();
                const next = [...chars];
                next[index] = "";
                updateCode(next, index);
            }
            else if (index > 0) {
                e.preventDefault();
                const next = [...chars];
                next[index - 1] = "";
                updateCode(next, index - 1);
            }
        }
        else if (e.key === "ArrowLeft" && index > 0) {
            e.preventDefault();
            refs.current[index - 1]?.focus();
        }
        else if (e.key === "ArrowRight" && index < length - 1) {
            e.preventDefault();
            refs.current[index + 1]?.focus();
        }
    }
    function handlePaste(index, e) {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
        if (!pasted)
            return;
        const next = [...chars];
        for (let i = 0; i < pasted.length && index + i < length; i++) {
            next[index + i] = pasted[i];
        }
        updateCode(next, Math.min(length - 1, index + pasted.length));
    }
    return (_jsxs("div", { role: "group", "aria-label": "\uC778\uC99D\uBC88\uD638 \uC785\uB825", className: clsx("flex w-full items-center gap-2", className), children: [name && _jsx("input", { type: "hidden", name: name, value: code }), chars.map((ch, i) => (_jsx("input", { ref: (el) => {
                    refs.current[i] = el;
                }, id: i === 0 ? id : undefined, type: "text", inputMode: "numeric", autoComplete: i === 0 ? "one-time-code" : "off", maxLength: length, disabled: disabled, "aria-label": `인증번호 ${i + 1}번째 자리`, "aria-invalid": invalid || undefined, value: ch, onFocus: (e) => e.currentTarget.select(), onChange: (e) => handleInput(i, e.target.value), onKeyDown: (e) => handleKeyDown(i, e), onPaste: (e) => handlePaste(i, e), className: clsx("h-12 min-w-0 flex-1 rounded-control border text-center text-title font-bold tabular-nums text-ink outline-none transition-[color,background-color,border-color,box-shadow,transform,scale] duration-160 ease-out", "focus:scale-[1.03] focus:bg-surface focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50", invalid
                    ? "border-danger bg-danger-soft/40 focus:border-danger focus:ring-danger/15"
                    : ch
                        ? "border-line-strong bg-surface focus:border-primary focus:ring-primary/15"
                        : "border-transparent bg-canvas/70 hover:border-line focus:border-primary focus:ring-primary/15") }, i)))] }));
}
export function computeTextareaLayout(scrollHeight, maxHeight = 140, minHeight = 44) {
    const raw = Math.max(minHeight, scrollHeight);
    if (raw > maxHeight) {
        return { height: maxHeight, overflowY: "auto" };
    }
    return { height: raw, overflowY: "hidden" };
}
/**
 * 모바일 자동 높이 조절(auto-grow) 텍스트 입력.
 * - 기본 1줄(`rows={1}`, 최소 44px)에서 시작해 엔터·줄바꿈마다 높이가 자동으로 늘어남
 * - `maxHeight`가 주어지면 텍스트에어리어 **내부 좌측 하단**에 글자수 카운터(`현재 / 최대`)가 위치하며, 본문과 겹치지 않게 하단 여백 확보
 * - 스크롤바는 시각적으로 보이지 않게 숨김(`subtle-scrollbar`) + 리사이즈 그립 제거(`resize-none`)
 */
export function Textarea({ invalid = false, rows = 1, maxLength, maxHeight = 140, value: controlled, defaultValue, onChange, style, className, disabled, ...rest }) {
    const [inner, setInner] = useState(() => String(defaultValue ?? ""));
    const current = controlled !== undefined ? String(controlled) : inner;
    const ref = useRef(null);
    const adjustHeight = useCallback(() => {
        const el = ref.current;
        if (!el)
            return;
        el.style.height = "auto";
        const layout = computeTextareaLayout(el.scrollHeight, maxHeight, 36);
        el.style.height = `${layout.height}px`;
        el.style.overflowY = layout.overflowY;
    }, [maxHeight]);
    useEffect(() => {
        adjustHeight();
    }, [current, adjustHeight]);
    if (!maxLength) {
        return (_jsx("textarea", { ref: ref, rows: rows, disabled: disabled, value: controlled, defaultValue: defaultValue, "aria-invalid": invalid || undefined, style: { maxHeight: `${maxHeight}px`, ...style }, onChange: (e) => {
                if (controlled === undefined)
                    setInner(e.target.value);
                adjustHeight();
                onChange?.(e);
            }, className: clsx("subtle-scrollbar min-h-11 w-full min-w-0 resize-none overflow-y-hidden rounded-control border bg-canvas/70 px-3.5 py-2.5 text-body leading-[1.5] text-ink outline-none transition-[color,background-color,border-color,box-shadow] duration-150 ease-out placeholder:text-ink-muted", "focus:bg-surface focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50", invalid
                ? "border-danger focus:border-danger focus:ring-danger/15"
                : "border-transparent hover:border-line focus:border-primary focus:ring-primary/15", className), ...rest }));
    }
    return (_jsxs("div", { className: clsx("flex w-full flex-col overflow-hidden rounded-control border bg-canvas/70 transition-[background-color,border-color,box-shadow] duration-150 ease-out", "focus-within:bg-surface focus-within:ring-2", disabled && "cursor-not-allowed opacity-50", invalid
            ? "border-danger focus-within:border-danger focus-within:ring-danger/15"
            : "border-transparent hover:border-line focus-within:border-primary focus-within:ring-primary/15"), children: [_jsx("textarea", { ref: ref, rows: rows, maxLength: maxLength, disabled: disabled, value: controlled, defaultValue: defaultValue, "aria-invalid": invalid || undefined, style: { maxHeight: `${maxHeight}px`, ...style }, onChange: (e) => {
                    if (controlled === undefined)
                        setInner(e.target.value);
                    adjustHeight();
                    onChange?.(e);
                }, className: clsx("subtle-scrollbar min-h-11 w-full min-w-0 resize-none overflow-y-hidden bg-transparent px-3.5 pt-2.5 pb-1 text-body leading-[1.5] text-ink outline-none placeholder:text-ink-muted disabled:cursor-not-allowed", className), ...rest }), _jsxs("div", { "aria-hidden": "true", onClick: () => ref.current?.focus(), className: "select-none px-3.5 pb-2 text-right text-caption tabular-nums text-ink-muted", children: [current.length, " / ", maxLength] })] }));
}
/**
 * 인풋 + 버튼 결합형(검색창·쿠폰코드 입력창 등).
 * - 좌측 돋보기 아이콘 + 검색어 입력 시 나타나는 지우기(×) 버튼 + 우측에 붙은 실행 버튼
 */
export function SearchBar({ size = "md", buttonLabel = "검색", buttonVariant = "primary", loading = false, value: controlled, defaultValue, onChange, onClear, disabled, className, ...rest }) {
    const [inner, setInner] = useState(() => String(defaultValue ?? ""));
    const val = controlled !== undefined ? String(controlled) : inner;
    const inputRef = useRef(null);
    function clear() {
        if (controlled === undefined)
            setInner("");
        if (inputRef.current) {
            inputRef.current.value = "";
            inputRef.current.focus();
        }
        onClear?.();
    }
    return (_jsxs("div", { className: clsx("flex w-full items-center gap-2", className), children: [_jsxs("div", { className: "relative flex min-w-0 flex-1 items-center", children: [_jsx(SearchIcon, { className: "pointer-events-none absolute left-3.5 size-4 text-ink-muted" }), _jsx("input", { ref: inputRef, type: "search", disabled: disabled, value: controlled, defaultValue: defaultValue, onChange: (e) => {
                            if (controlled === undefined)
                                setInner(e.target.value);
                            onChange?.(e);
                        }, className: clsx(controlClass(size, false), "pl-9 [&::-webkit-search-cancel-button]:hidden", val.length > 0 && "pr-9"), ...rest }), val.length > 0 && !disabled && (_jsx("button", { type: "button", "aria-label": "\uAC80\uC0C9\uC5B4 \uC9C0\uC6B0\uAE30", onClick: clear, className: "pressable absolute right-2 inline-flex size-6 cursor-pointer items-center justify-center rounded-full bg-line/80 text-ink-secondary outline-transparent hover:bg-line-strong hover:text-ink focus-visible:outline-2 focus-visible:outline-primary", children: _jsx(CloseIcon, { className: "size-3.5" }) }))] }), buttonLabel && (_jsx(Button, { type: "submit", size: size, variant: buttonVariant, disabled: disabled, loading: loading, className: "shrink-0", children: buttonLabel }))] }));
}
export function Field({ label, htmlFor, required, help, error, children }) {
    return (_jsxs("div", { className: "flex flex-col gap-1.5", children: [_jsxs("label", { htmlFor: htmlFor, className: "text-body-sm font-semibold text-ink-secondary", children: [label, required && (_jsx("span", { "aria-hidden": "true", className: "ml-0.5 text-danger", children: "*" }))] }), children, error ? (_jsx("p", { role: "alert", className: "text-caption text-danger", children: error })) : (help && _jsx("p", { className: "text-caption text-ink-muted", children: help }))] }));
}
