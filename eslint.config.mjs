import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import { globalIgnores } from 'eslint/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:testing-library/react',
    'plugin:jest-dom/recommended'
  ),
  {
    files: ['cypress/**/*.ts', 'cypress/**/*.js'],
    rules: {
      'testing-library/prefer-screen-queries': 'off',
      'testing-library/no-node-access': 'off',
    },
  },
  {
    files: ['src/app/**/*.{js,jsx,ts,tsx}'], // app folder imports
    rules: {
      'no-restricted-imports': ['error', { patterns: ['@/features/*/**'] }], // allowed only @/features/*/index.ts
    },
  },
  {
    files: ['src/components/**/*.{js,jsx,ts,tsx}'], // global components folder imports
    rules: {
      'no-restricted-imports': ['error', { patterns: ['@/app/*', '@/features/*', '@/pages/*'] }],
    },
  },
  {
    files: ['src/components/pages/**/*.{js,jsx,ts,tsx}'], // pages folder imports
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: ['@/app/*', '@/features/*/**'], // allowed only @/features/*/index.ts
        },
      ],
    },
  },
  {
    ignores: ['.next/*', 'node_modules/*', 'coverage/*', 'jest.config.js', 'jest.setup.js'],
  },
  globalIgnores([
    './.next/*',
    './node_modules/*',
    './coverage/*',
    './jest.config.js',
    './jest.setup.js',
  ]),
];

export default eslintConfig;
