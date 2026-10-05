import { createStore, produce } from "solid-js/store";
import type { JSX } from "solid-js";
import { asInteger } from "./utils.ts";

export const COLORS = [
  "purple",
  "white",
  "blue",
  "green",
  "orange",
  "yellow",
  "red",
  "black",
] as const;
export type Color = typeof COLORS[number];
export type Kind = "team" | "year" | "fes_ordinal";

export type State = {
  kind: {
    from: Kind;
    to?: Kind;
  };
  team: {
    ordinal?: number;
    color?: Color;
  };
  year?: number;
  fesOrdinal?: number;
};

type FilledState<From extends Kind = never, To extends Kind = Kind> =
  & State
  & { kind: { from: From; to: To } }
  & (From extends "team" ? { team: { ordinal: number; color: Color } }
    : From extends "year" ? { year: number }
    : From extends "fes_ordinal" ? { fesOrdinal: number }
    : never);

export const initialState: State = {
  kind: {
    from: "team",
  },
  team: {},
};

function isKind(x: unknown): x is Kind {
  return typeof x === "string" && ["team", "year", "fes_ordinal"].includes(x);
}

function isColor(x: unknown): x is Color {
  return typeof x === "string" && (COLORS as readonly string[]).includes(x);
}

const [state, setState] = createStore<State>(initialState);

export { state };

export function setAsInteger(
  key: "year" | "fesOrdinal" | "team",
  value: string,
) {
  const intValue = asInteger(value);
  if (intValue === null) return;
  if (key === "team") {
    setState("team", "ordinal", intValue);
  } else {
    setState(key, intValue);
  }
}

export function setColor(color: string) {
  if (!isColor(color)) return;
  setState("team", "color", color);
}

export function setKindFrom(kind: string) {
  if (!isKind(kind)) return;
  setState("kind", "from", kind);
}

export function setKindTo(kind: string) {
  if (!isKind(kind)) return;
  setState("kind", "to", kind);
}

export function swapKind() {
  setState(
    "kind",
    produce<State["kind"]>((kind) => {
      const { from, to } = kind;
      if (!to) return;
      kind.from = to;
      kind.to = from;
    }),
  );
}

export type Converter<From extends Kind> = {
  [To in Exclude<Kind, From>]: (state: FilledState<From, To>) => JSX.Element;
};

export function convert<From extends Kind, To extends Exclude<Kind, From>>(
  state: State,
  converters: { [F in Kind]: Converter<F> },
): JSX.Element {
  const { from, to } = (state as FilledState<From, To>).kind;
  return (converters[from][to] as (state: State) => JSX.Element)(state);
}
