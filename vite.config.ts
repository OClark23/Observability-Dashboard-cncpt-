import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, './'),
  build: {
    rollupOptions: {
      input: 'index.html'
    }
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});