import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// IMPORTANT: when deploying to GitHub Pages at https://<user>.github.io/<repo>/
// the `base` MUST be "/<repo>/" (with leading + trailing slash) so JS/CSS/images
// resolve correctly. If you rename the repo, update this value.
// Current target: https://<your-username>.github.io/abdallah-elmaghawry/
export default defineConfig({
  base: '/abdallah-elmaghawry/',
  plugins: [react(),
   tailwindcss()
  ],
})
