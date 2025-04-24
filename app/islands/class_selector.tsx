import { type CSSProperties, useContext } from "react";
import {
  ClassContext,
  colorData,
  fesFirstYear,
  type Query,
  withOrdinalSuffix,
} from "./context.ts";

export default function ClassSelector() {
  const [data, setData] = useContext(ClassContext);

  return (
    <p className="p-4">
      第
      <input
        className="rounded-md text-md  text-end p-2 mx-2 max-w-[4em] border-1 border-sky-500 focus:border-2 user-invalid:border-rose-500"
        type="number"
        min={1}
        placeholder="80"
        name="ordinal"
        onChange={(e) => {
          const value = Number(e.target.value);
          if (Number.isSafeInteger(value)) {
            setData({ ...data, ordinal: value });
          }
        }}
        value={data.ordinal ?? ""}
        required
      />
      代
      <select
        style={{ "--bg-color": data.color } as CSSProperties}
        className={`inline-block rounded-md text-md px-4 py-2 mx-2 ${
          data.color ? "text-contrast-bg-(--bg-color)" : "bg-sky-100"
        } `}
        onChange={(e) => setData({ ...data, color: e.target.value })}
        value={data.color ?? ""}
        name="color"
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
      組
    </p>
  );
}

export function showClassResult(
  data: { ordinal: number; color: string },
  query: Query,
): string {
  const className = `第${data.ordinal}代${colorData[data.color]![0]}組`;
  switch (query.kind) {
    case "fes_ordinal":
      return `${className}は${
        withOrdinalSuffix(
          colorData[data.color]![1] - fesFirstYear + data.ordinal,
        )
      }運動会の組です。`;
    case "year":
      return `${className}は${
        data.ordinal + colorData[data.color]![1] - 1
      }年度の組です。`;
    default:
      throw new Error("Invalid kind");
  }
}
