



import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'


// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   proxy:{
  //     '/api/v1' : 'http://localhost:5001'
  //   }
  // },
  
  // devServer: {
  //   allowedHosts: 'all',
  // },

  plugins: [react()],

 
})
