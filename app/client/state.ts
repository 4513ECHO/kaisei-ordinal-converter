import { createStore, produce } from "solid-js/store";

export const colors = [
  "purple",
  "white",
  "blue",
  "green",
  "orange",
  "yellow",
  "red",
  "black",
] as const;
export type Color = typeof colors[number];
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
  return typeof x === "string" && (colors as readonly string[]).includes(x);
}

function asInteger(x: string): number | null {
  if (x.trim() === "") {
    return null;
  }
  const payload = Number(x);
  if (Number.isSafeInteger(payload)) {
    return payload;
  }
  return null;
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
