<template>
  <header
    class="md:hidden flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 z-30"
  >
    <div class="flex items-center gap-2">
      <img src="/logo.svg" alt="Logo" class="w-8 h-8 rounded-lg" />
      <div>
        <h1 class="font-bold text-indigo-600 dark:text-indigo-400 text-sm">
          Khóa học PWA
        </h1>
        <p class="text-[10px] text-gray-500 dark:text-gray-400">
          Vue3 + Vite + PWA
        </p>
      </div>
    </div>
    <button
      @click="$emit('toggle-menu')"
      class="text-gray-600 dark:text-gray-300 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors z-50 relative"
      aria-label="Toggle menu"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 transition-transform duration-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          :d="isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'"
        />
      </svg>
    </button>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  isMenuOpen: boolean;
}>();

defineEmits<{
  (e: "toggle-menu"): void;
}>();
</script>
