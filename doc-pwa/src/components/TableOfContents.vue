<template>
  <nav class="sticky top-6 max-h-[calc(100vh-3rem)] overflow-auto">
    <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-4 uppercase text-xs tracking-wider">
      Mục lục
    </h3>
    <ul class="space-y-2 text-sm">
      <li v-for="header in headers" :key="header.id">
        <a
          :href="`#${header.id}`"
          class="block text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          :class="{ 'pl-4': header.level === 3 }"
          @click.prevent="scrollTo(header.id)"
        >
          {{ header.text }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUpdated, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const headers = ref<{ id: string; text: string; level: number }[]>([])

const extractHeaders = () => {
  // Wait for DOM update
  setTimeout(() => {
    const elements = document.querySelectorAll('.markdown-body h2, .markdown-body h3')
    headers.value = Array.from(elements).map((el) => ({
      id: el.id,
      text: el.textContent || '',
      level: parseInt(el.tagName.substring(1)),
    }))
  }, 100)
}

const scrollTo = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
    history.pushState(null, '', `#${id}`)
  }
}

onMounted(extractHeaders)

watch(
  () => route.path,
  () => {
    extractHeaders()
  }
)
</script>
