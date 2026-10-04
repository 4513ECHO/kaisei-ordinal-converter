import { useContext } from "preact/hooks";
import { ArrowRightLeft, ArrowUpDown } from "lucide-react";
import Select from "../components/Select.tsx";
import { Context } from "./state.ts";

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
          <option value="year">年度</option>
          <option value="fes_ordinal">回数</option>
          <option value="team">組</option>
        </Select>
        <span>から</span>
      </label>
      <button
        type="button"
        class="block p-2 rounded-md sm:inline-block sm:mx-2 disabled:opacity-30 size-10 not-sm:m-2 not-disabled:hover:bg-sky-100"
        onClick={() => dispatch({ type: "swapKind" })}
        disabled={state.kind.to === ""}
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
          <option value="year" disabled={state.kind.from === "year"}>
            年度
          </option>
          <option
            value="fes_ordinal"
            disabled={state.kind.from === "fes_ordinal"}
          >
            回数
          </option>
          <option value="team" disabled={state.kind.from === "team"}>
            組
          </option>
          <option hidden disabled selected></option>
        </Select>
        <span>に</span>
      </label>
    </div>
  );
}
