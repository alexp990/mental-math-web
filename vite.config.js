import path from "path" // 1. Add this import at the top
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // 2. Add this resolve block to handle the "@" shortcut
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
