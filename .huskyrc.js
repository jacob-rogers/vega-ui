const tasks = (arr) => arr.join(' && ');

module.exports = {
  hooks: {
    'pre-commit': 'lint-staged',
    'prepare-commit-msg': tasks(['node git-commit-message.js']),
    'pre-push': 'yarn test',
  },
};
