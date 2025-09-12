import js from '@eslint/js'
import next from '@next/eslint-plugin-next'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'

export default [
  js.configs.recommended,
  next.configs['core-web-vitals'],
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      // Add TypeScript rules here
    },
  },
  {
    ignores: [
      'node_modules/**',
      'public/**',
      'coverage/**',
      '.next/**',
      '.swc/**'
    ]
  }
]
