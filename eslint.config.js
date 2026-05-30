import boundariesPlugin from 'eslint-plugin-boundaries'
import reactRefresh from 'eslint-plugin-react-refresh'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import { configs, plugins } from 'eslint-config-airbnb-extended'
import fsdLayers from '@feature-sliced/eslint-config/rules/layers-slices/index.js'

export default [
  {
    ignores: [
      'dist',
      'node_modules',
      'coverage',
      'eslint.config.js',
      'vite.config.ts',
      'steiger.config.ts',
    ],
  },

  plugins.stylistic,
  plugins.importX,
  plugins.typescriptEslint,
  plugins.react,
  plugins.reactA11y,
  plugins.reactHooks,

  ...configs.base.all,
  ...configs.react.all,

  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: {
      boundaries: boundariesPlugin,
      'react-refresh': reactRefresh,
    },
    settings: {
      ...fsdLayers.settings,
      'boundaries/rootPath': 'src',
    },
    rules: {
      ...fsdLayers.rules,
      'import-x/no-internal-modules': 'off',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react/react-in-jsx-scope': 'off',
      'react/require-default-props': 'off',
      'import-x/prefer-default-export': 'off',
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              regex: String.raw`^@/(pages|widgets|features|entities)/[^/]+/(ui|model|lib|api)/`,
              message:
                'Импорт только через Public API: @/entities/call, @/features/sort-calls и т.д.',
            },
            {
              regex: String.raw`^@/shared/(?!config$|lib$|ui$)`,
              message: 'Импорт из shared только через @/shared/config, @/shared/lib или @/shared/ui.',
            },
          ],
        },
      ],
    },
  },

  eslintPluginPrettierRecommended,
]
