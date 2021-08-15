//const ksRules = require('@ks/eslint-config/index').rules;

module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: [
    //'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
  },
  rules: {
    //...ksRules,
    'no-console': 'warn',
    'no-debugger': 'warn',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-var-requires': 0,
    'no-extra-parens': 'off',
    'max-len': 'off',
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': [2, {
      'allowShortCircuit': true,
      'allowTernary': true
    }],
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
};
