import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePluginFonts } from 'vite-plugin-fonts';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default () =>
  defineConfig({
    build: {
      outDir: 'build',
    },
    server: {
      port: 3000,
      host: true,
    },
    assetsInclude: ['**/*.png'],
    plugins: [
      tsconfigPaths(),
      svgr({
        svgrOptions: {
          icon: true,
        },
      }),
      VitePWA({
        injectRegister: 'auto',
        registerType: 'prompt',
        includeAssets: ['favicon.ico', 'apple-icon-180.png'],
        manifest: {
          name: 'Tabatappka',
          display: 'fullscreen',
          short_name: 'Tabatappka',
          description: 'An awesome tabata timer app',
          theme_color: '#FAF6F4',
          start_url: '/',
          icons: [
            {
              src: 'manifest-icon-192.maskable.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: 'manifest-icon-192.maskable.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'maskable',
            },
            {
              src: 'manifest-icon-512.maskable.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: 'manifest-icon-512.maskable.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
            {
              src: '/android-chrome-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '/android-chrome-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
      }),
      VitePluginFonts({
        google: {
          display: 'swap',
          families: [
            {
              name: 'Nunito',
              styles: 'wght@300;400;500;600;700;800',
            },
          ],
        },
      }),
      react({
        exclude: /\.stories\.(t|j)sx?$/,
      }),
    ],
  });
