import { type ActionDispatch, type ChangeEvent, createContext } from "react";

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
    to: Kind | "";
  };
  team: {
    ordinal: number | "";
    color: Color | "";
  };
  year: number | "";
  fesOrdinal: number | "";
};

export type Action = {
  type:
    | "setKindFrom"
    | "setKindTo"
    | "setTeamOrdinal"
    | "setTeamColor"
    | "setYear"
    | "setFesOrdinal";
  payload: string;
} | {
  type: "swapKind";
};

export const initialState: State = {
  kind: {
    from: "team",
    to: "",
  },
  team: {
    ordinal: "",
    color: "",
  },
  year: "",
  fesOrdinal: "",
};

function isKind(x: string): x is Kind {
  return ["team", "year", "fes_ordinal"].includes(x);
}

function isColor(x: string): x is Color {
  return [
    "purple",
    "white",
    "blue",
    "green",
    "orange",
    "yellow",
    "red",
    "black",
  ].includes(x);
}

function asInteger(x: string): number | null {
  const payload = Number(x);
  if (Number.isSafeInteger(payload)) {
    return payload;
  }
  return null;
}

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "setKindFrom": {
      if (!isKind(action.payload)) {
        return state;
      }
      return { ...state, kind: { ...state.kind, from: action.payload } };
    }
    case "setKindTo": {
      if (!isKind(action.payload) && action.payload !== "") {
        return state;
      }
      return { ...state, kind: { ...state.kind, to: action.payload } };
    }
    case "setTeamOrdinal": {
      const ordinal = asInteger(action.payload);
      if (!ordinal) {
        return state;
      }
      return { ...state, team: { ...state.team, ordinal } };
    }
    case "setTeamColor": {
      if (!isColor(action.payload)) {
        return state;
      }
      return { ...state, team: { ...state.team, color: action.payload } };
    }
    case "setYear": {
      const year = asInteger(action.payload);
      if (!year) {
        return state;
      }
      return { ...state, year };
    }
    case "setFesOrdinal": {
      const fesOrdinal = asInteger(action.payload);
      if (!fesOrdinal) {
        return state;
      }
      return { ...state, fesOrdinal };
    }
    case "swapKind": {
      const { from, to } = state.kind;
      if (to === "") {
        return state;
      }
      return { ...state, kind: { from: to, to: from } };
    }
    default: {
      const _: never = action;
      throw new Error(`Unknown action: ${action}`);
    }
  }
}

export const Context = createContext<
  [
    state: State,
    dispatch: ActionDispatch<[action: Action]>,
    handleChange: (
      type: string,
    ) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
  ]
>([initialState, () => {}, () => () => {}]);
