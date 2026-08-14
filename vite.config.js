import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { seoPlugin } from './src/seo/vite-plugin-seo.mjs'

export default defineConfig({
  plugins: [
    tailwindcss(),
    seoPlugin(),
  ],
})
