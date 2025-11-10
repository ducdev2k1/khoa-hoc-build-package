<script setup lang="ts">
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

  const themeOptions: { value: Mode; label: string; short: string; icon: string }[] = [
    {
      value: 'light',
      label: 'Light mode',
      short: 'Light',
      icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4V2M12 22v-2M4 12H2M22 12h-2M5 5l-1.5-1.5M20.5 20.5 19 19M19 5l1.5-1.5M4.5 19.5 6 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5" fill="currentColor"/></svg>`,
    },
    {
      value: 'dark',
      label: 'Dark mode',
      short: 'Dark',
      icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="currentColor"/></svg>`,
    },
    {
      value: 'auto',
      label: 'Auto (system)',
      short: 'Auto',
      icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.2" fill="currentColor"/></svg>`,
    },
  ];
  type Mode = 'light' | 'dark' | 'auto';
  const STORAGE_KEY = 'view-mode';
  const viewMode = ref<Mode>('auto');

  let mql: MediaQueryList | null = null;
  const onPrefChange = (e: MediaQueryListEvent) => {
    if (viewMode.value === 'auto') applyTheme('auto');
  };
  function setViewMode(next: Mode) {
    viewMode.value = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore storage errors (private mode, etc.)
    }
    applyTheme(next);
  }
  function applyTheme(mode: Mode) {
    const html = document.documentElement;
    html.classList.remove('light', 'dark');

    if (mode === 'auto') {
      const prefersDark =
        window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      html.classList.add(prefersDark ? 'dark' : 'light');
    } else {
      html.classList.add(mode);
    }
  }

  /** init from storage (or default auto) */
  function initViewModeFromStorage() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Mode | null;
      if (saved === 'light' || saved === 'dark' || saved === 'auto') {
        viewMode.value = saved;
      } else {
        viewMode.value = 'auto';
      }
    } catch {
      viewMode.value = 'auto';
    }
    applyTheme(viewMode.value);
  }

  /** small helper for button classes */
  function btnClasses(selected: boolean) {
    return selected
      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100'
      : 'bg-white dark:bg-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900';
  }
  onMounted(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);

    initViewModeFromStorage();

    if (window.matchMedia) {
      mql = window.matchMedia('(prefers-color-scheme: dark)');
      if (mql.addEventListener) mql.addEventListener('change', onPrefChange);
      else if ((mql as any).addListener) (mql as any).addListener(onPrefChange);
    }
  });

  onUnmounted(() => {
    window.removeEventListener('resize', checkMobile);
  });

  onBeforeUnmount(() => {
    if (!mql) return;
    if (mql.removeEventListener) mql.removeEventListener('change', onPrefChange);
    else if ((mql as any).removeListener) (mql as any).removeListener(onPrefChange);
  });
  const open = ref(false);
</script>

<template>
  <header class="header">
    <div class="header-content">
      <button class="menu-toggle" @click="toggleSidebar" v-if="isMobile">☰</button>
      <h1 class="header-title">
        <router-link to="/">📦 Khóa học Build Package</router-link>
      </h1>
      <!-- <ChangeViewMode /> -->
      <nav class="header-nav" v-if="!isMobile">
        <router-link to="/" class="nav-link">Trang chủ</router-link>
        <router-link to="/setup" class="nav-link">Cài đặt</router-link>
        <router-link to="/resources" class="nav-link">Tài liệu</router-link>
        <router-link to="/examples" class="nav-link">Ví dụ</router-link>
      </nav>

      <!-- Change view mode-->
      <!-- <div class="relative inline-block text-left">
        <button
          type="button"
          class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="view-mode-menu"
          aria-expanded="true"
          aria-haspopup="true"
          @click="open = !open">
          {{ themeOptions.find((opt) => opt.value === viewMode)?.short || 'Select View' }}
          <svg
            class="-mr-1 ml-2 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true">
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd" />
          </svg>
        </button>

        <div
          v-show="open"
          class="absolute z-10 mt-2 w-40 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="view-mode-menu">
          <div class="py-1" role="none">
            <button
              v-for="opt in themeOptions"
              :key="opt.value"
              role="menuitem"
              :aria-checked="viewMode === opt.value"
              @click="
                setViewMode(opt.value);
                open = false;
              "
              @keydown.enter.prevent="
                setViewMode(opt.value);
                open = false;
              "
              @keydown.space.prevent="
                setViewMode(opt.value);
                open = false;
              "
              class="block w-full px-4 py-2 text-sm text-left text-gray-900 hover:bg-gray-100"
              :class="{ 'bg-blue-50 text-blue-600 font-semibold': viewMode === opt.value }">
              {{ opt.short }}
            </button>
          </div>
        </div>
      </div> -->
    </div>
  </header>
</template>

<style scoped>
  .header {
    position: sticky;
    top: 0;
    background: var(--bg-color);
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
