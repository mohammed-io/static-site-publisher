module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: false,
      async: true,
    },
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['**/*.svelte'],
      processor: 'svelte3/svelte3',
    },
  ],
  plugins: ['prettier', 'svelte3', 'jsdoc'],
  extends: ['eslint:recommended', 'google', 'prettier'],
  globals: {
    it: 'readonly',
    process: 'readonly',
    require: 'readonly',
    module: 'readonly',
    spyOn: 'readonly',
    exports: 'readonly',
    __dirname: 'readonly',
    arguments: 'readonly',
  },
  rules: {
    'require-jsdoc': 'warn',
    'no-useless-escape': 'warn',
    'no-unused-vars': 'off',
    'jest/no-test-callback': 'off',
    'valid-jsdoc': 'off',
  },
};
