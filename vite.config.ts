import * as path from "node:path"
import { fileURLToPath } from "node:url"

// @ts-expect-error Library is not correct typed
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import viteTsconfigPaths from "vite-tsconfig-paths"
import { configDefaults } from "vitest/config"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  root: __dirname,
  plugins: [
    react({
      jsxImportSource: "@welldone-software/why-did-you-render"
    }),
    viteTsconfigPaths(),
    tailwindcss()
  ],
  cacheDir: "./node_modules/.vite",
  server: {
    port: 4200,
    host: "localhost"
  },
  preview: {
    port: 4300,
    host: "localhost"
  },
  build: {
    outDir: "./dist",
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests.ts",
    clearMocks: true,
    exclude: [...configDefaults.exclude, "e2e/**/*", "e2e-playwright/**/*"],
    coverage: {
      reporter: ["text", "json", "html"]
    }
  }
})
