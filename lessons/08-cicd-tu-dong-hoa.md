# Bài 08: CI/CD và Tự động hóa

## 📖 Mục tiêu bài học

Sau bài học này, bạn sẽ:

- Biết cách thiết lập GitHub Actions
- Hiểu cách auto build và test
- Biết cách auto publish khi release
- Biết cách automated versioning
- Biết cách setup quality checks (linting, testing)

## 🚀 GitHub Actions

### Tạo Workflow

Tạo file `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x, 20.x]

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Type check
        run: npm run type-check

      - name: Build
        run: npm run build

      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: dist-${{ matrix.node-version }}
          path: dist/
          retention-days: 7
```

## 🧪 Testing

### Cài đặt Vitest

```bash
npm install -D vitest @vue/test-utils happy-dom
```

### Cấu hình Vitest

**vitest.config.ts:**

```typescript
import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: "happy-dom",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
```

### Ví dụ Test

**tests/components/Button.test.ts:**

```typescript
import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Button from "@/components/Button/Button.vue";

describe("Button", () => {
  it("renders correctly", () => {
    const wrapper = mount(Button, {
      slots: {
        default: "Click me",
      },
    });

    expect(wrapper.text()).toBe("Click me");
  });

  it("emits click event", async () => {
    const wrapper = mount(Button);

    await wrapper.trigger("click");

    expect(wrapper.emitted("click")).toBeTruthy();
  });

  it("applies variant class", () => {
    const wrapper = mount(Button, {
      props: {
        variant: "primary",
      },
    });

    expect(wrapper.classes()).toContain("btn--primary");
  });

  it("disables button when disabled prop is true", () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true,
      },
    });

    expect(wrapper.attributes("disabled")).toBeDefined();
  });
});
```

### package.json scripts

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:run": "vitest run"
  }
}
```

### CI Workflow với Tests

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20.x"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm run test:run

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json
```

## 🔍 Linting

### Cài đặt ESLint

```bash
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-vue
```

### .eslintrc.cjs

```javascript
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-recommended",
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    // Your rules here
  },
};
```

### package.json scripts

```json
{
  "scripts": {
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix",
    "lint:check": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts"
  }
}
```

### CI Workflow với Linting

```yaml
- name: Lint
  run: npm run lint:check
```

## 📦 Auto Publish

### Publish Workflow

Tạo file `.github/workflows/publish.yml`:

```yaml
name: Publish

on:
  release:
    types: [published]

jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20.x"
          registry-url: "https://registry.npmjs.org"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Publish to npm
        run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### Setup NPM Token

1. Tạo NPM Access Token:

   - Truy cập: https://www.npmjs.com/settings/YOUR_USERNAME/tokens
   - Generate new token (Automation type)
   - Copy token

2. Thêm vào GitHub Secrets:
   - Repository → Settings → Secrets and variables → Actions
   - New repository secret
   - Name: `NPM_TOKEN`
   - Value: Your NPM token

### Auto Version và Publish

**package.json:**

```json
{
  "scripts": {
    "release": "standard-version && git push --follow-tags"
  }
}
```

**Workflow:**

```yaml
name: Release

on:
  push:
    branches: [main]

jobs:
  release:
    runs-on: ubuntu-latest
    if: "!contains(github.event.head_commit.message, 'chore(release)')"

    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20.x"
          registry-url: "https://registry.npmjs.org"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Run tests
        run: npm run test:run

      - name: Release
        run: |
          npm run release
          npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## 🏷️ Automated Versioning

### Sử dụng standard-version

```bash
npm install -D standard-version
```

**package.json:**

```json
{
  "scripts": {
    "release": "standard-version",
    "release:minor": "standard-version --release-as minor",
    "release:major": "standard-version --release-as major",
    "release:alpha": "standard-version --prerelease alpha",
    "release:beta": "standard-version --prerelease beta"
  }
}
```

### .versionrc.json

```json
{
  "types": [
    { "type": "feat", "section": "Features" },
    { "type": "fix", "section": "Bug Fixes" },
    { "type": "chore", "section": "Chores" },
    { "type": "docs", "section": "Documentation" },
    { "type": "style", "section": "Styles" },
    { "type": "refactor", "section": "Refactoring" },
    { "type": "perf", "section": "Performance" },
    { "type": "test", "section": "Tests" }
  ]
}
```

### Conventional Commits

Sử dụng conventional commits để auto generate changelog:

```bash
# Feature
git commit -m "feat: add Button component"

# Bug fix
git commit -m "fix: fix Button click event"

# Breaking change
git commit -m "feat!: change Button API"
```

## 🔄 Complete CI/CD Workflow

### .github/workflows/ci.yml

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  quality:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20.x"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint:check

      - name: Type check
        run: npm run type-check

      - name: Build
        run: npm run build

      - name: Test
        run: npm run test:run

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json
```

### .github/workflows/publish.yml

```yaml
name: Publish

on:
  release:
    types: [published]

jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20.x"
          registry-url: "https://registry.npmjs.org"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Publish to npm
        run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## 📊 Quality Checks

### Pre-commit Hooks (Husky)

```bash
npm install -D husky lint-staged
```

**package.json:**

```json
{
  "scripts": {
    "prepare": "husky install"
  },
  "lint-staged": {
    "*.{ts,vue}": ["eslint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"]
  }
}
```

**Setup:**

```bash
npm run prepare
npx husky add .husky/pre-commit "npx lint-staged"
```

## 📋 Checklist

- [ ] Đã setup GitHub Actions
- [ ] Đã setup testing với Vitest
- [ ] Đã setup linting với ESLint
- [ ] Đã setup auto publish
- [ ] Đã setup automated versioning
- [ ] Đã setup quality checks
- [ ] Đã test CI/CD workflow

## 🎓 Bài tập thực hành

1. Tạo GitHub Actions workflow cho CI
2. Setup testing với Vitest
3. Setup linting với ESLint
4. Tạo workflow auto publish
5. Setup automated versioning
6. Test toàn bộ CI/CD pipeline

## 📚 Tài liệu tham khảo

- [GitHub Actions](https://docs.github.com/en/actions)
- [Vitest](https://vitest.dev/)
- [ESLint](https://eslint.org/)
- [standard-version](https://github.com/conventional-changelog/standard-version)
- [Conventional Commits](https://www.conventionalcommits.org/)

## 🎉 Kết thúc khóa học

Chúc mừng! Bạn đã hoàn thành khóa học "Đóng gói Component Vue 3 thành Thư viện và Xuất bản lên Npm".

Bây giờ bạn có thể:

- ✅ Tạo và đóng gói Vue 3 components thành library
- ✅ Build và bundle package với Vite
- ✅ Publish package lên npm
- ✅ Tạo tài liệu và demos
- ✅ Setup CI/CD cho tự động hóa

Hãy bắt đầu tạo library của riêng bạn! 🚀
