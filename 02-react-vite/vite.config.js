import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port:3000, //muda a porta padrão vite(5173) para a padrão react(3000)
    open:true, //abre o navegador automaticamente
    host:true, //Permite que tenha acesso via IP na rede Local
  }
})
