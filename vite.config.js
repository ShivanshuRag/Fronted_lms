import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   proxy:{
  //     '/api/v1' : 'https://persona-bknd3.vercel.app'
  //   }
  // },

  plugins: [react()],
})
