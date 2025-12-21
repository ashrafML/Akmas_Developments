/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from "path";
import federation from '@originjs/vite-plugin-federation';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import viteTsconfigPaths from 'vite-tsconfig-paths'; // Add this import

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 4225,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  preview: {
    port: 4225,
    host: 'localhost',
    strictPort: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  base: '/My_App_rect/',
  plugins: [
    react(),
    viteTsconfigPaths({ // Add this plugin
      root: '../../', // Point to monorepo root where tsconfig.base.json is
    }),
    federation({
      name: 'My-App',
      filename: 'remoteEntry.js',
      exposes: {
        './Module': './src/App.tsx',
      },
      shared: ['react', 'react-dom', 'react-router-dom'],
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    cssCodeSplit: false,
    target: 'esnext',
    outDir: '../../dist/apps/my-app',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    assetsDir: '',
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  }
}));