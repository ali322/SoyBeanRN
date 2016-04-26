module.exports = {
    // "parser": "babel-eslint",
    "env": {
        "node": true,
        "browser":true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        // "strict": [2, "never"],
        "no-shadow": 2,
        "no-shadow-restricted-names": 2,
        "no-unused-vars": [0, {
            "vars": "local",
            "args": "after-used"
        }],
        "no-use-before-define": 2,
        "no-invalid-regexp": 2,
        "no-extra-semi": 2,
        "no-extra-boolean-cast": 0,
        "no-obj-calls": 2,
        "no-reserved-keys": 0,
        "no-sparse-arrays": 2,
        "no-unreachable": 2,
        "eqeqeq": 2,
        "comma-dangle": [2, "never"],
        "guard-for-in": 2,
        "vars-on-top": 2,
        "no-use-before-define": 0,
        "linebreak-style": [
            "error",
            "unix"
        ],
        // "quotes":[2, "double", {"avoidEscape": true, "allowTemplateLiterals": true}],
        "semi": [
            "error",
            "never"
        ]
    }
};