import Input from "@/components/Input.tsx";
import { colors, setAsInteger, type State, state } from "./state.ts";
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

export function showFesOrdinalResult(state: State) {
  const { fesOrdinal } = state;
  if (fesOrdinal === undefined) {
    throw new Error("Fes ordinal is not set");
  }
  switch (state.kind.to) {
    case "year":
      return `${withOrdinalSuffix(fesOrdinal)}運動会が開催されたのは${
        fesFirstYear + fesOrdinal - 1
      }年度です。`;
    case "team":
      return (
        <div>
          {withOrdinalSuffix(fesOrdinal)}運動会の組は
          <ul class="list-disc list-inside">
            {colors.map((color) => (
              <li>
                {formatTeam(
                  color,
                  fesFirstYear + fesOrdinal - getTeamFirstYear(color),
                )}
              </li>
            ))}
          </ul>
          です。
        </div>
      );
    default:
      throw new Error(`Invalid kind: ${state.kind.to}`);
  }
}
