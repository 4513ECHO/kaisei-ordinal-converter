import type { ComponentProps } from "preact";
import { clsx } from "clsx";

export default function Select(props: ComponentProps<"select">) {
  return (
    <div class="picker-icon" style={props.style}>
      <select
        {...props}
        class={clsx(
          "rounded-md text-md p-2 pr-5 mx-2 bg-sky-100",
          props.class,
        )}
      />
    </div>
  );
}
