<template>
  <div
    class="h-[100dvh] flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300 overflow-hidden"
  >
    <!-- Header Mobile -->
    <header
      class="md:hidden flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 z-30"
    >
      <div class="flex items-center gap-2">
        <img src="/pwa-192x192.png" alt="Logo" class="w-8 h-8 rounded-lg" />
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
        @click="showMobileMenu = !showMobileMenu"
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
            :d="
              showMobileMenu
                ? 'M6 18L18 6M6 6l12 12'
                : 'M4 6h16M4 12h16M4 18h16'
            "
          />
        </svg>
      </button>
    </header>

    <div class="flex flex-1 md:flex-row flex-col relative overflow-hidden">
      <!-- Left Sidebar (Navigation) -->
      <aside
        class="w-full md:w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex-shrink-0 transition-transform duration-300 ease-in-out md:translate-x-0 fixed md:relative h-[100dvh] md:h-full overflow-y-auto z-40 top-0 left-0"
        :class="showMobileMenu ? 'translate-x-0' : '-translate-x-full'"
      >
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-3">
              <img
                src="/pwa-192x192.png"
                alt="Logo"
                class="w-12 h-12 rounded-lg"
              />
              <div>
                <h1
                  class="text-xl font-bold text-indigo-600 dark:text-indigo-400"
                >
                  Khóa học PWA
                </h1>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Vue 3 + Vite + PWA
                </p>
              </div>
            </div>
            <!-- Close Button -->
            <button
              @click="showMobileMenu = false"
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
                @click="showMobileMenu = false"
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
                @click="theme = mode as any"
                class="px-3 py-1 text-xs rounded-md border transition-colors"
                :class="[
                  theme === mode
                    ? 'bg-indigo-100 border-indigo-200 text-indigo-700 dark:bg-indigo-900 dark:border-indigo-700 dark:text-indigo-300'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700',
                ]"
              >
                {{
                  mode === "auto" ? "Auto" : mode === "light" ? "Sáng" : "Tối"
                }}
              </button>
            </div>
          </div>
        </nav>
      </aside>

      <!-- Overlay for mobile menu -->
      <div
        v-if="showMobileMenu"
        class="fixed inset-0 bg-black/50 z-10 md:hidden mobile-overlay transition-opacity duration-300"
        :class="showMobileMenu ? 'opacity-100' : 'opacity-0'"
        @click="showMobileMenu = false"
      ></div>

      <!-- Main Content -->
      <main
        class="flex-1 min-w-0 bg-white dark:bg-gray-900 transition-colors duration-300 overflow-hidden flex flex-col"
      >
        <div
          class="flex-1 max-w-[1600px] mx-auto w-full flex flex-col xl:flex-row overflow-hidden"
        >
          <!-- Article Content -->
          <article
            id="article-content"
            class="flex-1 min-w-0 overflow-y-auto h-full scroll-smooth px-4 py-8 sm:px-6 lg:px-8"
          >
            <router-view class="markdown-body dark:prose-invert max-w-none" />
          </article>

          <!-- Right Sidebar (TOC) -->
          <aside class="hidden xl:block w-64 flex-shrink-0 py-8 pl-6">
            <TableOfContents />
          </aside>
        </div>
      </main>
    </div>
    <ReloadPrompt />
  </div>
</template>

<script setup lang="ts">
import ReloadPrompt from "@/components/ReloadPrompt.vue";
import TableOfContents from "@/components/TableOfContents.vue";
import { useTheme } from "@/composables/useTheme";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const routes = router.getRoutes().filter((r) => r.meta.title);
const { theme } = useTheme();
const showMobileMenu = ref(false);

watch(showMobileMenu, (val) => {
  if (val) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});
</script>
