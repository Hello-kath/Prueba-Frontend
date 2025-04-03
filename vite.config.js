import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://prueba-backend-ioxq.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/contactos/, '/contactos')
      },
      '/api/buscar': {
        target: 'https://prueba-backend-ioxq.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/buscar/, '/buscar')
      }
    }
  }
});