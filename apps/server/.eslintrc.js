module.exports = {
  "extends": ["standard-with-typescript", "plugin:prettier/recommended"]
  env: {
    es2021: true,
    node: true
  },
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {}
}
