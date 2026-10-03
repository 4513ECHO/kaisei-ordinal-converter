import { defineConfig } from "vite";
import { fresh } from "@fresh/plugin-vite";
import tailwindcss from "@tailwindcss/vite";
import lucidePreprocess from "vite-plugin-lucide-preprocess";

export default defineConfig({
  plugins: [fresh(), tailwindcss(), lucidePreprocess()],
  build: {
    rollupOptions: {
      // https://github.com/TanStack/query/issues/5175
      onwarn(warning, warn) {
        if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
          return;
        }
        warn(warning);
      },
    },
  },
});
