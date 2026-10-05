import Input from "@/components/Input.tsx";
import { COLORS, type Converter, setAsInteger, state } from "./state.ts";
import {
  fesFirstYear,
  formatTeam,
  getOrdinalSuffix,
  getTeamFirstYear,
  withOrdinalSuffix,
} from "./utils.ts";

export default function FesOrdinalSelector() {
  return (
    <p class="p-4">
      <Input
        class="max-w-24"
        type="number"
        min={1}
        placeholder="154th"
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

export const fesOrdinalConverter: Converter<"fes_ordinal"> = {
  year({ fesOrdinal }) {
    return (
      <>
        {withOrdinalSuffix(fesOrdinal)}
        運動会が開催されたのは
        {fesFirstYear + fesOrdinal - 1}年度です。
      </>
    );
  },
  team({ fesOrdinal }) {
    return (
      <>
        {withOrdinalSuffix(fesOrdinal)}運動会の組は
        <ul class="list-disc list-inside">
          {COLORS.map((color) => (
            <li>
              {formatTeam(
                color,
                fesFirstYear + fesOrdinal - getTeamFirstYear(color),
              )}
            </li>
          ))}
        </ul>
        です。
      </>
    );
  },
};
