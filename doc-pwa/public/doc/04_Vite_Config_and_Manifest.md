# 04 — Cấu hình Vite + Manifest

## Thêm cấu hình vào `vite.config.ts`

```ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "robots.txt", "icons/*.png"],
      manifest: {
        name: "My Vue PWA",
        short_name: "VuePWA",
        description: "Demo Progressive Web App built with Vue 3 and Vite",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "/pwa-32x32.png",
            sizes: "32x32",
            type: "image/png",
          },
          {
            src: "/pwa-96x96.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
```

## Ghi chú

- `registerType: 'autoUpdate'` giúp service worker tự động cập nhật khi có build mới.
- `includeAssets` để bao gồm những file tĩnh từ thư mục public.
- Manifest file được tự động sinh theo cấu hình ở trên; bạn có thể đặt manifest riêng nếu muốn.
