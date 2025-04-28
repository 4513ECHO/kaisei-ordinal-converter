import { useContext } from "react";
import { KindContext } from "./context.ts";

function SwapIcon() {
  // NOTE: These icons are copied from Tabler Icons, under the following license
  // License: MIT, https://github.com/tabler/tabler-icons/blob/cade2ac6/LICENSE
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="not-sm:hidden"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M21 7l-18 0" />
        <path d="M18 10l3 -3l-3 -3" />
        <path d="M6 20l-3 -3l3 -3" />
        <path d="M3 17l18 0" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="sm:hidden"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M7 3l0 18" />
        <path d="M10 6l-3 -3l-3 3" />
        <path d="M20 18l-3 3l-3 -3" />
        <path d="M17 21l0 -18" />
      </svg>
    </>
  );
}

export default function KindSelector() {
  const [kind, setKind] = useContext(KindContext);

  return (
    <div className="mx-auto sm:flex sm:items-center">
      <div className="picker-icon">
        <select
          className="inline-block rounded-md text-md text-end w-16 p-2 pr-5 mx-2 bg-sky-100"
          name="kind_from"
          value={kind[0]}
          onChange={(e) => setKind([e.target.value, kind[1]])}
          required
        >
          <option value="year">年度</option>
          <option value="fes_ordinal">回数</option>
          <option value="class">組</option>
        </select>
      </div>
      <span>から</span>
      <button
        type="button"
        className="w-10 h-10 mx-2 rounded-md p-2 hover:bg-sky-100 place-content-center block sm:inline-block"
        onClick={() => {
          if (kind[1] !== "") {
            setKind([kind[1], kind[0]]);
          }
        }}
      >
        <SwapIcon />
      </button>
      <div className="picker-icon">
        <select
          className="inline-block rounded-md text-md text-end w-16 p-2 pr-5 mx-2 bg-sky-100"
          name="kind_to"
          value={kind[1]}
          onChange={(e) => setKind([kind[0], e.target.value])}
          required
        >
          <option value="" hidden></option>
          <option value="year" disabled={kind[0] === "year"}>年度</option>
          <option value="fes_ordinal" disabled={kind[0] === "fes_ordinal"}>
            回数
          </option>
          <option value="class" disabled={kind[0] === "class"}>組</option>
        </select>
      </div>
      <span>に</span>
    </div>
  );
}
