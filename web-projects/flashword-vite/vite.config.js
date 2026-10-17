import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/words': {
        target: 'http://localhost:8100',
        changeOrigin: true,
      },
    },
  },
});
