// vite.config.ts
import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    define: {
      __APP_ENV__: JSON.stringify(env.VITE_APP_MODE)
    },
    server: {
      allowedHosts: true
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'ui-components': [
              '@/components/ui/button',
              '@/components/ui/card',
              '@/components/ui/skeleton',
              '@/components/ui/input',
              '@/components/ui/label',
              '@/components/ui/select',
              '@/components/ui/dialog',
              '@/components/ui/dropdown-menu',
              // '@/components/ui/alert',
              // '@/components/ui/avatar',
              '@/components/ui/badge',
              // '@/components/ui/checkbox',
              // '@/components/ui/radio-group',
              // '@/components/ui/switch',
              // '@/components/ui/textarea',
              // '@/components/ui/tooltip'
            ],
            'form-components': [
              // '@/components/ui/form',
              // '@/components/ui/input',
              // '@/components/ui/select',
              // '@/components/ui/checkbox',
              // '@/components/ui/radio-group',
              // '@/components/ui/switch',
              // '@/components/ui/textarea',
              // '@/components/ui/label'
            ],
            'lazy-components': [
              '@/components/lazy-components/lazy-button',
              '@/components/lazy-components/lazy-card'
            ]
          }
        }
      },
      chunkSizeWarningLimit: 600
    }
  };
});