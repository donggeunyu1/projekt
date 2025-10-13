import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/donggeunyu1.github.io/'  // <-- navnet på dit repo
})