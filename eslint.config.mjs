import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

export default [
	...compat.config({
		extends: ['next/core-web-vitals', 'next/typescript', 'prettier', 'plugin:prettier/recommended'],
		rules: {
			'import/order': 'off',
			'prettier/prettier': [
				'error',
				{
					plugins: ['@ianvs/prettier-plugin-sort-imports'],
					importOrder: [
						'',
						'^react$', // React в первую очередь
						'^react-dom$', // потом react-dom
						'',
						'<BUILTIN_MODULES>',
						'<THIRD_PARTY_MODULES>',
						'<TYPES>',
						'^[a-z]', // сторонние библиотеки
						'',
						'^@/app/(.*)$',
						'^@/screens/(.*)$',
						'^@/pages/(.*)$',
						'^@/components/(.*)$',
						'^@/ui/(.*)$',
						'^@/shared/(.*)$',
						'',
						'^@/utils/(.*)$',
						'^@/hooks/(.*)$',
						'^@/services/(.*)$',
						'^@/lib/(.*)$',
						'^@/store/(.*)$',
						'',
						'^@/configs/(.*)$',
						'^@/constants/(.*)$',
						'^@/context/(.*)$',
						'^@/data/(.*)$',
						'^@/types/(.*)$',
						'',
						'^@/assets/(.*)$',
						'^@/public/(.*)$',
						'',
						'^@/(.*)$', // остальные алиасы
						'',
						'^../(.*)$', // относительные импорты
						'^./(.*)$',
						'',
						'^@/styles/(.*)$',
						'\\.s?css$',
						'^(?!.*[.]css$)[./].*$',
						'.css$',
					],
					importOrderParserPlugins: [
						'typescript',
						'jsx',
						'tsx',
						'css',
						'scss',
						'decorators-legacy',
					],
					importOrderTypeScriptVersion: '5.0.0',
					importOrderCaseSensitive: true,

					singleQuote: true,
					trailingComma: 'all',
					useTabs: true,
					semi: true,
					bracketSpacing: true,
					printWidth: 100,
					endOfLine: 'auto',
				},
			],

			'react/react-in-jsx-scope': 'off',
			'prefer-const': 'error',
			'import/no-anonymous-default-export': 'off',
			'@typescript-eslint/no-empty-interface': 'warn',
			'@typescript-eslint/no-empty-object-type': 'warn',
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unused-vars': 'warn',
			'@next/next/no-page-custom-font': 'off',
			// '@typescript-eslint/naming-convention': [
			// 	'error',
			// 	{
			// 		selector: 'interface',
			// 		format: ['PascalCase'],
			// 		custom: {
			// 			regex: '^I[A-Z]',
			// 			match: true,
			// 		},
			// 	},
			// ],
		},
	}),
];
