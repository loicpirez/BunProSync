const eslintPluginTypescript = require('@typescript-eslint/eslint-plugin');
const parserTypescript = require('@typescript-eslint/parser');
const googleConfig = require('eslint-config-google');

module.exports = [
  {
    ignores: ['dist', 'node_modules'],
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: parserTypescript,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': eslintPluginTypescript,
    },
    ...googleConfig,
    rules: {
      'indent': ['error', 2], // 2-space indentation
      'quotes': ['error', 'single'], // Single quotes for strings
      'semi': ['error', 'always'], // Enforce semicolons
    },
  },
];
