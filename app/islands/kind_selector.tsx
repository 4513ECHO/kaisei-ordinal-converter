import { useContext } from "react";
import Select from "../components/Select.tsx";
import { Context } from "./state.ts";

function SwapIcon() {
  // NOTE: These icons are copied from Tabler Icons, under the following license
  // License: MIT, https://github.com/tabler/tabler-icons/blob/cade2ac6/LICENSE
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
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
  const [state, dispatch, handleChange] = useContext(Context);
  return (
    <div className="sm:flex sm:items-center">
      <label>
        <span className="sr-only">変換元</span>
        <Select
          name="kind_from"
          value={state.kind.from}
          onChange={handleChange("setKindFrom")}
          required
        >
          <option value="year">年度</option>
          <option value="fes_ordinal">回数</option>
          <option value="team">組</option>
        </Select>
        <span>から</span>
      </label>
      <button
        type="button"
        className="block p-2 rounded-md sm:inline-block sm:mx-2 disabled:opacity-30 size-10 not-sm:m-2 not-disabled:hover:bg-sky-100"
        onClick={() => dispatch({ type: "swapKind" })}
        disabled={state.kind.to === ""}
        aria-label="変換対象を入れ替え"
      >
        <SwapIcon />
      </button>
      <label>
        <span className="sr-only">変換先</span>
        <Select
          name="kind_to"
          value={state.kind.to}
          onChange={handleChange("setKindTo")}
          required
        >
          <option value="" hidden></option>
          <option value="year" disabled={state.kind.from === "year"}>
            年度
          </option>
          <option
            value="fes_ordinal"
            disabled={state.kind.from === "fes_ordinal"}
          >
            回数
          </option>
          <option value="team" disabled={state.kind.from === "team"}>
            組
          </option>
        </Select>
        <span>に</span>
      </label>
    </div>
  );
}
