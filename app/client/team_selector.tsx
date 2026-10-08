import Input from "@/components/Input.tsx";
import Select from "@/components/Select.tsx";
import { COLORS, setAsInteger, setColor, state } from "./state.ts";
import { COLORS_JA } from "./utils.ts";

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
        {COLORS.map((color, index) => (
          <option value={color}>{COLORS_JA[index]}</option>
        ))}
      </Select>
      組
    </div>
  );
}
