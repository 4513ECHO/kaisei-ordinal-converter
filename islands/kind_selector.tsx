import { useContext } from "preact/hooks";
import { ArrowRightLeft, ArrowUpDown } from "lucide-react";
import Select from "../components/Select.tsx";
import { Context } from "./state.ts";

function Options({ selected }: { selected?: string }) {
  return (
    <>
      <option value="year" disabled={selected === "year"}>年度</option>
      <option value="fes_ordinal" disabled={selected === "fes_ordinal"}>
        回数
      </option>
      <option value="team" disabled={selected === "team"}>組</option>
    </>
  );
}

export default function KindSelector() {
  const [state, dispatch, handleChange] = useContext(Context);
  return (
    <div class="sm:flex sm:items-center">
      <label>
        <span class="sr-only">変換元</span>
        <Select
          name="kind_from"
          value={state.kind.from}
          onChange={handleChange("setKindFrom")}
          required
        >
          <Options selected={state.kind.to} />
        </Select>
        <span>から</span>
      </label>
      <button
        type="button"
        class="block p-2 rounded-md sm:inline-block sm:mx-2 disabled:opacity-30 size-10 not-sm:m-2 not-disabled:hover:bg-sky-100"
        onClick={() => dispatch({ type: "swapKind" })}
        disabled={!state.kind.to}
        aria-label="変換対象を入れ替え"
      >
        <ArrowRightLeft className="not-sm:hidden" />
        <ArrowUpDown className="sm:hidden" />
      </button>
      <label>
        <span class="sr-only">変換先</span>
        <Select
          name="kind_to"
          value={state.kind.to}
          onChange={handleChange("setKindTo")}
          required
        >
          <Options selected={state.kind.from} />
          <option hidden disabled selected></option>
        </Select>
        <span>に</span>
      </label>
    </div>
  );
}
