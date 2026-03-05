import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, //mudança na porta padrão do vite que era 5173, para uma padrao react 3000
    open: true, // abre o the google automaticamente
    host: true, // permitir que tenha acesso via ip local
  },
});
