import { fileURLToPath } from "node:url";
import { defineConfig, type Plugin } from "vite";
import build from "@hono/vite-build/deno";
import devServer from "@hono/vite-dev-server";
import adapter from "@hono/vite-dev-server/node";
import solid from "vite-plugin-solid";
import tailwindcss from "@tailwindcss/vite";
import lucidePreprocess from "vite-plugin-lucide-preprocess";

function client(): Plugin {
  return {
    name: "client",
    apply: ({ mode }) => mode === "client",
    config: () => ({
      build: {
        manifest: true,
        rollupOptions: { input: ["./app/client.tsx", "./app/styles.css"] },
      },
    }),
  };
}

export default defineConfig({
  plugins: [
    build({ staticRoot: "./dist" }),
    devServer({ adapter, entry: "./app/server.ts" }),
    solid({ ssr: true }),
    tailwindcss(),
    lucidePreprocess(),
    client(),
  ],
  ssr: {
    external: ["hono", "solid-js"],
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./app", import.meta.url)),
    },
  },
});
