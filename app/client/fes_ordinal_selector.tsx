import Input from "@/components/Input.tsx";
import { setAsInteger, state } from "./state.ts";
import { getOrdinalSuffix } from "./utils.ts";

export default function FesOrdinalSelector() {
  return (
    <p class="p-4">
      <Input
        class="max-w-24"
        type="number"
        min={1}
        placeholder="154"
        name="fes_ordinal"
        value={state.fesOrdinal}
        onChange={(e) => setAsInteger("fesOrdinal", e.currentTarget.value)}
        required
      />
      {state.fesOrdinal && getOrdinalSuffix(state.fesOrdinal)}
      運動会
    </p>
  );
}
