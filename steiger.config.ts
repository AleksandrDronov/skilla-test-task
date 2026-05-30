import { defineConfig } from 'steiger'
import fsd from '@feature-sliced/steiger-plugin'

export default defineConfig([
  ...fsd.configs.recommended,
  {
    rules: {
      'fsd/insignificant-slice': 'off',
      // Проверка Public API — через ESLint (alias → index.ts)
      'fsd/no-public-api-sidestep': 'off',
    },
  },
])
