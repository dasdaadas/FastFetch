import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite' 
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';


export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
  ],

  server: {
    port: 8000,
    // // proxy:{
    // //   "/api": {
    // //     target: "http://localhost:8001",
    // //     changeOrigin: true,
    // //     rewrite: (path) => path.replace(/^\/api/,'')
    // //   }
    // },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
});
