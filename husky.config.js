const tasks = arr => arr.join(' && ')

module.exports = {
  hooks: {
    'pre-commit': tasks(['yarn lint']),
    'commit-msg': 'commitlint -e $HUSKY_GIT_PARAMS'
  },
  'commit-msg': 'commitlint -e $HUSKY_GIT_PARAMS'
}
