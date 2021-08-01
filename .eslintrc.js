module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    camelcase: ['error', { allow: ['w*_w*'] }],
    'eol-last': ['error', 'never'],
    'space-before-function-paren': 'off',
    semi: 'off',
    "comma-dangle": 'off',
    quotes: [0, "never"],
    'no-trailing-spaces': ['error', { skipBlankLines: true }],
    "spaced-comment": 'off'
  }
}