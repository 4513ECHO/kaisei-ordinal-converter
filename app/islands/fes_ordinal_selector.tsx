import { useContext } from "react";
import Input from "../components/Input.tsx";
import { colors, Context, type State } from "./state.ts";
import {
  fesFirstYear,
  formatTeam,
  getOrdinalSuffix,
  getTeamFirstYear,
  withOrdinalSuffix,
} from "./utils.ts";

export default function FesOrdinalSelector() {
  const [state, _, handleChange] = useContext(Context);
  return (
    <p className="p-4">
      <Input
        className="max-w-24"
        type="number"
        min={1}
        placeholder="154th"
        name="fes_ordinal"
        value={state.fesOrdinal}
        onChange={handleChange("setFesOrdinal")}
        required
      />
      {state.fesOrdinal && getOrdinalSuffix(state.fesOrdinal)}
      運動会
    </p>
  );
}

export function showFesOrdinalResult(state: State) {
  const { fesOrdinal } = state;
  if (fesOrdinal === "") {
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
          <ul className="list-disc list-inside">
            {colors.map((color) => (
              <li key={color}>
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
