module.exports = {
	rules: {
		// Tailwind/Flex правила
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: [
					'tailwind',
					'apply',
					'layer',
					'responsive',
					'screen',
					'variants',
					'reference',
				],
			},
		],
		'scss/at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: [
					'tailwind',
					'apply',
					'layer',
					'responsive',
					'screen',
					'variants',
					'reference',
				],
			},
		],
		'at-rule-no-deprecated': [
			true,
			{
				ignoreAtRules: [
					'apply',
					'tailwind',
					'layer',
					'screen',
					'responsive',
					'variants',
					'reference',
				],
			},
		],
		// SCSS & Style
		'no-descending-specificity': [true, { ignore: ['selectors-within-list'] }],
		'no-invalid-double-slash-comments': true,
		'scss/dollar-variable-pattern': '^[a-z].*$',
		'declaration-block-no-redundant-longhand-properties': null,
		'color-function-notation': null,
		'alpha-value-notation': null,
	},
	extends: ['stylelint-config-standard-scss', 'stylelint-config-tailwindcss'],
};
