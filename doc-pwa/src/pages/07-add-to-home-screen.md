# 07 — Add to Home Screen (A2HS)

## Sự kiện `beforeinstallprompt`
Trên Chrome, trình duyệt bắn `beforeinstallprompt` khi site có thể cài.

Ví dụ:
```js
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e; // lưu để show khi user click nút
  // hiển thị nút "Install"
});

async function showInstall() {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  deferredPrompt = null;
}
```

## Lưu ý
- iOS không hỗ trợ `beforeinstallprompt`. Để hướng dẫn người dùng iOS, show hướng dẫn thủ công (Add to Home Screen via Share → Add to Home Screen).
- Đảm bảo manifest có `short_name`, `icons`, `start_url`, `display: 'standalone'`.
