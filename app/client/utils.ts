import { type Color, COLORS } from "./state.ts";

const plualRules = new Intl.PluralRules("en", { type: "ordinal" });
const suffixes: Partial<Record<Intl.LDMLPluralRule, string>> = {
  one: "st",
  two: "nd",
  few: "rd",
  other: "th",
};

export function getOrdinalSuffix(ordinal: number): string {
  return suffixes[plualRules.select(ordinal)] ?? "";
}

export function withOrdinalSuffix(ordinal: number): string {
  return ordinal + getOrdinalSuffix(ordinal);
}

export const fesFirstYear = 1872;

export const COLORS_JA = [
  "紫",
  "白",
  "青",
  "緑",
  "橙",
  "黄",
  "赤",
  "黒",
] as const;

const TEAM_FIRST_YEARS = [
  1957, // 紫組
  1946, // 白組
  1946, // 青組
  1946, // 緑組
  1962, // 橙組
  1946, // 黄組
  1946, // 赤組
  1976, // 黒組
] as const;

export function formatTeam(color: Color, ordinal: number): string {
  return `第${ordinal}代${COLORS_JA[COLORS.indexOf(color)]}組`;
}

export function getTeamFirstYear(color: Color): number {
  return TEAM_FIRST_YEARS[COLORS.indexOf(color)]!;
}

export function asInteger(x: string): number | null {
  if (x.trim() === "") {
    return null;
  }
  const payload = Number(x);
  if (Number.isSafeInteger(payload)) {
    return payload;
  }
  return null;
}
