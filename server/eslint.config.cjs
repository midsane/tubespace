const eslintPluginPrettier = require("eslint-plugin-prettier");

module.exports = [
    {
        ignores: ["node_modules", "dist"],
    },
    {
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
        },
        plugins: {
            prettier: eslintPluginPrettier,
        },
        rules: {
            "prettier/prettier": "error",
            "no-unused-vars": "warn",
            "no-console": "off",
        },
    },
];
