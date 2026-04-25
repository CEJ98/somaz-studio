import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['__tests__/**/*.test.{ts,tsx,js,jsx}'],
    exclude: ['e2e/**', 'node_modules/**', 'remotion/**', '.next/**', 'dist/**'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
})
