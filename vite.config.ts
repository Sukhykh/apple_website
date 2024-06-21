import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sentryVitePlugin({
    org: "kostiantyn-1v",
    project: "iphone-website"
  })],

  resolve: {
    alias: {
      '@constants': path.resolve(__dirname, './src/constants'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@components': path.resolve(__dirname, './src/components'),
    }
  },

  build: {
    sourcemap: true
  }
})