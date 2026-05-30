import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const src = path.resolve(__dirname, './src')

/** Public API entrypoints for FSD slices (Vite 8 / Rolldown-safe) */
const fsdPublicApi = {
  '@/entities/call': path.join(src, 'entities/call/index.ts'),
  '@/features/filter-calls-by-type': path.join(src, 'features/filter-calls-by-type/index.ts'),
  '@/features/filter-calls-by-period': path.join(src, 'features/filter-calls-by-period/index.ts'),
  '@/features/sort-calls': path.join(src, 'features/sort-calls/index.ts'),
  '@/features/play-call-record': path.join(src, 'features/play-call-record/index.ts'),
  '@/widgets/calls-table': path.join(src, 'widgets/calls-table/index.ts'),
  '@/pages/calls': path.join(src, 'pages/calls/index.ts'),
  '@/shared/config': path.join(src, 'shared/config/index.ts'),
  '@/shared/lib': path.join(src, 'shared/lib/index.ts'),
  '@/shared/ui': path.join(src, 'shared/ui/index.ts'),
}

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      ...fsdPublicApi,
      '@': src,
    },
  },
})
