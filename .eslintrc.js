module.exports = {
<<<<<<< HEAD
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential",
        "plugin:@typescript-eslint/recommended"
    ],
    "parserOptions": {
        "ecmaVersion": 12,
        "parser": "@typescript-eslint/parser",
        "sourceType": "module"
    },
    "plugins": [
        "vue",
        "@typescript-eslint"
    ],
    "rules": {
      "space-before-function-paren": 'off',
      semi: [0, 'always'],
      'eol-last': [0, "never"],
      camelcase: "off",
      quotes: [0]
    }
};
=======
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
>>>>>>> ea331a74d1d7406177c5503f9b2ac8d4b216daad
