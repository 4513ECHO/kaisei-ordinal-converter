import { createContext, type Dispatch, type SetStateAction } from "react";

export const KindContext = createContext<
  [[string, string], Dispatch<SetStateAction<[string, string]>>]
>([["", ""], () => {}]);

export const ClassContext = createContext<
  [
    { ordinal?: number; color?: string },
    Dispatch<SetStateAction<{ ordinal?: number; color?: string }>>,
  ]
>([{}, () => {}]);

export const YearContext = createContext<
  [number, Dispatch<SetStateAction<number>>]
>([0, () => {}]);

export const FesOrdinalContext = createContext<
  [number | undefined, Dispatch<SetStateAction<number | undefined>>]
>([0, () => {}]);

export type Query =
  | { kind: "year"; year: number }
  | { kind: "fes_ordinal"; ordinal: number }
  | { kind: "class"; ordinal: number; color: string };

export const fesFirstYear = 1872;
export const colorData: Record<string, [string, number]> = {
  purple: ["紫", 1957],
  white: ["白", 1946],
  blue: ["青", 1946],
  green: ["緑", 1946],
  orange: ["橙", 1962],
  yellow: ["黄", 1946],
  red: ["赤", 1946],
  black: ["黒", 1976],
};

const suffixes = ["th", "st", "nd", "rd"] as const;
export function getOrdinalSuffix(ordinal: number): string {
  const mod100 = ordinal % 100;
  return suffixes[(mod100 - 20) % 10] ?? suffixes[mod100] ?? suffixes[0];
}

export function withOrdinalSuffix(ordinal: number): string {
  return ordinal + getOrdinalSuffix(ordinal);
}
