import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Explicitly stringify to ensure reliable detection in the browser
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || 'undefined'),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
  },
});