# 06 — Chiến lược Offline & Cache

## Assets vs Data
- **Assets (JS/CSS/Images)**: cache bằng CacheFirst hoặc Stale-While-Revalidate
- **API Data**: NetworkFirst hoặc Cache then Network

## Offline fallback page
Tạo một `offline.html` trong `public/` để hiển thị khi trang không có kết nối.

Trong SW (ví dụ):
```js
// trả offline.html khi request là navigation và offline
if (event.request.mode === 'navigate') {
  event.respondWith(
    fetch(event.request).catch(() => caches.match('/offline.html'))
  );
}
```

## Optimize cho LCP
- Tiến hành lazy-load ảnh, dùng `loading="lazy"` nếu phù hợp.
- Precache critical assets: CSS, hero image (nếu ảnh lớn cân nhắc prefetch hoặc use smaller placeholder).
- Sử dụng `image` caching strategy để phục vụ ngay lần tiếp theo.

## Storage options cho data offline
- LocalStorage / IndexedDB (khuyến nghị IndexedDB cho data có cấu trúc)
- Workbox background sync nếu cần đồng bộ khi online trở lại
