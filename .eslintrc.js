module.exports = {
  root: true,
  plugins: [
    '@typescript-eslint',
  ],
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    warnOnUnsupportedTypeScriptVersion: false,
    EXPERIMENTAL_useSourceOfProjectReferenceRedirect: true,
  },
  rules: {
    '@typescript-eslint/no-empty-function': 1,
    'semi': ["error", "always"],
  },
};
