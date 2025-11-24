# 08 — Auto Update & Versioning

## registerSW (virtual)
`vite-plugin-pwa` cung cấp `virtual:pwa-register` để dễ manage cập nhật.

Ví dụ:
```ts
// main.ts
import { registerSW } from 'virtual:pwa-register';

const updateSW = registerSW({
  onNeedRefresh() {
    // show toast 'Có bản mới, bấm để cập nhật'
  },
  onOfflineReady() {
    // optional: toast 'App đã sẵn sàng dùng offline'
  }
});
```

## Pattern hiển thị update
1. Khi `onNeedRefresh` được gọi, show toast/modal "Có version mới"
2. Người dùng click "Reload" → gọi `updateSW(true)` hoặc `window.location.reload()`

## Lưu ý versioning
- Tạo cách quản lý version trong app (package.json version) để dễ debug.
- Clean cache cũ khi activate.
