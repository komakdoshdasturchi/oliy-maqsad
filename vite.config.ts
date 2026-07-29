import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Sozlama ataylab qisqa. Ilgari bu yerda AI Studio uchun DISABLE_HMR mantig'i va
// ishlatilmaydigan "@" alias turardi — ikkalasi ham olib tashlandi (2026-07-29).
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
