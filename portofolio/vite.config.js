import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
   server: {
    allowedHosts: [
      '1d3e-2a02-2f04-f215-cb00-250d-73ba-9819-b6bf.ngrok-free.app'
    ]
  }
})
