import { useContext } from "react";
import {
  colorData,
  fesFirstYear,
  type Query,
  withOrdinalSuffix,
  YearContext,
} from "./context.ts";

export default function YearSelector() {
  const [year, setYear] = useContext(YearContext);
  return (
    <p className="p-4">
      <input
        className="rounded-md text-md p-2 mx-2 max-w-[6em] border-1 border-sky-500 focus:border-3 user-invalid:border-rose-500"
        type="number"
        min={1872}
        placeholder="2025"
        onChange={(e) => {
          const value = Number(e.target.value);
          if (Number.isSafeInteger(value)) {
            setYear(value);
          }
        }}
        value={year}
        name="year"
        required
      />
      年度
    </p>
  );
}

export function showYearResult(data: number, query: Query) {
  switch (query.kind) {
    case "fes_ordinal":
      return `${data}年度に開催されたのは${
        withOrdinalSuffix(data - fesFirstYear + 1)
      }運動会です。`;
    case "class":
      return (
        <div>
          {data}年度の組は
          <ul className="list-disc list-inside">
            {Object.entries(colorData).map(([color, [name, firstYear]]) => (
              <li key={color}>第{data - firstYear + 1}代{name}組</li>
            ))}
          </ul>
          です。
        </div>
      );
    default:
      throw new Error("Invalid kind");
  }
}
