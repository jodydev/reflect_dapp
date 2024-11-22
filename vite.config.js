import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer'; 

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true }) 
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Gruppo più specifico per librerie come React, lodash, ecc.
            if (id.includes('react')) {
              return 'react-vendor';
            }
            if (id.includes('lodash')) {
              return 'lodash-vendor';
            }
            return 'vendor'; // Gruppo generale per tutte le altre librerie
          }
        },
      },
    },
    chunkSizeWarningLimit: 4000,
  },
});
