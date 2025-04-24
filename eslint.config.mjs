import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    overrides: [
      {
        files: ["src/app/api/*/route.ts"], // Применяем только к route.ts файлам
        rules: {
          "@typescript-eslint/ban-ts-comment": [
            "error",
            {
              "ts-ignore": false, // Разрешаем @ts-ignore только в route.ts
            },
          ],
        },
      },
    ],
  },
];

// import js from "@eslint/js";
// import globals from "globals";
// import tseslint from "typescript-eslint";
// import nextPlugin from "@next/eslint-plugin-next";
// import reactHooksPlugin from "eslint-plugin-react-hooks";

// export default [
//   // Базовые настройки
//   js.configs.recommended,
//   ...tseslint.configs.recommended,
  
//   // Next.js специфичные настройки
//   {
//     plugins: {
//       "@next/next": nextPlugin,
//       "react-hooks": reactHooksPlugin,
//     },
//     rules: {
//       ...nextPlugin.configs.recommended.rules,
//       ...nextPlugin.configs["core-web-vitals"].rules,
//       "react-hooks/exhaustive-deps": "error",
//     },
//   },
  
//   // Глобальные переменные
//   {
//     languageOptions: {
//       globals: {
//         ...globals.browser,
//         ...globals.node,
//       },
//     },
//   },
  
//   // Правила для route.ts файлов
//   {
//     files: ["src/app/api/**/route.ts"],
//     rules: {
//       "@typescript-eslint/ban-ts-comment": [
//         "error",
//         {
//           "ts-ignore": "allow-with-description",
//         },
//       ],
//     },
//   },
// ];
