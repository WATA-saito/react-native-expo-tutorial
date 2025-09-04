// eslint.config.js
import tseslint from "typescript-eslint";
import eslintPlugin from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname, // Node v20 以降
});

export default [
  {
    ignores: [
      "babel.config.js",
      "eslint.config.js",
      // "metro.config.js",
    ],
  },
  // Expo 設定を Flat Config に変換して読み込む
  ...compat.extends("expo"),
  // ESLint 推奨
  eslintPlugin.configs.recommended,
  // TS ESLint の recommended + type-checked + stylistic
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: { attributes: false },
        },
      ],
      "@typescript-eslint/no-var-requires": "off",
    },
  },
];
