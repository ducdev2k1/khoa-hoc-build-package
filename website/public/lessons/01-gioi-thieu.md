# Bài 01: Giới thiệu và Tổng quan

## 📖 Mục tiêu bài học

Sau bài học này, bạn sẽ:

- Hiểu được lợi ích của việc tạo thư viện component
- Nắm được các khái niệm cơ bản về Vue 3 và Composition API
- Biết các công cụ và công nghệ sẽ sử dụng trong khóa học
- Có cái nhìn tổng quan về quy trình đóng gói và publish package

## 🎯 Tại sao cần tạo thư viện component?

### 1. Tái sử dụng code

- Viết một lần, sử dụng nhiều nơi
- Giảm thiểu code duplication
- Dễ dàng maintain và update

### 2. Chia sẻ với cộng đồng

- Đóng góp cho cộng đồng Vue.js
- Xây dựng portfolio
- Tạo hệ sinh thái component riêng

### 3. Quản lý trong team

- Chuẩn hóa component trong công ty
- Dễ dàng versioning và tracking changes
- Tăng tốc độ phát triển dự án

### 4. Tách biệt concerns

- Tách logic component khỏi business logic
- Dễ dàng testing
- Cải thiện code organization

## 🚀 Vue 3 và Composition API

### Composition API là gì?

Composition API là cách tiếp cận mới trong Vue 3 để tổ chức logic component. Thay vì sử dụng Options API (data, methods, computed), bạn có thể sử dụng `setup()` function.

**Ví dụ Options API (Vue 2 style):**

```vue
<template>
  <div>{{ count }}</div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    increment() {
      this.count++;
    },
  },
};
</script>
```

**Ví dụ Composition API (Vue 3):**

```vue
<template>
  <div>{{ count }}</div>
</template>

<script setup>
import { ref } from "vue";

const count = ref(0);

const increment = () => {
  count.value++;
};
</script>
```

### Lợi ích của Composition API cho library

1. **Better TypeScript support**: Dễ dàng type-checking
2. **Better code organization**: Logic được nhóm theo chức năng
3. **Better reusability**: Có thể extract logic thành composables
4. **Better tree-shaking**: Bundler có thể loại bỏ code không sử dụng

## 🛠️ Công cụ và Công nghệ

### 1. Vite

- Build tool nhanh chóng
- HMR (Hot Module Replacement) nhanh
- Hỗ trợ TypeScript out of the box
- Cấu hình đơn giản

### 2. TypeScript

- Type safety
- Better IDE support
- Self-documenting code
- Dễ dàng refactor

### 3. npm

- Package registry lớn nhất
- Dễ dàng publish và install
- Hỗ trợ versioning
- Public và private packages

### 4. GitHub Actions

- CI/CD miễn phí
- Auto build và test
- Auto publish khi release
- Integration với npm

### 5. Storybook (Optional)

- Component documentation
- Interactive demos
- Visual testing
- Design system

## 📦 Ví dụ thực tế: inet-component

Hãy xem package mẫu: [inet-component](https://www.npmjs.com/package/inet-component)

### Cấu trúc package mẫu

```
inet-component/
├── dist/              # Build output
├── src/               # Source code
│   ├── components/    # Components
│   └── index.ts       # Entry point
├── package.json       # Package config
├── vite.config.ts     # Vite config
└── README.md          # Documentation
```

### Cách sử dụng

```bash
npm install inet-component
```

```vue
<template>
  <InetButton>Click me</InetButton>
</template>

<script setup>
import { InetButton } from "inet-component";
</script>
```

## 🔄 Quy trình đóng gói và Publish

### 1. Phát triển Component

- Tạo component với Vue 3
- Viết tests
- Tạo documentation

### 2. Cấu hình Build

- Setup Vite cho library mode
- Cấu hình TypeScript
- Setup build scripts

### 3. Build Package

- Build production bundle
- Generate TypeScript declarations
- Optimize bundle size

### 4. Publish lên npm

- Đăng ký tài khoản npm
- Cấu hình package.json
- Publish package

### 5. CI/CD (Optional)

- Setup GitHub Actions
- Auto build và test
- Auto publish khi release

## 📝 Checklist trước khi bắt đầu

- [ ] Đã cài đặt Node.js (v16+)
- [ ] Đã cài đặt npm hoặc yarn
- [ ] Có tài khoản npm
- [ ] Có tài khoản GitHub (cho CI/CD)
- [ ] Hiểu cơ bản về Vue 3
- [ ] Hiểu cơ bản về TypeScript (khuyến nghị)

## 🎓 Bài tập thực hành

1. Tạo tài khoản npm nếu chưa có: https://www.npmjs.com/signup
2. Xem package mẫu: https://www.npmjs.com/package/inet-component
3. Đọc documentation của Vue 3: https://vuejs.org/
4. Đọc documentation của Vite: https://vitejs.dev/

## 📚 Tài liệu tham khảo

- [Vue 3 Documentation](https://vuejs.org/)
- [Composition API Guide](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Vite Documentation](https://vitejs.dev/)
- [npm Documentation](https://docs.npmjs.com/)

## ➡️ Bài tiếp theo

Sẵn sàng? Hãy chuyển sang [Bài 02: Thiết lập Môi trường Phát triển](./02-thiet-lap-moi-truong.md)
