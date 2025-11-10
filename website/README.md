# Website Khóa học Build Package

Website khóa học "Đóng gói Component Vue 3 thành Thư viện và Xuất bản lên Npm"

## 🚀 Development

```bash
# Cài đặt dependencies
pnpm install

# Chạy dev server
pnpm run dev

# Build production
pnpm run build

# Preview production build
pnpm run preview
```

## 📦 Deploy lên Vercel

### Cách 1: Deploy qua Vercel CLI

```bash
# Cài đặt Vercel CLI
pnpm i -g vercel

# Deploy
vercel

# Deploy production
vercel --prod
```

### Cách 2: Deploy qua GitHub

1. Push code lên GitHub
2. Truy cập [Vercel](https://vercel.com)
3. Import project từ GitHub
4. Vercel sẽ tự động detect Vite và deploy

### Cách 3: Deploy qua GitLab

1. Push code lên GitLab
2. Truy cập [Vercel](https://vercel.com)
3. Import project từ GitLab
4. Vercel sẽ tự động detect Vite và deploy

## 📝 Cấu trúc Project

```
website/
├── public/           # Static files (markdown files sẽ được copy vào đây)
├── src/
│   ├── components/   # Vue components
│   ├── views/        # Page components
│   ├── router/       # Vue Router config
│   ├── utils/        # Utilities
│   ├── App.vue       # Root component
│   ├── Layout.vue    # Layout component
│   └── main.ts       # Entry point
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── vercel.json       # Vercel config
```

## 🔧 Cấu hình

### Copy Markdown Files

Cần copy các file markdown từ thư mục gốc vào `public/`:

```bash
# Copy lessons
cp lessons/*.md public/lessons/

# Copy other files
cp SETUP.md public/
cp RESOURCES.md public/
cp EXAMPLES.md public/
```

Hoặc tạo script trong `package.json`:

```json
{
  "scripts": {
    "copy-md": "mkdir -p public/lessons && cp ../lessons/*.md public/lessons/ && cp ../SETUP.md public/ && cp ../RESOURCES.md public/ && cp ../EXAMPLES.md public/"
  }
}
```

## 📚 Tài liệu

- [Vue 3 Documentation](https://vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Vercel Documentation](https://vercel.com/docs)

