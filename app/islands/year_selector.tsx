import { useContext } from "react";
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
      <input
        className="rounded-md text-md p-2 mx-2 max-w-[6em] border-1 border-sky-500 focus:border-3 user-invalid:border-rose-500"
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
