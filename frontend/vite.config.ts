import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  root: 'project', // Ensure the root is set to the main project folder
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
