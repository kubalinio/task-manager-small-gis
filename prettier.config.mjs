/** @type {import('@ianvs/prettier-plugin-sort-imports').PrettierConfig} */
const config = {
  semi: false,
  singleQuote: false,
  useTabs: false,
  arrowParens: "always",
  jsxSingleQuote: true,
  printWidth: 80,
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-packagejson",
    "prettier-plugin-tailwindcss"
  ],
  bracketSpacing: true,
  bracketSameLine: false,
  trailingComma: "none",
  endOfLine: "auto",
  importOrder: [
    // Empty line
    "",

    // React and core libraries
    "^react$",
    "^react-dom(/.*)?$",

    // Core frameworks
    "^@tanstack(/.*)?$",
    "^next(/.*)?$",

    // Empty line
    "",

    // Types
    "<TYPES>",
    "<TYPES>^[.]",

    // Empty line
    "",

    // Built-in modules
    "<BUILTIN_MODULES>",

    // Empty line
    "",

    // Third party modules
    "<THIRD_PARTY_MODULES>",

    // Empty line
    "",

    // Internal modules
    "^api/(.*)$",
    "^features/(.*)$",
    "^libs/(.*)$",
    "^components/(.*)$",

    // Empty line
    "",

    // Relative imports
    "^[./]",

    // Empty line
    "",

    // Non-CSS relative imports
    "^(?!.*[.]css$)[./].*$",

    // CSS imports
    ".css$"
  ],
  importOrderTypeScriptVersion: "5.8.2",
  tailwindFunctions: ["clsx", "cn", "cva"]
}

export default config
