module.exports = {
  extends: [require.resolve('@gpn-prototypes/frontend-configs/eslintrc')],
  rules: {
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    '@typescript-eslint/no-empty-function': 'off',
  },
};
