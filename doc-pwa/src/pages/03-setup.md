# 03 — Setup (Step-by-step)

## Yêu cầu môi trường
- Node.js >= 16 (khuyến nghị 18+)
- npm hoặc yarn
- Vue 3 + Vite project (nếu chưa có, tạo nhanh)
```bash
npm init vite@latest my-pwa -- --template vue
cd my-pwa
npm install
```

## Cài plugin PWA cho Vite
```bash
npm install -D vite-plugin-pwa
# hoặc yarn add -D vite-plugin-pwa
```

## Cấu trúc thư mục gợi ý
```
my-pwa/
  public/
    icons/
      pwa-192x192.png
      pwa-512x512.png
    favicon.ico
  src/
    main.ts
    App.vue
  vite.config.ts
```

## Tạo icons
Chuẩn bị ít nhất 192x192 và 512x512 PNG. Đặt vào `public/icons/`.
