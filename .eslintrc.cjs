module.exports = {
   root: true,
   env: {
      es2021: true,
      node: true,
   },
   extends: [
      'airbnb-base',
   ],
   parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
   },
   rules: {
      indent: ['error', 3],
      'no-console': ['error', { allow: ['error', 'info'] }],
      'import/prefer-default-export': 'off',
      'import/extensions': 'off',
      'import/no-unresolved': 'off',
   },
};
