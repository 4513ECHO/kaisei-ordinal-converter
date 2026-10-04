import Input from "@/components/Input.tsx";
import Select from "@/components/Select.tsx";
import { setAsInteger, setColor, type State, state } from "./state.ts";
import {
  fesFirstYear,
  formatTeam,
  getTeamFirstYear,
  withOrdinalSuffix,
} from "./utils.ts";

export default function TeamSelector() {
  return (
    <div class="p-4">
      第
      <Input
        class="max-w-16"
        type="number"
        min={1}
        placeholder="80"
        name="team_ordinal"
        onChange={(e) => setAsInteger("team", e.currentTarget.value)}
        value={state.team.ordinal}
        required
      />
      代
      <Select
        onChange={(e) => setColor(e.currentTarget.value)}
        class="pl-4 team"
        style={{ "--team-color": state.team.color }}
        value={state.team.color}
        name="team_color"
        required
      >
        <option hidden disabled selected></option>
        <option value="purple">紫</option>
        <option value="white">白</option>
        <option value="blue">青</option>
        <option value="green">緑</option>
        <option value="orange">橙</option>
        <option value="yellow">黄</option>
        <option value="red">赤</option>
        <option value="black">黒</option>
      </Select>
      組
    </div>
  );
}

export function showTeamResult(state: State): string {
  if (state.team.ordinal === undefined || state.team.color === undefined) {
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
