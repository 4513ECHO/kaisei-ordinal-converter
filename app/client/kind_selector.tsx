import { ArrowRightLeft, ArrowUpDown } from "lucide-solid";
import Select from "@/components/Select.tsx";
import { setKindFrom, setKindTo, state, swapKind } from "./state.ts";

function Options(props: { selected?: string }) {
  const s = () => props.selected;
  return (
    <>
      <option value="year" disabled={s() === "year"}>年度</option>
      <option value="fes_ordinal" disabled={s() === "fes_ordinal"}>回数</option>
      <option value="team" disabled={s() === "team"}>組</option>
    </>
  );
}

export default function KindSelector() {
  return (
    <div class="sm:flex sm:items-center">
      <label>
        <span class="sr-only">変換元</span>
        <Select
          name="kind_from"
          value={state.kind.from}
          onChange={(e) => setKindFrom(e.currentTarget.value)}
          required
        >
          <Options selected={state.kind.to} />
        </Select>
        <span>から</span>
      </label>
      <button
        type="button"
        class="block p-2 rounded-md sm:inline-block sm:mx-2 disabled:opacity-30 size-10 not-sm:m-2 not-disabled:hover:bg-sky-100"
        onClick={() => swapKind()}
        disabled={!state.kind.to}
        aria-label="変換対象を入れ替え"
      >
        <ArrowRightLeft class="not-sm:hidden" />
        <ArrowUpDown class="sm:hidden" />
      </button>
      <label>
        <span class="sr-only">変換先</span>
        <Select
          name="kind_to"
          value={state.kind.to}
          onChange={(e) => setKindTo(e.currentTarget.value)}
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
