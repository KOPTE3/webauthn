module.exports = {
	extends: [
		'@qa/eslint-config-mail.ru'
	],

	'rules': {
		'max-len': ['error', 100],
	},

	"env": {
		"browser": true,
		"node"   : true,
		"es6"    : true,
		"mocha"  : true
	},

	"parserOptions": {
		"ecmaVersion": 6
	},

	"globals": {
		"browser": true
	}
};
