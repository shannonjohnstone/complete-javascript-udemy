module.exports = {
    parser: 'babel-eslint',
    extends: [
      'eslint:recommended',
      'plugin:node/recommended',
      'plugin:prettier/recommended',
    ],
    rules: {
      'object-curly-spacing': ['error', 'always'],
      'key-spacing': ['error', { 'afterColon': true }],
      'semi': 'error',
      'quotes': ['error', 'single'],
      'max-len': ['error', 80, {
        "ignoreComments": true,
        "ignoreStrings": true
      }],
    }
  };
  