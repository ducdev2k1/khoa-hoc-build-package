import Vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { defineConfig } from 'vite';

import AutoImport from 'unplugin-auto-import/vite';
import { fileURLToPath } from 'url';

export default defineConfig({
  plugins: [
    Vue(),
    AutoImport({
      imports: [
        'vue',
        // 'pinia',
        // '@vueuse/core',
        {
          'vue-router/auto': ['useRoute', 'useRouter'],
        },
      ],
      dts: 'src/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
      },
      vueTemplate: true,
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['legacy-js-api'], // Tắt warning cho legacy JS API
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'tailwind-config': resolve(__dirname, './tailwind.config.js'),
      // inferno:
      //   process.env.NODE_ENV === 'production'
      //     ? 'inferno/dist/index.esm.js'
      //     : 'inferno/dist/index.dev.esm.js',
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
