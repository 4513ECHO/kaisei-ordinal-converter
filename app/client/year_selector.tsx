import Input from "@/components/Input.tsx";
import { colors, setAsInteger, type State, state } from "./state.ts";
import {
  fesFirstYear,
  formatTeam,
  getTeamFirstYear,
  withOrdinalSuffix,
} from "./utils.ts";

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

export function showYearResult(state: State) {
  const { year } = state;
  if (year === undefined) {
    throw new Error("Year is not set");
  }
  switch (state.kind.to) {
    case "fes_ordinal":
      return `${state.year}年度に開催されたのは${
        withOrdinalSuffix(year - fesFirstYear + 1)
      }運動会です。`;
    case "team":
      return (
        <div>
          {state.year}年度の組は
          <ul class="list-disc list-inside">
            {colors.map((color) => (
              <li>
                {formatTeam(color, year - getTeamFirstYear(color) + 1)}
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
