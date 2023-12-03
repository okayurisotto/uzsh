import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  build: {
    outDir: "./dist-vite",
    rollupOptions: {
      input: {
        options: resolve(__dirname, "./options.html"),
      },
    },
  },
});
