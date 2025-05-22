// @ts-check

import stylisticTs from '@stylistic/eslint-plugin-ts'
import parserTs from '@typescript-eslint/parser';

export default [
  {
    files: ["**/*.ts"],
    plugins: {
      '@stylistic/ts': stylisticTs
    },
    languageOptions: {
      parser: parserTs,
    },
    rules: {
      'indent': ['error', 2],
      '@stylistic/ts/indent': ['error', 2],
      '@stylistic/ts/semi': ['error', 'always'],
      '@stylistic/ts/quotes': ['error', 'single']
    }
  }
];