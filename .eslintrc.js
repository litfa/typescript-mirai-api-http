module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true
  },
  'parser': '@typescript-eslint/parser',
  'plugins': ['@typescript-eslint'],
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  globals: {},
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'semi': ['error', 'never'],
    'no-multiple-empty-lines': [
      'error',
      {
        'max': 1
      }
    ],
    'comma-dangle': ['error', 'never'],
    'quotes': ['error', 'single'],
    'spaced-comment': ['error', 'always'],
    'no-dupe-keys': ['off'],

    camelcase: [
      'error',
      {
        properties: 'never'
      }
    ],
    'no-var': 'error',
    'no-empty': [
      'error',
      {
        allowEmptyCatch: true
      }
    ],

    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off'
  }
}