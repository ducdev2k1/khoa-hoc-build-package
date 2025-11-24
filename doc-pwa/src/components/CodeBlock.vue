<template>
  <div class="relative group my-4 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
    <!-- Header / Actions -->
    <div class="flex justify-between items-center px-4 py-2 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <span class="text-xs font-mono text-gray-500 dark:text-gray-400">Code</span>
      <div class="flex space-x-2">
        <button
          @click="copyCode"
          class="text-xs text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
        >
          {{ copied ? 'Đã copy!' : 'Copy' }}
        </button>
      </div>
    </div>

    <!-- Content -->
    <div
      ref="contentRef"
      class="relative overflow-hidden transition-all duration-300"
      :class="{ 'max-h-[250px]': !expanded && isLong }"
    >
      <div ref="slotRef">
        <slot />
      </div>
      
      <!-- Gradient Overlay when collapsed -->
      <div
        v-if="!expanded && isLong"
        class="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-50 dark:from-gray-800 to-transparent pointer-events-none"
      ></div>
    </div>

    <!-- Expand Button -->
    <button
      v-if="isLong"
      @click="expanded = !expanded"
      class="w-full py-2 text-xs font-medium text-center text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 transition-colors"
    >
      {{ expanded ? 'Thu gọn' : 'Mở rộng' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, useSlots } from 'vue'

const expanded = ref(false)
const copied = ref(false)
const isLong = ref(false)
const contentRef = ref<HTMLElement | null>(null)
const slotRef = ref<HTMLElement | null>(null)

const checkHeight = () => {
  if (slotRef.value) {
    isLong.value = slotRef.value.offsetHeight > 250
  }
}

const copyCode = async () => {
  if (!slotRef.value) return
  
  const code = slotRef.value.innerText
  try {
    await navigator.clipboard.writeText(code)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

onMounted(() => {
  // Check height after render
  setTimeout(checkHeight, 100)
})
</script>
