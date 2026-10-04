import type { ComponentProps } from "solid-js";
import { clsx } from "clsx";

export default function Input(props: ComponentProps<"input">) {
  return (
    <input
      {...props}
      class={clsx(
        "p-2 mx-2 rounded-md text-md text-end border-1 border-sky-500 user-invalid:border-rose-500",
        props.class,
      )}
    />
  );
}
