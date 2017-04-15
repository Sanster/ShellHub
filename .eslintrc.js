module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true
    },
    plugins: ['jsx-a11y', 'react'],
    parserOptions: {
      ecmaVersion: 7,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
        generators: true,
        experimentalObjectRestSpread: true,
      },
    },
    rules: {
        indent: [ 'error', 2 ],
        quotes: [ 'error', 'single' ],
        semi: [ 'error', 'never' ]
    }
};