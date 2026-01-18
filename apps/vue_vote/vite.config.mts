/// <reference types='vitest' />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig(() => ({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/apps/app-vue',
  server: {
    port: 4226,
    host: 'localhost',
     headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  preview: {
    port: 4300,
    host: 'localhost',
      headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
     base: '/Vue_vote/',

  plugins: [vue(),
       federation({
      name: 'VUEs', // A unique name for your remote app
      filename: 'remoteEntry.js', // The manifest file for exposed modules
      exposes: {
        // Expose a component here. This will be the component the host consumes.
        './Module': './src/app/app.vue',
      },
       shared: ['vue', 'vue-router'
   ]
}),
    nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  build: {
    cssCodeSplit: false,
    outDir: '../../dist/apps/vue_vote',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
     assetsDir:'',
  },
  test: {
    name: 'app-vue',
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/apps/app-vue',
      provider: 'v8' as const,
    },
  },
}));
