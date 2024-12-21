



import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'


// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   proxy:{
  //     '/api/v1' : 'https://backend-lms-aoxs.onrender.com'
  //   }
  // },
  
  devServer: {
    allowedHosts: 'all',
  },

  plugins: [react()],

  build: {
    outDir: 'dist', // Output directory for production build
    minify: 'terser', // Minify JavaScript for production
    sourcemap: false, // Disable sourcemaps in production
  },
})
