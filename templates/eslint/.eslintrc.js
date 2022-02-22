module.exports = {
   env: {
      node: true,
   },
   extends: [
      'airbnb-base',
   ],
   parser: '@typescript-eslint/parser',
   parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
   },
   plugins: [
      '@typescript-eslint',
   ],
   ignorePatterns: ['build/', 'dist/'],
   rules: {
      indent: 'off',
      '@typescript-eslint/indent': ['error', 2],
      'comma-dangle': ['error', 'always-multiline'],
      'import/no-extraneous-dependencies': 'off',
      'import/extensions': 'off',
      'import/prefer-default-export': 'off',
      'max-len': ['error', { code: 120, ignoreTemplateLiterals: true }],
      'no-useless-constructor': 'off',
      '@typescript-eslint/no-useless-constructor': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
      'no-underscore-dangle': ['error', { allow: ['_id'] }],
   },
   settings: {
      'import/resolver': {
         node: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
         },
      },
   },
};
