import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  publicDir: 'public/site',
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    sourcemap: false,
  },
})
