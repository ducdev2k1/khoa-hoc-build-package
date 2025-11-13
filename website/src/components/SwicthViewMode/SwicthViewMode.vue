<script setup lang="ts">
  import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
  import DarkIcon from './partial/DarkIcon.vue';
  import LightIcon from './partial/LightIcon.vue';
  import SystemIcon from './partial/SystemIcon.vue';

  type Mode = 'light' | 'dark' | 'auto';
  const STORAGE_KEY = 'view-mode';
  const viewMode = ref<Mode>('auto');

  let mql: MediaQueryList | null = null;

  const themes = [
    { value: 'auto', label: 'System theme', icon: SystemIcon },
    { value: 'light', label: 'Light theme', icon: LightIcon },
    { value: 'dark', label: 'Dark theme', icon: DarkIcon },
  ];

  function applyTheme(mode: Mode) {
    if (typeof document === 'undefined') return; // SSR-safe
    const html = document.documentElement;
    html.classList.remove('light', 'dark');

    if (mode === 'auto') {
      // bảo đảm window.matchMedia tồn tại
      const prefersDark =
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      html.classList.add(prefersDark ? 'dark' : 'light');
    } else {
      html.classList.add(mode);
    }
  }

  function initViewModeFromStorage() {
    if (typeof window === 'undefined') {
      viewMode.value = 'auto';
      applyTheme(viewMode.value);
      return;
    }

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

  // Khi người dùng chọn (hoặc watcher chạy), lưu storage + apply theme
  watch(
    viewMode,
    (next) => {
      try {
        if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* ignore */
      }
      applyTheme(next);
    },
    { immediate: false },
  );

  // Khi preference hệ thống thay đổi
  const onPrefChange = () => {
    if (viewMode.value === 'auto') {
      applyTheme('auto');
    }
  };

  onMounted(() => {
    initViewModeFromStorage();

    if (typeof window !== 'undefined' && window.matchMedia) {
      mql = window.matchMedia('(prefers-color-scheme: dark)');
      if (mql.addEventListener) mql.addEventListener('change', onPrefChange);
      else if ((mql as any).addListener) (mql as any).addListener(onPrefChange);
    }
  });

  onBeforeUnmount(() => {
    if (!mql) return;
    if (mql.removeEventListener) mql.removeEventListener('change', onPrefChange);
    else if ((mql as any).removeListener) (mql as any).removeListener(onPrefChange);
  });
</script>

<template>
  <div class="grid grid-cols-1 max-sm:hidden">
    <div
      class="relative z-0 inline-grid grid-cols-3 gap-0.5 rounded-full bg-gray-950/5 p-1.5 text-gray-950 dark:bg-white/10 dark:text-white"
      role="radiogroup"
      aria-label="Theme selector">
      <div
        v-for="theme in themes"
        :key="theme.value"
        :class="[
          'relative rounded-full p-1.5 *:size-7 sm:p-0 cursor-pointer transition',
          viewMode === theme.value ? 'bg-gray-950 text-white dark:bg-white dark:text-gray-950' : '',
        ]">
        <input
          v-model="viewMode"
          type="radio"
          class="absolute inset-0 appearance-none cursor-pointer"
          name="theme-toggle"
          :aria-label="theme.label"
          :value="theme.value" />

        <!-- render dynamic component -->
        <component :is="theme.icon" />
      </div>

      <!-- <div
        :class="{
          'bg-gray-950 text-white dark:bg-white dark:text-gray-950': viewMode === 'auto',
        }"
        class="relative rounded-full p-1.5 *:size-7 sm:p-0">
        <input
          v-model="viewMode"
          type="radio"
          class="absolute inset-0 appearance-none cursor-pointer"
          name="theme-toggle"
          aria-label="System theme"
          value="auto" />
        <SystemIcon />
      </div>

      <div
        :class="{
          'bg-gray-950 text-white dark:bg-white dark:text-gray-950': viewMode === 'light',
        }"
        class="relative rounded-full p-1.5 *:size-7 sm:p-0">
        <input
          v-model="viewMode"
          type="radio"
          class="absolute inset-0 appearance-none cursor-pointer"
          name="theme-toggle"
          aria-label="Light theme"
          :value="'light'" />
        <LightIcon />
      </div>

      <div
        :class="{
          'bg-gray-950 text-white dark:bg-white dark:text-gray-950': viewMode === 'dark',
        }"
        class="relative rounded-full p-1.5 *:size-7 sm:p-0">
        <input
          v-model="viewMode"
          type="radio"
          class="absolute inset-0 appearance-none cursor-pointer"
          name="theme-toggle"
          aria-label="Dark theme"
          :value="'dark'" />
        <DarkIcon />
      </div> -->
    </div>
  </div>
</template>
