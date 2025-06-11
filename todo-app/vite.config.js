import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 12000,
    cors: true,
    allowedHosts: [
      'work-1-avulkejnczrsgyhc.prod-runtime.all-hands.dev',
      'work-2-avulkejnczrsgyhc.prod-runtime.all-hands.dev'
    ],
    headers: {
      'X-Frame-Options': 'ALLOWALL'
    }
  }
})
