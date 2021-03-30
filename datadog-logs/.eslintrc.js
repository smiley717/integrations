module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-hooks', '@typescript-eslint', '@next/next'],
  extends: ['plugin:@next/next/recommended'],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      impliedStrict: true,
      experimentalObjectRestSpread: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
