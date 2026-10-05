import Input from "@/components/Input.tsx";
import { COLORS, type Converter, setAsInteger, state } from "./state.ts";
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

export const yearConverter: Converter<"year"> = {
  fes_ordinal({ year }) {
    <>
      {year}年度に開催されたのは
      {withOrdinalSuffix(year - fesFirstYear + 1)}運動会です。
    </>;
  },
  team({ year }) {
    return (
      <>
        {year}年度の組は
        <ul class="list-disc list-inside">
          {COLORS.map((color) => (
            <li>{formatTeam(color, year - getTeamFirstYear(color) + 1)}</li>
          ))}
        </ul>{" "}
        です。
      </>
    );
  },
};
