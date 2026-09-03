import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import netlify from '@netlify/vite-plugin-tanstack-start'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  ssr: {
    noExternal: ["mui-tiptap"],
  },
  plugins: [devtools(), netlify(), tanstackStart(), viteReact()],
})

export default config
