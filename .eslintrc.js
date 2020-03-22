module.exports = {
    "env": {
        "browser": true,
    },
    "extends": "airbnb",
    "parser": "babel-eslint",
    "rules": {
        "indent": ["error", 4],
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4],
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "react/forbid-prop-types": [true, { "forbid": ["object"], checkContextTypes: true, checkChildContextTypes: true }],
        "jsx-a11y/anchor-is-valid": "off",
        "jsx-a11y/no-static-element-interactions": "off",
        "jsx-a11y/click-events-have-key-events": "off"
    },
    "settings": {
        "import/resolver": {
            "node": {
                "paths": ["src"]
            }
        }
    }
};
