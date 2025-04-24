import { useContext } from "react";
import {
  colorData,
  fesFirstYear,
  FesOrdinalContext,
  getOrdinalSuffix,
  type Query,
  withOrdinalSuffix,
} from "./context.ts";

export default function FesOrdinalSelector() {
  const [fesOrdinal, setFesOrdinal] = useContext(FesOrdinalContext);
  return (
    <p className="p-4">
      <input
        className="rounded-md text-md p-2 mx-2 max-w-[6em] border-1 border-sky-500 focus:border-3 user-invalid:border-rose-500"
        type="number"
        min={1}
        placeholder="154"
        name="fes_ordinal"
        value={fesOrdinal}
        onChange={(e) => {
          const value = Number(e.target.value);
          if (Number.isSafeInteger(value)) {
            setFesOrdinal(value);
          }
        }}
        required
      />
      {getOrdinalSuffix(fesOrdinal)}
      運動会
    </p>
  );
}

export function showFesOrdinalResult(data: number, query: Query) {
  switch (query.kind) {
    case "year":
      return `${withOrdinalSuffix(data)}運動会が開催されたのは${
        fesFirstYear + data - 1
      }年度です。`;
    case "class":
      return (
        <div>
          {withOrdinalSuffix(data)}運動会の組は
          <ul className="list-disc list-inside">
            {Object.entries(colorData).map(([color, [name, firstYear]]) => (
              <li key={color}>
                第{fesFirstYear + data - firstYear}代{name}組
              </li>
            ))}
          </ul>
          です。
        </div>
      );
    default:
      throw new Error("Invalid kind");
  }
}
