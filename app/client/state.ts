import { createStore } from "solid-js";
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
  setState((draft) => {
    if (key === "team") {
      draft.team.ordinal = intValue;
    } else {
      draft[key] = intValue;
    }
  });
}

export function setColor(color: string) {
  if (!isColor(color)) return;
  setState((draft) => {
    draft.team.color = color;
  });
}

export function setKindFrom(kind: string) {
  if (!isKind(kind)) return;
  setState((draft) => {
    draft.kind.from = kind;
  });
}

export function setKindTo(kind: string) {
  if (!isKind(kind)) return;
  setState((draft) => {
    draft.kind.to = kind;
  });
}

export function swapKind() {
  setState((draft) => {
    const { from, to } = draft.kind;
    if (!to) return;
    draft.kind.from = to;
    draft.kind.to = from;
  });
}
