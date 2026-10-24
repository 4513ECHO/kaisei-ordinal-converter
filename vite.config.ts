import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import build from "@hono/vite-build/cloudflare-workers";
import devServer from "@hono/vite-dev-server";
import adapter from "@hono/vite-dev-server/node";
import solid from "vite-plugin-solid";
import ssr from "vite-ssr-components/plugin";
import tailwindcss from "@tailwindcss/vite";
import lucidePreprocess from "vite-plugin-lucide-preprocess";

export default defineConfig({
  plugins: [
    build(),
    devServer({ adapter, entry: "./app/server.ts" }),
    solid({ ssr: true }),
    ssr(),
    tailwindcss(),
    lucidePreprocess(),
  ],
  ssr: {
    external: ["solid-js"],
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./app", import.meta.url)),
    },
  },
});
