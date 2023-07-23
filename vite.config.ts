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
      external: ['react', 'react-dom', 'axios'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
