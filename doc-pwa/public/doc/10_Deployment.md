# 10 — Triển khai PWA

## Yêu cầu
- HTTPS (hoặc localhost cho dev)
- Service worker file phải được phục vụ ở root hoặc đúng `scope`

## Hosting phổ biến
- **Vercel**: deploy dễ, serverless, SPA fallback cần config `vercel.json` nếu SPA.
- **Netlify**: deploy từ repo, cung cấp redirects và headers.
- **Firebase Hosting**: hỗ trợ rewrite, cache control, và HTTPS.

## Kiểm tra sau deploy
1. Mở site trên HTTPS
2. Mở DevTools → Application → Manifest (kiểm tra icons, start_url)
3. Service worker phải đăng ký thành công
4. Chạy Lighthouse (Application/PWA checklist)
