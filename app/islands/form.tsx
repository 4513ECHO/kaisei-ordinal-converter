import {
  type ChangeEvent,
  type FormEvent,
  type JSX,
  useReducer,
  useState,
} from "react";
import { Context, initialState, reducer } from "./state.ts";
import YearSelector, { showYearResult } from "./year_selector.tsx";
import ClassSelector, { showClassResult } from "./class_selector.tsx";
import KindSelector from "./kind_selector.tsx";
import FesOrdinalSelector, {
  showFesOrdinalResult,
} from "./fes_ordinal_selector.tsx";

export default function Form() {
  const [state, dispatch] = useReducer(reducer, initialState);
  function handleChange(type: string) {
    return (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      dispatch({
        type: type as Parameters<typeof dispatch>[0]["type"],
        payload: e.target.value,
      });
  }
  const [result, setResult] = useState<string | JSX.Element | null>(null);
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log({ state });
    switch (state.kind.from) {
      case "team":
        setResult(showClassResult(state));
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
          ? <ClassSelector />
          : <p>Invalid kind: {state.kind.from}</p>}
      </Context>

      <button
        className="rounded-md px-4 py-2 bg-sky-500 text-white hover:bg-sky-400"
        type="submit"
      >
        変換
      </button>

      {result && <div className="pt-4">{result}</div>}
    </form>
  );
}
