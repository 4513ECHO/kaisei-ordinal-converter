import { ArrowRightLeft, ArrowUpDown } from "@lucide/solid";
import Select from "@/components/Select.tsx";
import { type Kind, setKindFrom, setKindTo, state, swapKind } from "./state.ts";

const KIND_LABELS = {
  year: "年度",
  fes_ordinal: "回数",
  team: "組",
} as const satisfies Record<Kind, string>;

function Options(props: { selected?: string }) {
  return Object.entries(KIND_LABELS).map(([kind, label]) => (
    <option value={kind} disabled={props.selected === kind}>{label}</option>
  ));
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
