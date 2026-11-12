import { type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from "react";
import { type ButtonVariant } from "./Button.js";
declare const SIZES: {
    readonly sm: "h-9 px-3 text-body-sm";
    readonly md: "h-11 px-3.5 text-body";
    readonly lg: "h-[52px] px-4 text-section";
};
export type ControlSize = keyof typeof SIZES;
export declare function controlClass(size?: ControlSize, invalid?: boolean): string;
export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
    size?: ControlSize;
    invalid?: boolean;
};
export declare function Input({ size, invalid, className, ...rest }: InputProps): import("react").JSX.Element;
export declare const DEFAULT_EMAIL_DOMAINS: readonly ["naver.com", "gmail.com", "kakao.com", "hanmail.net", "daum.net", "nate.com", "icloud.com"];
export declare function isValidEmail(value: string): boolean;
export declare function buildEmailSuggestions(rawValue: string, domains?: readonly string[]): {
    email: string;
    localPart: string;
    domain: string;
}[];
export type EmailInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "value" | "defaultValue" | "onChange"> & {
    size?: ControlSize;
    invalid?: boolean;
    value?: string;
    defaultValue?: string;
    /** 자동완성 도메인 목록 (`[]` 전달 시 도메인 추천 비활성화) */
    domains?: readonly string[];
    onChange?: (value: string) => void;
};
/**
 * 모바일 이메일 입력창 (`@도메인` 실시간 자동완성 추천 + 원터치 지우기).
 * - 아이디만 입력해도 주요 메일 도메인을 하단 리스트로 제안해 영문 타이핑 부담 최소화
 */
export declare function EmailInput({ id, name, size, invalid, value: controlled, defaultValue, domains, placeholder, disabled, onChange, onFocus, onBlur, onKeyDown, className, ...rest }: EmailInputProps): import("react").JSX.Element;
export type PasswordInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> & {
    size?: ControlSize;
    invalid?: boolean;
};
/**
 * 비밀번호 입력창.
 * - 우측 눈 아이콘 버튼으로 비밀번호 보기(`text`) ↔ 숨기기(`password`) 즉시 전환
 */
export declare function PasswordInput({ size, invalid, disabled, className, ...rest }: PasswordInputProps): import("react").JSX.Element;
export declare function stripBirthDigits(value: string): string;
export declare function formatBirthDate(value: string): string;
export type BirthDateInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "value" | "defaultValue" | "onChange"> & {
    size?: ControlSize;
    invalid?: boolean;
    value?: string;
    defaultValue?: string;
    /** 숫자 8자리(예: "19950815")와 포맷된 문자열("1995.08.15")을 함께 전달 */
    onChange?: (digits: string, formatted: string) => void;
};
/**
 * 생년월일 8자리 입력창 (`YYYY.MM.DD` 자동 포맷 + 모바일 숫자 키패드).
 * - 주류 스마트오더 성인인증·회원가입 시 달력을 수십 번 넘기지 않고 숫자만 치면 `1995.08.15`로 자동 마스킹
 * - `name`이 주어지면 hidden input으로 깨끗한 숫자 8자리(`19950815`)를 폼에 전송
 */
export declare function BirthDateInput({ name, size, invalid, value: controlled, defaultValue, placeholder, disabled, onChange, className, ...rest }: BirthDateInputProps): import("react").JSX.Element;
export declare function stripPhoneDigits(value: string): string;
export declare function formatPhoneNumber(value: string): string;
export type PhoneInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "value" | "defaultValue" | "onChange"> & {
    size?: ControlSize;
    invalid?: boolean;
    value?: string;
    defaultValue?: string;
    clearable?: boolean;
    /** 순수 숫자열("01012345678")과 하이픈 포맷("010-1234-5678")을 함께 전달 */
    onChange?: (digits: string, formatted: string) => void;
};
/**
 * 휴대폰·연락처 번호 입력창 (`010-1234-5678` / `02-1234-5678` 자동 하이픈 포맷 + 숫자 키패드).
 * - `name`이 주어지면 hidden input으로 하이픈이 제거된 순수 숫자열을 폼에 전송
 */
export declare function PhoneInput({ name, size, invalid, value: controlled, defaultValue, placeholder, clearable, disabled, onChange, className, ...rest }: PhoneInputProps): import("react").JSX.Element;
export type OtpInputProps = {
    id?: string;
    name?: string;
    /** 자리수 (기본 6자리) */
    length?: number;
    value?: string;
    defaultValue?: string;
    invalid?: boolean;
    disabled?: boolean;
    onChange?: (code: string) => void;
    /** 모든 자리를 다 채웠을 때 호출 */
    onComplete?: (code: string) => void;
    className?: string;
};
/**
 * 모바일 OTP 인증번호 분할 입력창.
 * - 숫자 입력 시 자동으로 다음 칸 이동, Backspace 시 이전 칸 이동 및 삭제
 * - SMS 인증번호 자동완성(`autoComplete="one-time-code"`) 및 전체 붙여넣기 지원
 */
export declare function OtpInput({ id, name, length, value: controlled, defaultValue, invalid, disabled, onChange, onComplete, className, }: OtpInputProps): import("react").JSX.Element;
export declare function computeTextareaLayout(scrollHeight: number, maxHeight?: number, minHeight?: number): {
    height: number;
    overflowY: "hidden" | "auto";
};
export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    invalid?: boolean;
    /** 최대 높이(px). 이 높이를 넘기면 내부 스크롤로 전환된다 (기본 140px) */
    maxHeight?: number;
};
/**
 * 모바일 자동 높이 조절(auto-grow) 텍스트 입력.
 * - 기본 1줄(`rows={1}`, 최소 44px)에서 시작해 엔터·줄바꿈마다 높이가 자동으로 늘어남
 * - `maxHeight`가 주어지면 텍스트에어리어 **내부 좌측 하단**에 글자수 카운터(`현재 / 최대`)가 위치하며, 본문과 겹치지 않게 하단 여백 확보
 * - 스크롤바는 시각적으로 보이지 않게 숨김(`subtle-scrollbar`) + 리사이즈 그립 제거(`resize-none`)
 */
export declare function Textarea({ invalid, rows, maxLength, maxHeight, value: controlled, defaultValue, onChange, style, className, disabled, ...rest }: TextareaProps): import("react").JSX.Element;
export type SearchBarProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> & {
    size?: ControlSize;
    /** 우측에 붙는 액션 버튼 문구 (기본 "검색") */
    buttonLabel?: ReactNode;
    buttonVariant?: ButtonVariant;
    loading?: boolean;
    onClear?: () => void;
};
/**
 * 인풋 + 버튼 결합형(검색창·쿠폰코드 입력창 등).
 * - 좌측 돋보기 아이콘 + 검색어 입력 시 나타나는 지우기(×) 버튼 + 우측에 붙은 실행 버튼
 */
export declare function SearchBar({ size, buttonLabel, buttonVariant, loading, value: controlled, defaultValue, onChange, onClear, disabled, className, ...rest }: SearchBarProps): import("react").JSX.Element;
export type FieldProps = {
    label: string;
    htmlFor: string;
    required?: boolean;
    help?: string;
    error?: string;
    children: ReactNode;
};
export declare function Field({ label, htmlFor, required, help, error, children }: FieldProps): import("react").JSX.Element;
export {};
