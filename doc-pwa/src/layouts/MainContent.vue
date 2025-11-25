<template>
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
</template>

<script setup lang="ts">
import TableOfContents from "@/components/TableOfContents.vue";
</script>
