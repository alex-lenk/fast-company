module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    "quotes": [
      "error",
      "single"
    ],
    "space-before-function-paren": ["error", {
      anonymous: "always",
      named: "never",
    }],
    "react/react-in-jsx-scope": "off"
  }
}
