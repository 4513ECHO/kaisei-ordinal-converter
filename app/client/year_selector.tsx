import Input from "@/components/Input.tsx";
import { setAsInteger, state } from "./state.ts";

export default function YearSelector() {
  return (
    <p class="p-4">
      <Input
        class="max-w-24"
        type="number"
        min={1872}
        placeholder={new Date().getFullYear().toString()}
        onChange={(e) => setAsInteger("year", e.currentTarget.value)}
        value={state.year}
        name="year"
        required
      />
      年度
    </p>
  );
}
