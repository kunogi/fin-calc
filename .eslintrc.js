module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard'
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
    quotes: [0],
    "space-before-function-paren": 'off',
    semi: [0, 'always'],
    'eol-last': [0, "never"],
    camelcase: "off"
  }
}