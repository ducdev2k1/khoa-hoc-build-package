<template>
  <aside class="sidebar" :class="{ 'sidebar-open': isOpen }">
    <div class="sidebar-header">
      <h2>📚 Khóa học</h2>
      <button class="sidebar-toggle" @click="toggleSidebar" v-if="isMobile">
        {{ isOpen ? '✕' : '☰' }}
      </button>
    </div>
    <nav class="sidebar-nav">
      <router-link to="/" class="nav-item" @click="closeSidebar">🏠 Trang chủ</router-link>
      <router-link to="/setup" class="nav-item" @click="closeSidebar">⚙️ Cài đặt</router-link>
      <div class="nav-section">
        <h3>📖 Bài học</h3>
        <router-link
          v-for="lesson in lessons"
          :key="lesson.id"
          :to="lesson.path"
          class="nav-item"
          @click="closeSidebar">
          {{ lesson.title }}
        </router-link>
      </div>
      <router-link to="/resources" class="nav-item" @click="closeSidebar">
        📚 Tài liệu tham khảo
      </router-link>
      <router-link to="/examples" class="nav-item" @click="closeSidebar">💡 Ví dụ Code</router-link>
    </nav>
  </aside>
  <div v-if="isOpen && isMobile" class="sidebar-overlay" @click="closeSidebar"></div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted, defineExpose } from 'vue';
  import { lessons } from '@/utils/lessons';

  const isOpen = ref(false);
  const isMobile = ref(false);

  const toggleSidebar = () => {
    isOpen.value = !isOpen.value;
  };

  const closeSidebar = () => {
    isOpen.value = false;
  };

  const checkMobile = () => {
    isMobile.value = window.innerWidth < 768;
    if (!isMobile.value) {
      isOpen.value = false;
    }
  };

  onMounted(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', checkMobile);
  });

  defineExpose({
    toggleSidebar,
  });
</script>

<style scoped>
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    width: var(--sidebar-width);
    height: 100vh;
    background: var(--bg-color);
    border-right: 1px solid var(--border-color);
    overflow-y: auto;
    z-index: 100;
    transition: transform 0.3s ease;
  }

  .sidebar-header {
    padding: 1.5rem;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--primary-color);
    color: white;
  }

  .sidebar-header h2 {
    margin: 0;
    font-size: 1.25rem;
    border: none;
    padding: 0;
  }

  .sidebar-toggle {
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
  }

  .sidebar-nav {
    padding: 1rem 0;
  }

  .nav-section {
    margin: 1rem 0;
  }

  .nav-section h3 {
    padding: 0.5rem 1.5rem;
    font-size: 0.875rem;
    text-transform: uppercase;
    color: #666;
    margin: 0;
    font-weight: 600;
  }

  .nav-item {
    display: block;
    padding: 0.75rem 1.5rem;
    color: var(--text-color);
    text-decoration: none;
    transition: background-color 0.2s;
    border-left: 3px solid transparent;
  }

  .nav-item:hover {
    background-color: var(--code-bg);
    border-left-color: var(--primary-color);
  }

  .nav-item.router-link-active {
    background-color: var(--code-bg);
    border-left-color: var(--primary-color);
    color: var(--primary-color);
    font-weight: 600;
  }

  .sidebar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99;
  }

  @media (max-width: 768px) {
    .sidebar {
      transform: translateX(-100%);
    }

    .sidebar.sidebar-open {
      transform: translateX(0);
    }
  }
</style>
