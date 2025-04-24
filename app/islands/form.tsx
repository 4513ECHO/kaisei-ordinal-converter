import { type FormEvent, type JSX, useState } from "react";
import {
  ClassContext,
  FesOrdinalContext,
  KindContext,
  type Query,
  YearContext,
} from "./context.ts";
import YearSelector, { showYearResult } from "./year_selector.tsx";
import ClassSelector, { showClassResult } from "./class_selector.tsx";
import KindSelector from "./kind_selector.tsx";
import FesOrdinalSelector, {
  showFesOrdinalResult,
} from "./fes_ordinal_selector.tsx";

export default function Form() {
  const [kind, setKind] = useState<[string, string]>(["class", ""]);
  const [data, setData] = useState<{ ordinal?: number; color?: string }>({});
  const [year, setYear] = useState(new Date().getFullYear());
  const [fesOrdinal, setFesOrdinal] = useState<number>();
  const [result, setResult] = useState<string | JSX.Element | null>(null);
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: validate this
    const query = {
      kind: kind[1] as Query["kind"],
      ...data,
      ...year ? { year } : {},
      ...fesOrdinal ? { ordinal: fesOrdinal } : {},
    } as Query;
    console.log({ kind, query });
    switch (kind[0]) {
      case "class":
        setResult(
          showClassResult(data as { ordinal: number; color: string }, query),
        );
        break;
      case "year":
        setResult(showYearResult(year, query));
        break;
      case "fes_ordinal":
        setResult(showFesOrdinalResult(fesOrdinal!, query));
        break;
    }
  }
  return (
    <form onSubmit={handleSubmit} className="p-6">
      <KindContext.Provider value={[kind, setKind]}>
        <KindSelector />
      </KindContext.Provider>
      {kind[0] === "year"
        ? (
          <YearContext.Provider value={[year, setYear]}>
            <YearSelector />
          </YearContext.Provider>
        )
        : kind[0] === "fes_ordinal"
        ? (
          <FesOrdinalContext.Provider value={[fesOrdinal, setFesOrdinal]}>
            <FesOrdinalSelector />
          </FesOrdinalContext.Provider>
        )
        : kind[0] === "class"
        ? (
          <ClassContext.Provider value={[data, setData]}>
            <ClassSelector />
          </ClassContext.Provider>
        )
        : kind[0] === ""
        ? null
        : <p>Invalid kind: {kind[0]}</p>}

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
