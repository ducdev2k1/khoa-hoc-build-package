# 01 — Giới thiệu PWA

## PWA là gì?
Progressive Web App (PWA) là tập hợp các kỹ thuật giúp website hoạt động như một ứng dụng native: cài đặt được (installable), chạy offline, có hiệu suất cao và trải nghiệm giống app.

## Lợi ích chính
- Cải thiện trải nghiệm người dùng (Add to Home Screen)  
- Hoạt động offline hoặc mạng yếu  
- Cải thiện hiệu năng (cache assets, LCP tốt hơn)  
- Có thể push notification, background sync (nâng cao)

## Thành phần chính
- Web App Manifest (`manifest.json`) — metadata, icons, short_name...
- Service Worker — script chạy ở background xử lý cache/fetch/push
- Cache strategies — cách lưu assets và dữ liệu
- HTTPS — yêu cầu bắt buộc cho service worker và nhiều API
