module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-case': [2, 'always', 'upper-case'],
    'type-enum': [
      2,
      'always',
      ['FEAT', 'FIX', 'DOCS', 'STYLE', 'REFACTOR', 'TEST', 'REVERT', 'CHORE'],
    ],
  },
};
