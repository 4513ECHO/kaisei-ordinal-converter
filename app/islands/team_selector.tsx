import { type CSSProperties, useContext } from "react";
import { Context, type State } from "./state.ts";
import {
  fesFirstYear,
  formatTeam,
  getTeamFirstYear,
  withOrdinalSuffix,
} from "./utils.ts";

export default function TeamSelector() {
  const [state, _, handleChange] = useContext(Context);
  return (
    <div className="p-4">
      第
      <input
        className="rounded-md text-md  text-end p-2 mx-2 max-w-[4em] border-1 border-sky-500 focus:border-2 user-invalid:border-rose-500"
        type="number"
        min={1}
        placeholder="80"
        name="team_ordinal"
        onChange={handleChange("setTeamOrdinal")}
        value={state.team.ordinal}
        required
      />
      代
      <div
        className="picker-icon"
        style={{ "--bg-color": state.team.color } as CSSProperties}
      >
        <select
          className={`inline-block rounded-md text-md pl-4 pr-5 py-2 mx-2 ${
            state.team.color ? "text-contrast-bg-(--bg-color)" : "bg-sky-100"
          }`}
          onChange={handleChange("setTeamColor")}
          value={state.team.color}
          name="team_color"
          required
        >
          <option value="" hidden></option>
          <option value="purple">紫</option>
          <option value="white">白</option>
          <option value="blue">青</option>
          <option value="green">緑</option>
          <option value="orange">橙</option>
          <option value="yellow">黄</option>
          <option value="red">赤</option>
          <option value="black">黒</option>
        </select>
      </div>
      組
    </div>
  );
}

export function showTeamResult(state: State): string {
  if (state.team.ordinal === "" || state.team.color === "") {
    throw new Error("Invalid ordinal");
  }
  const className = formatTeam(state.team.color, state.team.ordinal);
  switch (state.kind.to) {
    case "fes_ordinal":
      return `${className}は${
        withOrdinalSuffix(
          getTeamFirstYear(state.team.color) - fesFirstYear +
            state.team.ordinal,
        )
      }運動会の組です。`;
    case "year":
      return `${className}は${
        state.team.ordinal + getTeamFirstYear(state.team.color) - 1
      }年度の組です。`;
    default:
      throw new Error(`Invalid kind: ${state.kind.to}`);
  }
}
