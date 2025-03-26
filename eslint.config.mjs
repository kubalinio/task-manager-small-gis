import comments from "@eslint-community/eslint-plugin-eslint-comments/configs"
import js from "@eslint/js"
import prettierConfig from "eslint-config-prettier"
import * as regexpPlugin from "eslint-plugin-regexp"
import pluginSecurity from "eslint-plugin-security"
import globals from "globals"
import * as tseslint from "typescript-eslint"
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import tailwindPlugin from 'eslint-plugin-tailwindcss'

const config = [
  {
    ignores: [
      ".next",
      ".astro",
      "dist",
      "storybook-static",
      "**/routeTree.gen.ts"
    ]
  },

  // React configs
  {
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
      'tailwindcss': tailwindPlugin
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.strict.rules,
      ...tailwindPlugin.configs.recommended.rules,
      "tailwindcss/classnames-order": "warn",
      "tailwindcss/enforces-negative-arbitrary-values": "warn",
      "tailwindcss/enforces-shorthand": "warn",
      "tailwindcss/migration-from-tailwind-2": "warn",
      "tailwindcss/no-arbitrary-value": "off",
      "tailwindcss/no-contradicting-classname": "error"
    }
  },

  // Base JS/TS configs
  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  // Good to have extras
  comments.recommended,
  regexpPlugin.configs["flat/recommended"],
  pluginSecurity.configs.recommended,

  // Prettier config to disable conflicting rules
  prettierConfig,

  ...tseslint.config({
    files: ["**/*.{ts,tsx,js,jsx,cjs,mjs}"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        parser: tseslint.parser,
        project: ["./tsconfig.json"],
        tsconfigRootDir: ".",
        allowDefaultProject: true
      }
    }
  }),
  {
    linterOptions: {
      reportUnusedDisableDirectives: true
    },
    languageOptions: {
      parserOptions: {
        projectService: true
      },
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    settings: {
      tailwindcss: {
        callees: ["classnames", "clsx", "ctl", "cn", "cva"],
        config: "./tailwind.config.ts",
        removeDuplicates: true,
        classRegex: "^class(Name)?$"
      },
      react: {
        version: "detect"
      }
    },
    rules: {
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports", fixStyle: "separate-type-imports" }
      ],
      "@eslint-community/eslint-comments/disable-enable-pair": "off",
      "tailwindcss/no-custom-classname": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unnecessary-condition": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/no-invalid-void-type": "off",
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "security/detect-object-injection": "off",
      "@typescript-eslint/no-misused-promises": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react-hooks/rules-of-hooks": "off",
      "jsx-a11y/no-autofocus": "warn",
      "jsx-a11y/heading-has-content": "off"
    }
  }
]

export default config;
