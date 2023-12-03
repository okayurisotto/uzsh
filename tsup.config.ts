import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/background/index.ts"],
  format: "iife",
  minify: true,
  outDir: "./dist-tsup",
});
