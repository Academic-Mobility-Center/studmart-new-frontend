/** @type {import("prettier").Config} */
module.exports = {
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
		'^@/screens/(.*)$',
		'^@/components/(.*)$',
		'^@/ui/(.*)$',
		'^@/hooks/(.*)$',
		'^@/shared/(.*)$',
		'^@/services/(.*)$',
		'^@/assets/(.*)$',
		'^@/utils/(.*)$',
		'^@/configs/(.*)$',
		'^@/store/(.*)$',
		'^@/(.*)$', // остальные алиасы
		'',
		'^../(.*)$', // относительные импорты
		'^./(.*)$',
		'',
		'\\.s?css$',
		'^(?!.*[.]css$)[./].*$',
		'.css$',
	],
	importOrderParserPlugins: ['typescript', 'jsx', 'tsx', 'css', 'scss', 'decorators-legacy'],
	importOrderTypeScriptVersion: '5.0.0',
	importOrderCaseSensitive: true,

	singleQuote: true,
	trailingComma: 'all',
	useTabs: true,
	semi: true,
	bracketSpacing: true,
	printWidth: 100,
	endOfLine: 'auto',
};
