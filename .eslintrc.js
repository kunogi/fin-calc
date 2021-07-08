module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    '@ks/eslint-config-ks'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    /*
    "space-before-function-paren": 'off',
    quotes: [0],
    semi: [0, 'always'],
    'eol-last': [0, "never"],
    camelcase: "off",
    */
    "max-params": [1, 4]
  }
}