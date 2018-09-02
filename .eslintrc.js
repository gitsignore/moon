module.exports = {
  env: {
    browser: true,
    jest: true,
    es6: true,
    node: true,
  },
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'es5',
      },
    ],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    "jsx-a11y/label-has-associated-control": [0],
    "jsx-a11y/label-has-for": [0],
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
};
