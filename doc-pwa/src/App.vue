<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
    <!-- Header Mobile -->
    <header class="md:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <span class="font-bold text-indigo-600 dark:text-indigo-400">PWA Course</span>
      <button @click="showMobileMenu = !showMobileMenu" class="text-gray-600 dark:text-gray-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </header>

    <div class="flex flex-1 md:flex-row flex-col relative">
      <!-- Left Sidebar (Navigation) -->
      <aside 
        class="w-full md:w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex-shrink-0 transition-transform duration-300 md:translate-x-0 fixed md:sticky top-0 h-screen overflow-y-auto z-20"
        :class="showMobileMenu ? 'translate-x-0' : '-translate-x-full'"
      >
        <div class="p-6">
          <h1 class="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Khóa học PWA</h1>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">Vue 3 + Vite + PWA</p>
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
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                ]"
                @click="showMobileMenu = false"
              >
                {{ route.meta.title }}
              </router-link>
            </li>
          </ul>

          <div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <label class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
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
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
                ]"
              >
                {{ mode === 'auto' ? 'Auto' : mode === 'light' ? 'Sáng' : 'Tối' }}
              </button>
            </div>
          </div>
        </nav>
      </aside>

      <!-- Overlay for mobile menu -->
      <div 
        v-if="showMobileMenu" 
        class="fixed inset-0 bg-black/50 z-10 md:hidden"
        @click="showMobileMenu = false"
      ></div>

      <!-- Main Content -->
      <main class="flex-1 min-w-0 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div class="max-w-[1600px] mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col xl:flex-row gap-8">
          <!-- Article Content -->
          <article class="flex-1 min-w-0">
            <router-view class="markdown-body dark:prose-invert max-w-none" />
          </article>

          <!-- Right Sidebar (TOC) -->
          <aside class="hidden xl:block w-64 flex-shrink-0">
            <TableOfContents />
          </aside>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from '@/composables/useTheme'
import TableOfContents from '@/components/TableOfContents.vue'

const router = useRouter()
const routes = router.getRoutes().filter(r => r.meta.title)
const { theme } = useTheme()
const showMobileMenu = ref(false)
</script>
