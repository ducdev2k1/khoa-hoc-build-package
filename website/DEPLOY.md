# 🚀 Hướng dẫn Deploy Website lên Vercel

## 📋 Yêu cầu

- Tài khoản Vercel (miễn phí): https://vercel.com/signup
- Code đã được push lên GitHub hoặc GitLab

## 🚀 Cách 1: Deploy qua Vercel Dashboard (Khuyến nghị)

### Bước 1: Chuẩn bị

1. Đảm bảo code đã được push lên GitHub/GitLab
2. Đảm bảo đã có file `vercel.json` trong thư mục `website/`

### Bước 2: Import Project

1. Truy cập: https://vercel.com/new
2. Chọn **Import Git Repository**
3. Chọn repository của bạn
4. **Quan trọng:** Set **Root Directory** là `website`
5. Vercel sẽ tự động detect:
   - **Framework Preset:** Vite
   - **Build Command:** `pnpm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `pnpm install`

### Bước 3: Cấu hình (nếu cần)

Nếu Vercel không tự detect đúng:

- **Root Directory:** `website` ⚠️ **Quan trọng!**
- **Framework Preset:** Vite
- **Build Command:** `pnpm run build`
- **Output Directory:** `dist`
- **Install Command:** `pnpm install`

### Bước 4: Deploy

1. Click **Deploy**
2. Chờ build hoàn thành
3. Website sẽ được deploy tại: `https://your-project.vercel.app`

## 🚀 Cách 2: Deploy qua Vercel CLI

### Bước 1: Cài đặt Vercel CLI

```bash
pnpm i -g vercel
```

### Bước 2: Login

```bash
vercel login
```

### Bước 3: Deploy

```bash
cd website
vercel
```

### Bước 4: Deploy Production

```bash
vercel --prod
```

## 🔧 Cấu hình Vercel

### vercel.json

File `vercel.json` đã được tạo với cấu hình:

```json
{
  "buildCommand": "pnpm run build",
  "outputDirectory": "dist",
  "devCommand": "pnpm run dev",
  "installCommand": "pnpm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Environment Variables (nếu cần)

Nếu bạn cần environment variables:

1. Vercel Dashboard → Project → Settings → Environment Variables
2. Thêm các variables cần thiết

## 📝 Lưu ý

### 1. Root Directory ⚠️ QUAN TRỌNG

Nếu project của bạn có cấu trúc:
```
project/
├── website/    # Website code
├── lessons/    # Markdown files
└── ...
```

**Bắt buộc** phải set **Root Directory** trong Vercel là `website`

**Cách set:**
1. Vercel Dashboard → Project → Settings → General
2. Scroll xuống **Root Directory**
3. Nhập: `website`
4. Save

### 2. Build Script

Script `copy-md.js` sẽ tự động copy markdown files vào `public/` khi build:

```json
{
  "scripts": {
    "build": "node scripts/copy-md.js && vue-tsc && vite build"
  }
}
```

### 3. Markdown Files

Đảm bảo các file markdown được copy vào `public/`:
- `public/lessons/*.md` - Các bài học
- `public/SETUP.md` - Hướng dẫn cài đặt
- `public/RESOURCES.md` - Tài liệu tham khảo
- `public/EXAMPLES.md` - Ví dụ code

## 🔄 Auto Deploy

Vercel sẽ tự động deploy khi:
- Push code lên branch `main` (production)
- Push code lên các branch khác (preview)

## 🌐 Custom Domain

1. Vercel Dashboard → Project → Settings → Domains
2. Thêm domain của bạn
3. Follow instructions để setup DNS

## 📚 Tài liệu tham khảo

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel CLI](https://vercel.com/docs/cli)
- [Vite Deployment](https://vitejs.dev/guide/static-deploy.html#vercel)

## ✅ Checklist

- [ ] Code đã được push lên GitHub/GitLab
- [ ] File `vercel.json` đã được tạo
- [ ] Script `copy-md.js` hoạt động đúng
- [ ] Build thành công local (`pnpm run build`)
- [ ] **Root Directory** đã được set là `website` trong Vercel
- [ ] Đã deploy lên Vercel
- [ ] Website hoạt động đúng
- [ ] Markdown files được load đúng

## 🎉 Hoàn thành!

Sau khi deploy thành công, website của bạn sẽ có URL:
- Production: `https://your-project.vercel.app`
- Preview: `https://your-project-git-branch.vercel.app`
