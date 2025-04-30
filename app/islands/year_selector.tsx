import { useContext } from "react";
import Input from "../components/Input.tsx";
import { colors, Context, type State } from "./state.ts";
import {
  fesFirstYear,
  formatTeam,
  getTeamFirstYear,
  withOrdinalSuffix,
} from "./utils.ts";

export default function YearSelector() {
  const [state, _, handleChange] = useContext(Context);
  return (
    <p className="p-4">
      <Input
        className="max-w-24"
        type="number"
        min={1872}
        placeholder="2025"
        onChange={handleChange("setYear")}
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
  if (year === "") {
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
          <ul className="list-disc list-inside">
            {colors.map((color) => (
              <li key={color}>
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
