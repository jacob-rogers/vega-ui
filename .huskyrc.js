module.exports = {
  hooks: {
    ...require.resolve('@gpn-prototypes/frontend-configs/.huskyrc.js').hooks,
    'pre-push': 'yarn test',
  },
};
