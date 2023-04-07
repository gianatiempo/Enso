module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
    // 'import/resolver': {
    //   node: {
    //     paths: ['src'],
    //     extensions: ['.js', '.jsx', '.ts', '.tsx'],
    //   },
    //   alias: [['@', './src']],
    // },
  },
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended', // Make sure this is always the last element in the array.
  ],
  plugins: ['import', 'prettier'],
  rules: {
    semi: 0,
    indent: 0,
    'arrow-parens': 0,
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],

    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/jsx-uses-react': 0,
    'react/react-jsx-in-scope': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-props-no-spreading': 0,

    'jsx-a11y/accessible-emoji': 'off',
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],

    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-var-requires': 0,

    // 'simple-import-sort/imports': 'error',
    // 'simple-import-sort/exports': 'error',

    'no-use-before-define': 0,
    'no-unused-vars': 0,
    'implicit-arrow-linebreak': 0,
    'consistent-return': 0,
    'object-curly-newline': 0,
    'operator-linebreak': 0,

    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@/**',
            group: 'internal',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'never',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
}
