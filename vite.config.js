import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/encyclopedia/',
  server: {
    historyApiFallback: true, // This helps Vite handle SPA routing
  }
})