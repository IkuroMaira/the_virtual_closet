import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': { // Intercepte les requêtes vers /api
        target: 'http://localhost:8000', // redirige vers le backend
        changeOrigin: true, // Change l'origine pour éviter CORS
        rewrite: (path) => path.replace(/^\/api/, '') // Retire /api du chemin
      }
    }
  }
})
