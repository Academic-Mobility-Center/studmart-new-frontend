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

export default eslintConfig;
