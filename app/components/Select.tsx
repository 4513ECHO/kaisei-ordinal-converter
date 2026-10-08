import type { ComponentProps } from "@solidjs/web";

export default function Select(props: ComponentProps<"select">) {
  return (
    <div class="picker-icon" style={props.style}>
      <select
        {...props}
        class={[
          "rounded-md text-md p-2 pr-5 mx-2 bg-sky-100",
          props.class,
        ]}
      />
    </div>
  );
}
