import {
  type ChangeEvent,
  type FormEvent,
  type JSX,
  useReducer,
  useState,
} from "react";
import { type Action, Context, initialState, reducer } from "./state.ts";
import YearSelector, { showYearResult } from "./year_selector.tsx";
import TeamSelector, { showTeamResult } from "./team_selector.tsx";
import KindSelector from "./kind_selector.tsx";
import FesOrdinalSelector, {
  showFesOrdinalResult,
} from "./fes_ordinal_selector.tsx";

export default function Form() {
  const [state, dispatch] = useReducer(reducer, initialState);
  function handleChange(type: Action["type"]) {
    return (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      dispatch({ type: type, payload: e.target.value });
  }
  const [result, setResult] = useState<string | JSX.Element | null>(null);
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log({ state });
    switch (state.kind.from) {
      case "team":
        setResult(showTeamResult(state));
        break;
      case "year":
        setResult(showYearResult(state));
        break;
      case "fes_ordinal":
        setResult(showFesOrdinalResult(state));
        break;
    }
  }
  return (
    <form onSubmit={handleSubmit} className="p-6">
      <Context value={[state, dispatch, handleChange]}>
        <KindSelector />
        {state.kind.from === "year"
          ? <YearSelector />
          : state.kind.from === "fes_ordinal"
          ? <FesOrdinalSelector />
          : state.kind.from === "team"
          ? <TeamSelector />
          : <p>Invalid kind: {state.kind.from}</p>}
      </Context>

      <button
        className="py-2 px-4 text-white rounded-md bg-sky-500 hover:bg-sky-400"
        type="submit"
      >
        変換
      </button>

      {result && <output className="block pt-4">{result}</output>}
    </form>
  );
}
