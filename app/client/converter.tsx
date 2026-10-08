import type { JSX } from "@solidjs/web";
import { type Color, COLORS, type Kind, type State } from "./state.ts";
import {
  fesFirstYear,
  formatTeam,
  getTeamFirstYear,
  withOrdinalSuffix,
} from "./utils.ts";

type FilledState<From extends Kind, To extends Exclude<Kind, From>> =
  & State
  & { kind: { from: From; to: To } }
  & (From extends "team" ? { team: { ordinal: number; color: Color } }
    : From extends "year" ? { year: number }
    : From extends "fes_ordinal" ? { fesOrdinal: number }
    : never);

type ConverterMatrix = {
  [From in Kind]: {
    [To in Exclude<Kind, From>]: (state: FilledState<From, To>) => JSX.Element;
  };
};

const converterMatrix: ConverterMatrix = {
  fes_ordinal: {
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
  },
  team: {
    fes_ordinal({ team }) {
      const className = formatTeam(team.color, team.ordinal);
      return (
        <>
          {className}は
          {withOrdinalSuffix(
            getTeamFirstYear(team.color) - fesFirstYear + team.ordinal,
          )}
          運動会の組です。
        </>
      );
    },
    year({ team }) {
      const className = formatTeam(team.color, team.ordinal);
      return (
        <>
          {className}は
          {team.ordinal + getTeamFirstYear(team.color) - 1}年度の組です。
        </>
      );
    },
  },
  year: {
    fes_ordinal({ year }) {
      return (
        <>
          {year}年度に開催されたのは
          {withOrdinalSuffix(year - fesFirstYear + 1)}運動会です。
        </>
      );
    },
    team({ year }) {
      return (
        <>
          {year}年度の組は
          <ul class="list-disc list-inside">
            {COLORS.map((color) => (
              <li>{formatTeam(color, year - getTeamFirstYear(color) + 1)}</li>
            ))}
          </ul>
          です。
        </>
      );
    },
  },
};

export default function convert<
  From extends Kind,
  To extends Exclude<Kind, From>,
>(state: State): JSX.Element {
  const { from, to } = (state as FilledState<From, To>).kind;
  // deno-lint-ignore no-explicit-any
  return converterMatrix[from][to](state as any);
}
