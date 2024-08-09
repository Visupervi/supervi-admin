import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import viteCompression from "vite-plugin-compression"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      threshold: 500000 // 压缩，大于500k,压缩成gzip
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "antd-verndor": ["antd"],
          "lodash": ["lodash"],
          "echarts": ["echarts"],
          "redux-vendor": ["react-redux", "@reduxjs/toolkit"],
          'utils': ["/src\/utils/"]
        }

      }
    }
  }

})
