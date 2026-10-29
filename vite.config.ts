import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// GitHub Pages is served from /<repo>/. SiteGround stays at the domain root.
const pagesBase =
  (globalThis as { process?: { env?: { VITE_BASE?: string } } }).process?.env?.VITE_BASE || '/';

export default defineConfig({
  base: pagesBase,
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    css: false,
  },
});
