import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('/node_modules/three/')) return 'vendor-three';
            if (id.includes('/node_modules/katex/')) return 'vendor-katex';
            if (id.includes('/node_modules/marked/')) return 'vendor-markdown';
            if (id.includes('/node_modules/gsap/') || id.includes('/node_modules/lenis/') || id.includes('/node_modules/framer-motion/')) return 'vendor-animation';
            if (id.includes('/node_modules/recharts/')) return 'vendor-charts';
            return 'vendor-core';
          }
        }
      }
    }
  }
})
