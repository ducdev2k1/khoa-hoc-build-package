<template>
  <aside
    class="w-full md:w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex-shrink-0 transition-transform duration-300 ease-in-out md:translate-x-0 fixed md:relative h-[100dvh] md:h-full overflow-y-auto z-40 top-0 left-0"
    :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="p-6">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-3">
          <img src="/logo.svg" alt="Logo" class="w-12 h-12 rounded-lg" />
          <div>
            <h1 class="text-xl font-bold text-indigo-600 dark:text-indigo-400">
              Khóa học PWA
            </h1>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              Vue 3 + Vite + PWA
            </p>
          </div>
        </div>
        <!-- Close Button -->
        <button
          @click="$emit('close')"
          class="md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Close menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>

    <nav class="px-4 pb-6">
      <ul class="space-y-1">
        <li v-for="route in routes" :key="route.path">
          <router-link
            :to="route.path"
            class="block px-4 py-2 rounded-md text-sm font-medium transition-colors"
            :class="[
              $route.path === route.path
                ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white',
            ]"
            @click="$emit('close')"
          >
            {{ route.meta.title }}
          </router-link>
        </li>
      </ul>

      <div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <label
          class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
        >
          Giao diện
        </label>
        <div class="mt-2 flex space-x-2">
          <button
            v-for="mode in ['light', 'dark', 'auto']"
            :key="mode"
            @click="$emit('update:theme', mode)"
            class="px-3 py-1 text-xs rounded-md border transition-colors"
            :class="[
              theme === mode
                ? 'bg-indigo-100 border-indigo-200 text-indigo-700 dark:bg-indigo-900 dark:border-indigo-700 dark:text-indigo-300'
                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700',
            ]"
          >
            {{ mode === "auto" ? "Auto" : mode === "light" ? "Sáng" : "Tối" }}
          </button>
        </div>
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import type { RouteRecordNormalized } from "vue-router";

defineProps<{
  isOpen: boolean;
  routes: RouteRecordNormalized[];
  theme: string;
}>();

defineEmits<{
  (e: "close"): void;
  (e: "update:theme", value: string): void;
}>();
</script>
