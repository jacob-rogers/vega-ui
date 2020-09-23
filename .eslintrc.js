module.exports = {
  extends: [require.resolve('@gpn-prototypes/frontend-configs/.eslintrc')],
  rules: {
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
  },
};
