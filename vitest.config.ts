import path from "path";

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/pages/*/*.test.ts?(x)"],
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest-setup.ts"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
