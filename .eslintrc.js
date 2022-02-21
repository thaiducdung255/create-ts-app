module.exports = {
   env: {
      es2021: true,
      node: true,
   },
   extends: [
      'airbnb',
   ],
   parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
   },
   rules: {
      indent: ['error', 3],
   },
};
