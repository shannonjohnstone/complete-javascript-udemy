module.exports = {
    parser: 'babel-eslint',
    parserOptions: {
      'sourceType': 'module'
    },
    extends: [
      'eslint:recommended',
      'plugin:node/recommended',
      'plugin:prettier/recommended',
      'plugin:import/errors',
      'plugin:import/warnings'
    ],
    rules: {
      "node/no-unsupported-features/es-syntax": ["error", {
        "version": ">=10.16.0",
        "ignores": ['modules']
      }],
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
  