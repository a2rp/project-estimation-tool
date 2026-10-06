import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/project-estimation-tool/',
  build: {
    sourcemap: false,
  },
  plugins: [react()],
})