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
    "",
    "^react$",
    "^react-dom(/.*)?$",
    "^@tanstack(/.*)?$",
    "^next(/.*)?$",
    "",
    "<TYPES>",
    "<TYPES>^[.]",
    "",
    "<BUILTIN_MODULES>",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@/(.*)$",
    "",
    "^[./]",
    "",
    "^(?!.*[.]css$)[./].*$",
    ".css$",
  ],
  importOrderTypeScriptVersion: "5.4.5",
  tailwindConfig: "./tailwind.config.ts",
  tailwindFunctions: ["clsx", "cn", "cva"],
};

export default config;
