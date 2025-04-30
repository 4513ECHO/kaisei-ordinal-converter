import type { ComponentProps } from "react";
import { clsx } from "clsx";

export default function Select(
  props:
    & Omit<ComponentProps<"select">, "className" | "style">
    & {
      variant?: "team";
      style?: Record<`--${string}`, string>; // Restrict to CSS variables
    },
) {
  return (
    <div className="picker-icon" style={props.style}>
      <select
        {...props}
        className={clsx(
          "rounded-md text-md p-2 pr-5 mx-2",
          props.variant === "team"
            ? "pl-4 text-contrast-bg-[var(--bg-color,var(--color-sky-100))]"
            : "bg-sky-100",
        )}
      />
    </div>
  );
}
