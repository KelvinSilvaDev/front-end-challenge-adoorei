/* eslint-disable no-undef */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:vue/vue3-recommended"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["vue"],
  rules: {
    "vue/multi-word-component-names": 0,
    "vue/html-self-closing": 0,
    "vue/max-attributes-per-line": 0,
    "vue/no-reserved-component-names": 0,
    "vue/order-in-components": 0,
    "vue/no-mutating-props": 0,
    "vue/require-explicit-emits": 0,
    "vue/no-side-effects-in-computed-properties": 0,
    "vue/singleline-html-element-content-newline": 0,
    "vue/html-closing-bracket-newline": 0,
    "vue/html-indent": 0,
  },
};
