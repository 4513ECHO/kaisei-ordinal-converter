import { createClient } from "honox/client";

createClient({
  hydrate: async (elem, root) => {
    const { hydrateRoot } = await import("react-dom/client");
    hydrateRoot(root, elem);
  },
  // deno-lint-ignore no-explicit-any
  createElement: async (type, props): Promise<any> => {
    const { createElement } = await import("react");
    return createElement(type, props);
  },
});
