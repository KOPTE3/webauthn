module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es6": true,
        "mocha": true
    },

    "parserOptions": {
        "ecmaVersion": 6
    },

    "rules": {
        "no-caller": "error",
        "no-console": "off",
        "no-control-regex": "off",
        "no-debugger": "off",
        "no-eq-null": "error",
        "no-eval": "error",
        "no-invalid-this": "error",
        "no-lone-blocks": "error",
        "no-loop-func": "error",
        "linebreak-style": "error",
        "no-multi-spaces": "error",
        "no-multiple-empty-lines": [
            "error", {
                "max": 2,
                "maxEOF": 1
            }
        ],
        "no-native-reassign": "error",
        "no-negated-condition": "error",
        "no-nested-ternary": "error",
        "no-new-func": "error",
        "no-new-require": "error",
        "no-octal-escape": "error",
        "no-prototype-builtins": "error",
        "no-restricted-globals": "error",
        "no-restricted-imports": "error",
        "no-restricted-modules": "error",
        "no-return-assign": "error",
        "no-script-url": "error",
        "no-self-compare": "error",
        "no-sequences": "error",
        "no-shadow": [
            "error", {
                "hoist": "never"
            }
        ],
        "no-shadow-restricted-names": "error",
        "no-whitespace-before-property": "off", /** ! */
        "no-spaced-func": "error",
        "no-trailing-spaces": [
            "error", {
                "skipBlankLines": true
            }
        ],
        "no-throw-literal": "error",
        "no-undef-init": "error",
        "no-undefined": "error",
        "no-unneeded-ternary": "error",
        "no-unused-expressions": "error",
        "no-use-before-define": "error",
        "no-useless-call": "error",
        "no-useless-computed-key": "error",
        "no-useless-escape": "error",
        "no-var": "error",
        "no-with": "error",
        "no-magic-numbers": "off", /** ! */
        "array-bracket-spacing": "error",
        "array-callback-return": "error",
        "arrow-body-style": ["error", "always"],
        "arrow-spacing": "error",
        "accessor-pairs": "error",
        "block-scoped-var": "error",
        "block-spacing": "error",
        "brace-style": "error",
        "callback-return": "error",
        "camelcase": "error",
        "comma-dangle": ["error", "never"],
        "complexity": ["off", 5],
        "consistent-return": "error",
        "consistent-this": ["error", "_this"],
        "curly": "error",
        "dot-location": ["error", "property"],
        "dot-notation": "error",
        "eol-last": "error",
        "eqeqeq": "error",
        "func-names": "off", /** ! */
        "func-style": ["error", "expression"], /** ! */
        "generator-star-spacing": "off", /** ! */
        "guard-for-in": "error",
        "id-length": ["error", { "min": 2 }],
        "indent": ["error", "tab"],
        "key-spacing": [
            "error", {
                "beforeColon": false
            }
        ],
        "keyword-spacing": [
            "error", {
                "before": true
            }
        ],
        "lines-around-comment": [
            "error", {
                "allowBlockStart": true,
                "allowObjectStart": true,
                "allowArrayStart": true,
                "beforeBlockComment": true
            }
        ],
        "max-depth": [
            "error", {
                "max": 4
            }
        ],
        "max-len": ["error", 90],
        "max-nested-callbacks": [
            "error", {
                "max": 3
            }
        ],
        "max-params": [
            "error", {
                "max": 5
            }
        ],
        "max-statements": ["error", 10],
        "max-statements-per-line": [
            "error", {
                "max": 1
            }
        ],
        "new-cap": [
            "error", {
                "newIsCap": true
            }
        ],
        "new-parens": "error",
        "newline-after-var": ["error", "always"],
        "newline-before-return": "error",
        "newline-per-chained-call": "off", /** ! */
        "object-property-newline": "error",
        "object-shorthand": ["error", "always"],
        "one-var": "off", /** ! */
        "one-var-declaration-per-line": "off", /** ! */
        "padded-blocks": ["error", "never"],
        "prefer-const": "off", /** ! */
        "prefer-spread": "error",
        "quotes": ["error", "single"],
        "require-jsdoc": [
            "error", {
                "require": {
                    "MethodDefinition": false,
                    "ClassDeclaration": false
                }
            }
        ],
        "require-yield": "error",
        "semi": ["error", "always"],
        "semi-spacing": "error",
        "space-before-blocks": "error",
        "space-before-function-paren": "error",
        "space-in-parens": ["error", "never"],
        "space-infix-ops": "error",
        "space-unary-ops": "error",
        "spaced-comment": ["error", "always"],
        "strict": ["error", "global"],
        "template-curly-spacing": "error",
        "valid-jsdoc": [
            "error", {
                "requireParamDescription": false,
                "requireReturnDescription": false
            }
        ],
        "yield-star-spacing": "off", /** ! */
        "yoda": "error"
    },

    "globals": {
        "browser": true
    }
};
