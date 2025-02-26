const localePrettierConfig = require('./.prettierrc');

module.exports = {
  extends: [require.resolve('@gpn-prototypes/frontend-configs/.eslintrc')],
  plugins: ['testing-library', 'jest-dom'],
  rules: {
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    'no-use-before-define': 'off',
    'react/require-default-props': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': ['error'],
    'no-shadow': 'off',
    'prettier/prettier': ['off', localePrettierConfig],
    '@typescript-eslint/no-shadow': ['error'],
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',
    'jest-dom/prefer-checked': 'error',
    'jest-dom/prefer-empty': 'error',
    'jest-dom/prefer-to-have-text-content': 'error',
    'jest-dom/prefer-to-have-value': 'error',
    'jest-dom/prefer-enabled-disabled': 'error',
    'jest-dom/prefer-required': 'error',
    'jest-dom/prefer-to-have-attribute': 'error',
    'jest-dom/prefer-in-document': 'error',
    'jest-dom/prefer-to-have-class': 'error',
    'jest-dom/prefer-to-have-style': 'error',
    'testing-library/await-async-query': 'error',
    'testing-library/no-await-sync-query': 'error',
    'testing-library/no-debug': 'warn',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['vega-components', './src/components'],
          ['vega-hooks', './src/hooks/index.ts'],
        ],
        extensions: ['.ts', '.d.ts', '.js', '.jsx', '.json'],
      },
    },
  },
};
