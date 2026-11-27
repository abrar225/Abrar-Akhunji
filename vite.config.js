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
            if (/\/node_modules\/(three|@react-three\/fiber|react-reconciler|react-use-measure|suspend-react|its-fine|zustand)\//.test(id)) return 'vendor-three';
            if (id.includes('/node_modules/katex/')) return 'vendor-katex';
            if (id.includes('/node_modules/marked/')) return 'vendor-markdown';
            if (id.includes('/node_modules/gsap/')) return 'vendor-scroll';
            if (id.includes('/node_modules/framer-motion/') || id.includes('/node_modules/motion-dom/') || id.includes('/node_modules/motion-utils/')) return 'vendor-animation';
            if (/\/node_modules\/(recharts|@reduxjs|redux|redux-thunk|react-redux|reselect|immer|decimal.js-light|es-toolkit|eventemitter3|victory-vendor|d3-[^/]+)\//.test(id)) return 'vendor-charts';
            return 'vendor-core';
          }
        }
      }
    }
  }
})
