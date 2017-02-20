module.exports = {
	extends: [
		'@qa/eslint-config-mail.ru'
	],

	'parser': 'typescript-eslint-parser',

	'plugins': [
		"typescript"
	],

	'parserOptions': {
		'sourceType': 'module',

		'ecmaFeatures': {
			'impliedStrict': true
		}
	},

	'globals': {
		'browser': true
	},

	'env': {
		'browser': true,
		'node'   : true,
 		'es6'    : true
	},

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
		'max-nested-callbacks': ['error', 5]
	}
};
