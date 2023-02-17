module.exports = {
  root: true,
  ignorePatterns: ['**/.out'],
  extends: [
    '.eslintrc.base.cjs',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:sonarjs/recommended',
    'plugin:storybook/recommended',
    'plugin:unicorn/recommended',
  ],
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  rules: {
    'unicorn/no-abusive-eslint-disable': 'off',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    'jsx-a11y/anchor-is-valid': 'off',
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@app/**',
            group: 'internal',
            position: 'after',
          },
        ],
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        alphabetize: { order: 'asc', caseInsensitive: true },
        'newlines-between': 'always',
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        // NOTE:
        // Add / remove / update patterns according to app modules structure.
        patterns: [
          {
            group: ['**/../../[a-zA-Z]*/[a-zA-Z]*'],
            message: 'File not exposed from the module. Consider exporting it from an index.',
          },
        ],
      },
    ],
    'react/no-unescaped-entities': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          camelCase: true,
          pascalCase: true,
        },
      },
    ],
    'unicorn/no-null': 'off',
    'unicorn/prevent-abbreviations': [
      'error',
      {
        ignore: [/props$/i, /docs$/i, /params$/i, /ref$/i, 'args'],
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.d.ts'],
      rules: {
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: ['variable'],
            format: ['camelCase', 'PascalCase', 'snake_case'],
          },
        ],
        'unicorn/filename-case': 'off',
        'unicorn/prevent-abbreviations': 'off',
      },
    },
    {
      files: ['src/api/core/*'],
      rules: {
        'unicorn/no-abusive-eslint-disable': 'off',
      },
    },
    {
      files: ['**/*.test.{ts,tsx}'],
      extends: ['plugin:testing-library/react'],
    },
    // Storybook requires default exports in the CSF format
    // ref. to https://storybook.js.org/docs/formats/component-story-format for details
    {
      files: ['*.stories.*'],
      rules: {
        'import/no-default-export': 'off',
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: true,
          },
        ],
      },
    },
    {
      files: ['vite.config.ts', 'vitest.config.ts'],
      rules: {
        'import/prefer-default-export': 'off',
        'import/no-default-export': 'off',
      },
    },
  ],
};
