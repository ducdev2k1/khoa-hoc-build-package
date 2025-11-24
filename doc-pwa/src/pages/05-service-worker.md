# 05 — Service Worker (chi tiết)

## Service worker là gì?
Service worker là một script chạy tách biệt khỏi trang web, có thể intercept network requests, cache assets, và xử lý push notification.

## Lifecycle tóm tắt
- `install` — tải và cache assets cơ bản
- `activate` — dọn dẹp cache cũ
- `fetch` — intercept request và trả về từ cache hoặc fetch từ network

## Ví dụ chiến lược cache (giải thích)
- **Cache First**: ưu tiên trả từ cache, fallback network — tốt cho images, fonts.
- **Network First**: ưu tiên network, fallback cache — tốt cho API cần mới nhất.
- **Stale-While-Revalidate**: trả cache nhanh, đồng thời fetch phiên bản mới để update cache.

## Customizing service worker
`vite-plugin-pwa` có 2 chế độ chính:
- **GenerateSW** (workbox auto-generated): dễ dùng, ít cấu hình code.
- **InjectManifest**: bạn viết SW thủ công và plugin sẽ inject manifest; phù hợp khi cần logic phức tạp.

### Ví dụ simple custom fetch với InjectManifest
```js
// src/sw.js
self.addEventListener('fetch', (event) => {
  // custom logic
})
```

## Debugging
- Mở DevTools → Application → Service Workers
- Sử dụng "Update on reload" khi phát triển
