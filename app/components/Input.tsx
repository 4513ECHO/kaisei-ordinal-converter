import type { ComponentProps } from "react";
import { clsx } from "clsx";

export default function Input(
  props:
    & Omit<ComponentProps<"input">, "className">
    & { className?: string },
) {
  return (
    <input
      {...props}
      className={clsx(
        "p-2 mx-2 rounded-md text-md text-end border-1 border-sky-500 user-invalid:border-rose-500",
        props.className,
      )}
    />
  );
}
