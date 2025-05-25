import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwind from '@tailwindcss/vite';
import { configDefaults } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwind()],
  test: {
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, './src/**/*.stories.jsx'],
  },
});
