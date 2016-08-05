module.exports = {
	extends: [
		'@qa/eslint-config-mail.ru'
	],

	'rules': {
		'array-callback-return': 'off',
		'array-bracket-spacing': 'off',
		'padded-blocks': 'off',

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
		'no-mixed-requires': 1,
		'max-nested-callbacks': ["error", 5]
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
