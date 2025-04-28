import type { Color } from "./state.ts";

const suffixes = ["th", "st", "nd", "rd"] as const;
export function getOrdinalSuffix(ordinal: number): string {
  const mod100 = ordinal % 100;
  return suffixes[(mod100 - 20) % 10] ?? suffixes[mod100] ?? suffixes[0];
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
