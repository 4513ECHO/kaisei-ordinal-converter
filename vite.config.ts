import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import build from "@hono/vite-build/deno";
import devServer from "@hono/vite-dev-server";
import adapter from "@hono/vite-dev-server/node";
import solid from "@solidjs/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import lucidePreprocess from "vite-plugin-lucide-preprocess";

export default defineConfig({
  plugins: [
    build({ staticRoot: "./dist" }),
    devServer({ adapter, entry: "./app/server.ts" }),
    solid({ ssr: true }),
    tailwindcss(),
    lucidePreprocess(),
  ],
  ssr: {
    external: ["hono", "@solidjs/web"],
  },
  environments: {
    client: {
      build: {
        manifest: true,
        rollupOptions: { input: ["./app/client.tsx", "./app/styles.css"] },
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./app", import.meta.url)),
    },
  },
});
