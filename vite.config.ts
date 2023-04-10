/// <reference types="vitest" />
/// <reference types="vite/client" />

import path from 'path';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dts({ rollupTypes: true }), react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'PloneRESTAPIClient',
      fileName: (format) => `plone-client.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTesting.ts',
    // you might want to disable it, if you don't have tests that rely on CSS
    // since parsing CSS is slow
    css: true,
  },
});
