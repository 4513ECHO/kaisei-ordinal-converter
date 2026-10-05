import type { Color } from "./state.ts";

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
const teamData = {
  purple: ["紫", 1957],
  white: ["白", 1946],
  blue: ["青", 1946],
  green: ["緑", 1946],
  orange: ["橙", 1962],
  yellow: ["黄", 1946],
  red: ["赤", 1946],
  black: ["黒", 1976],
} as const satisfies Record<Color, [string, number]>;

export function formatTeam(color: Color, ordinal: number): string {
  return `第${ordinal}代${teamData[color][0]}組`;
}

export function getTeamFirstYear(color: Color): number {
  return teamData[color][1];
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
