<script setup lang="ts">
  import { lessons } from '@/utils/lessons';
</script>

<template>
  <div class="home">
    <div class="hero">
      <h1>📦 Khóa học: Đóng gói Component Vue 3 thành Thư viện và Xuất bản lên Npm</h1>
      <p class="hero-description">
        Khóa học chi tiết về cách đóng gói Component Vue 3 thành Thư viện và Xuất bản lên Npm
      </p>
      <div class="hero-actions">
        <router-link to="/lessons/01-gioi-thieu" class="btn btn-primary">Bắt đầu học</router-link>
        <router-link to="/setup" class="btn btn-secondary">Cài đặt</router-link>
      </div>
    </div>

    <div class="content">
      <section class="section">
        <h2>🎯 Mục tiêu khóa học</h2>
        <ul>
          <li>✅ Biết cách đóng gói 1 hoặc nhiều component Vue thành thư viện tái sử dụng</li>
          <li>
            ✅ Biết cách build, bundle, và publish package lên npm registry (public hoặc private)
          </li>
          <li>✅ Hiểu cách tạo tài liệu, demos, auto build, và CI/CD publish</li>
          <li>✅ Có thể tự tạo hệ sinh thái component UI riêng của bạn</li>
        </ul>
      </section>

      <section class="section">
        <h2>📚 Nội dung khóa học</h2>
        <div class="lessons-grid">
          <router-link
            v-for="lesson in lessons"
            :key="lesson.id"
            :to="lesson.path"
            class="lesson-card">
            <div class="lesson-number">{{ lesson.order }}</div>
            <div class="lesson-content">
              <h3>{{ lesson.title }}</h3>
            </div>
          </router-link>
        </div>
      </section>

      <section class="section">
        <h2>🛠️ Yêu cầu</h2>
        <ul>
          <li>Kiến thức cơ bản về Vue 3</li>
          <li>Hiểu biết về JavaScript/TypeScript</li>
          <li>Có tài khoản npm (miễn phí)</li>
          <li>Có tài khoản GitHub hoặc GitLab (cho CI/CD)</li>
        </ul>
      </section>

      <section class="section">
        <h2>🚀 Bắt đầu</h2>
        <ol>
          <li>
            Đọc
            <router-link to="/lessons/01-gioi-thieu">Bài 01: Giới thiệu</router-link>
          </li>
          <li>
            Làm theo
            <router-link to="/setup">Hướng dẫn cài đặt</router-link>
          </li>
          <li>Làm theo từng bài học theo thứ tự</li>
          <li>Thực hành với các ví dụ trong mỗi bài</li>
        </ol>
      </section>
    </div>
  </div>
</template>

<style scoped>
  .home {
    /* max-width: 1200px; */
    margin: 0 auto;
    padding: 2rem;
  }

  .hero {
    text-align: center;
    padding: 3rem 0;
    border-bottom: 2px solid var(--border-color);
    margin-bottom: 3rem;
  }

  .hero h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    border: none;
    padding: 0;
  }

  .hero-description {
    font-size: 1.25rem;
    color: var(--color-note);
    margin-bottom: 2rem;
  }

  .hero-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  .btn {
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s;
    display: inline-block;
  }

  .btn-primary {
    background: var(--primary-color);
    color: white;
  }

  .btn-primary:hover {
    background: #35a372;
    color: white;
  }

  .btn-secondary {
    background: var(--code-bg);
    color: var(--text-color);
    border: 1px solid var(--border-color);
  }

  .btn-secondary:hover {
    background: #e0e0e0;
    color: var(--text-color);
  }

  .content {
    /* max-width: 900px; */
    margin: 0 auto;
  }

  .section {
    margin-bottom: 3rem;
  }

  .section h2 {
    margin-bottom: 1.5rem;
    color: var(--primary-color);
  }

  .lessons-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .lesson-card {
    display: flex;
    gap: 1rem;
    padding: 1.5rem;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    text-decoration: none;
    color: var(--text-color);
    transition: all 0.2s;
    background: var(--bg-card);
  }

  .lesson-card:hover {
    border-color: var(--primary-color);
    box-shadow: 0 4px 12px rgba(66, 185, 131, 0.15);
    transform: translateY(-2px);
  }

  .lesson-number {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--primary-color);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    flex-shrink: 0;
  }

  .lesson-content h3 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
  }

  @media (max-width: 767px) {
    .home {
      padding: 1rem;
    }

    .hero {
      padding: 0 0 2rem 0;
      margin-bottom: 2rem;
    }

    .hero h1 {
      font-size: 1.75rem;
    }

    .hero-actions {
      flex-direction: column;
    }

    .lessons-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
