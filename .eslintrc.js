module.exports = {
	"extends": "airbnb",
	"env": {
        "browser": false,
        "node": true,
        "mocha": true
    },
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": false
        }
    },
    "rules": {
        "semi": 2,
        "indent": ["error", "tab"]
    },
    "globals": {
        "browser": true
    }
};