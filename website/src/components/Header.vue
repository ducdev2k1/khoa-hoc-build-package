<template>
  <header class="header">
    <div class="header-content">
      <button class="menu-toggle" @click="toggleSidebar" v-if="isMobile">☰</button>
      <h1 class="header-title">
        <router-link to="/">📦 Khóa học Build Package</router-link>
      </h1>
      <nav class="header-nav" v-if="!isMobile">
        <router-link to="/" class="nav-link">Trang chủ</router-link>
        <router-link to="/setup" class="nav-link">Cài đặt</router-link>
        <router-link to="/resources" class="nav-link">Tài liệu</router-link>
        <router-link to="/examples" class="nav-link">Ví dụ</router-link>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue';

  const isMobile = ref(false);
  const emit = defineEmits<{
    toggleSidebar: [];
  }>();

  const toggleSidebar = () => {
    emit('toggleSidebar');
  };

  const checkMobile = () => {
    isMobile.value = window.innerWidth < 768;
  };

  onMounted(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', checkMobile);
  });
</script>

<style scoped>
  .header {
    position: sticky;
    top: 0;
    background: white;
    border-bottom: 1px solid var(--border-color);
    z-index: 50;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .header-content {
    /* max-width: 1200px; */
    margin: 0 auto;
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .menu-toggle {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
    color: var(--text-color);
  }

  .header-title {
    margin: 0;
    font-size: 1.5rem;
    border: none;
    padding: 0;
    flex: 1;
  }

  .header-title a {
    color: var(--text-color);
    text-decoration: none;
  }

  .header-nav {
    display: flex;
    gap: 1.5rem;
  }

  .nav-link {
    color: var(--text-color);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
  }

  .nav-link:hover,
  .nav-link.router-link-active {
    color: var(--primary-color);
  }

  @media (max-width: 768px) {
    .header-content {
      padding: 1rem;
    }

    .header-title {
      font-size: 1.25rem;
    }
  }
</style>
