module.exports = {
	extends: [
		'@qa/eslint-config-mail.ru'
	],

	'rules': {
		'max-len': ['error', 100],
		'array-callback-return': 'off',
		'require-jsdoc': [
			'error', {
				'require': {
					'FunctionDeclaration': true,
					'MethodDefinition'   : false,
					'ClassDeclaration'   : false
				}
			}
		],

		'no-mixed-spaces-and-tabs': 'error',
		'no-mixed-requires': 1
	},

	'env': {
		'browser': true,
		'node'   : true,
		'es6'    : true,
		'mocha'  : true
	},

	'parserOptions': {
		'ecmaVersion': 6
	},

	'globals': {
		'browser': true
	}
};
