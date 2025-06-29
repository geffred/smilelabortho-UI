import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/categories/": "http://localhost:8080",
      "/api/categories/delete/{id}": "http://localhost:8080",
      "/api/categories/save/": "http://localhost:8080",
      "/api/categories/edit/{id}": "http://localhost:8080",

      "/api/appareils/": "http://localhost:8080",
      "/api/appareils/{id}": "http://localhost:8080",
      "/api/appareils/delete/{id}": "http://localhost:8080",
      "/api/appareils/save/": "http://localhost:8080",
      "/api/appareils/categories/{id}": "http://localhost:8080",
      "/api/appareils/search/{name}": "http://localhost:8080",

      "/api/image/appareils/": "http://localhost:8080",
      "/api/image/appareils/{id}": "http://localhost:8080",
      "/api/image/appareils/save": "http://localhost:8080",
      "/api/imageAppareils/delete/{id}": "http://localhost:8080",

      "/api/models": "http://localhost:8080",
      "/api/models/delete/{id}": "http://localhost:8080",

      "/api/paniers/": "http://localhost:8080",
      "/api/paniers/{id}": "http://localhost:8080",

      "/api/auth/register": "http://localhost:8080",
      "/api/auth/login": "http://localhost:8080",
      "/api/auth/update": "http://localhost:8080",
      "/api/auth/update/image": "http://localhost:8080",
      "/api/auth/utilisateurs/": "http://localhost:8080",
      "/api/auth/utilisateurs/{email}": "http://localhost:8080",

      "/api/adresses/": "http://localhost:8080",
      "/api/adresses/add": "http://localhost:8080",
      "/api/adresses/delete/": "http://localhost:8080",
      "/api/adresses/utilisateur/": "http://localhost:8080",

      "/api/commandes/": "http://localhost:8080",
      "/api/commandes/utilisateur/{id}": "http://localhost:8080",

      "/api/payments/create-payment-intent": "http://localhost:8080",
      "/api/files/upload/": "http://localhost:8080",
      "/api/files/download/": "http://localhost:8080",

      "/api/declarations/": "http://localhost:8080",
      "/api/declarations/{id}": "http://localhost:8080",

      // ✅ Routes pour les messages
      "/api/messages/recus/": "http://localhost:8080",
      "/api/messages/envoyer/": "http://localhost:8080",
      "/api/messages/": "http://localhost:8080",

      // ✅ Routes pour les images des messages
      "/api/images/message/": "http://localhost:8080",
      "/api/images/": "http://localhost:8080",

      // ✅ Routes pour les fichiers liés aux messages
      "/api/files/message/": "http://localhost:8080",
      "/api/files/images/": "http://localhost:8080",
      "/api/files/upload/patient/": "http://localhost:8080",
      "/api/files/message/download/": "http://localhost:8080",
    },
  },
});
