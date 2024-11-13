import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy:{
      "/api/categories/":"http://localhost:8080",
      "/api/categories/delete/{id}":"http://localhost:8080",
      "/api/categories/save/":"http://localhost:8080",
      "/api/categories/edit/{id}":"http://localhost:8080",
      "/api/appareils/":"http://localhost:8080",
      "/api/appareils/{id}":"http://localhost:8080",
      "/api/appareils/delete/{id}":"http://localhost:8080",
      "/api/appareils/save/":"http://localhost:8080",
      "/api/image/appareils/":"http://localhost:8080",
      "/api/image/appareils/{id}":"http://localhost:8080",
      "/api/imageAppareils/delete/{id}":"http://localhost:8080",
      "/api/image/appareils/save":"http://localhost:8080",
      "/api/appareils/categories/{id}":"http://localhost:8080",
      "/api/appareils/search/{name}":"http://localhost:8080",
      "/api/models":"http://localhost:8080",
      "/api/models/delete/{id}":"http://localhost:8080",
      "/api/models/":"http://localhost:8080",
    }
  }
})
