/// <reference types="vitest" />
import react from '@vitejs/plugin-react'
import * as path from 'path'
import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), checker({ typescript: true })],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true, // < ==
    environment: 'jsdom', // <==
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'], // <==
    setupFiles: './src/setupTests.ts', // <==
  },
})
