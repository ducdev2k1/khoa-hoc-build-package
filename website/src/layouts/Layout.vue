<script setup lang="ts">
  import Header from '@/components/Header.vue';
  import Sidebar from '@/components/Sidebar.vue';

  const sidebarRef = ref<InstanceType<typeof Sidebar> | null>(null);
  const isMobile = ref(false);

  const toggleSidebar = () => {
    if (sidebarRef.value) {
      sidebarRef.value.toggleSidebar();
    }
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

<template>
  <div class="layout">
    <Sidebar ref="sidebarRef" />
    <div class="content-wrapper" :class="{ 'with-sidebar': !isMobile }">
      <Header @toggle-sidebar="toggleSidebar" />
      <main class="main-content">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
  .layout {
    min-height: 100vh;
    display: flex;
  }

  .content-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 0;
    transition: margin-left 0.3s ease;
    overflow: hidden auto;
  }

  .content-wrapper.with-sidebar {
    margin-left: var(--sidebar-width);
  }

  .main-content {
    flex: 1;
    padding: 2rem;
    /* max-width: 1200px; */
    margin: 0 auto;
    width: 100%;
  }

  @media (max-width: 767px) {
    .content-wrapper.with-sidebar {
      margin-left: 0;
    }

    .main-content {
      padding: 0;
    }

    .layout {
      display: block;
    }
  }
</style>
