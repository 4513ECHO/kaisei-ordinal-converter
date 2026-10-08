import { createSignal, Match, Switch } from "solid-js";
import type { JSX } from "@solidjs/web";
import { state } from "./state.ts";
import YearSelector from "./year_selector.tsx";
import TeamSelector from "./team_selector.tsx";
import KindSelector from "./kind_selector.tsx";
import FesOrdinalSelector from "./fes_ordinal_selector.tsx";
import convert from "./converter.tsx";

export default function Form() {
  const [result, setResult] = createSignal<JSX.Element>();
  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    const result = convert(state);
    setResult(result);
  }
  return (
    <form onSubmit={handleSubmit} class="p-6">
      <KindSelector />
      <Switch>
        <Match when={state.kind.from === "year"}>
          <YearSelector />
        </Match>
        <Match when={state.kind.from === "fes_ordinal"}>
          <FesOrdinalSelector />
        </Match>
        <Match when={state.kind.from === "team"}>
          <TeamSelector />
        </Match>
      </Switch>

      <button
        class="py-2 px-4 text-white rounded-md bg-sky-500 hover:bg-sky-400"
        type="submit"
      >
        変換
      </button>
      <output class="block pt-4">{result()}</output>
    </form>
  );
}
