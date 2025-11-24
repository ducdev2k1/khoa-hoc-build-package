# 09 — Push Notifications (Tùy chọn nâng cao)

## Tổng quan
Web Push gồm: client (subscribe), server (gửi push với VAPID keys), và service worker (show notification).

## Bước chính
1. Tạo VAPID keys (trên server)
2. Client subscribe:
```js
const reg = await navigator.serviceWorker.ready;
const sub = await reg.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: '<VAPID_PUBLIC_KEY>'
});
```
3. Store `sub` ở server và dùng để gửi push.
4. Trong `sw.js` xử lý `push` event.

## Lưu ý
- Phức tạp hơn, cần backend hỗ trợ (Node/Express minh họa bằng `web-push` npm).
- Phải xin quyền Notification: `Notification.requestPermission()`
