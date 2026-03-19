import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import eslintConfigPrettier from 'eslint-config-prettier'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'public/**', 'node_modules/**', '*.svg']),
  {
    plugins: {
      'simple-import-sort': simpleImportSort
    },
    rules: {
      eqeqeq: 'warn',
      'no-unneeded-ternary': 'error',
      'react/jsx-boolean-value': ['error', 'never', { always: [] }],
      'react/self-closing-comp': [
        'error',
        {
          component: true,
          html: true
        }
      ],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error'
      // complexity: ["warn", 10],
      // "max-lines-per-function": ["warn", { max: 50, skipBlankLines: true, skipComments: true }],
    }
  },
  eslintConfigPrettier
])

export default eslintConfig
