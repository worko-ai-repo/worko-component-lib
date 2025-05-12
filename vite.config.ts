import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({
    entryRoot: 'src',
    outDir: 'dist',
    tsconfigPath: './tsconfig.app.json'
  })],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'dist',
    lib: {
      entry: 'src/index.ts', // or .tsx
      name: 'LibWorkoAI',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
    }
  }
});
