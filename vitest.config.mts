import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
 
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    setupFiles: "./tests/setup.ts",

    // Stops Playwright tests running
    exclude: [
      'node_modules',
      'dist',
      'e2e/**',
      '**/*.e2e.*',
    ],
  },
})