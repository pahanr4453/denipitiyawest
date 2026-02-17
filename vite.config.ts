import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // optimizeDeps කොටස සම්පූර්ණයෙන්ම ඉවත් කළා
});
