<template>
  <div class="resources">
    <div v-if="loading" class="loading">Đang tải...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="resources-content">
      <!-- <h1>📚 Tài liệu Tham khảo và Resources</h1> -->
      <div class="markdown-content" v-html="htmlContent"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { renderMarkdown } from '@/utils/markdown';
  import { onMounted, ref } from 'vue';

  const loading = ref(true);
  const error = ref<string | null>(null);
  const htmlContent = ref('');

  onMounted(async () => {
    try {
      loading.value = true;
      const response = await fetch('/RESOURCES.md');
      if (!response.ok) {
        throw new Error('Không tìm thấy file');
      }
      const markdown = await response.text();
      htmlContent.value = renderMarkdown(markdown);
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Có lỗi xảy ra';
    } finally {
      loading.value = false;
    }
  });
</script>

<style scoped>
  .resources {
    /* max-width: 900px; */
    margin: 0 auto;
    padding: 2rem;
  }

  .loading,
  .error {
    text-align: center;
    padding: 3rem;
    font-size: 1.25rem;
  }

  .error {
    color: #e74c3c;
  }

  .resources-content h1 {
    margin-bottom: 2rem;
  }

  .markdown-content {
    line-height: 1.8;
  }

  .markdown-content :deep(h1) {
    font-size: 2rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
    border-bottom: 2px solid var(--border-color);
    padding-bottom: 0.5rem;
  }

  .markdown-content :deep(h2) {
    font-size: 1.75rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: var(--primary-color);
  }

  .markdown-content :deep(code) {
    background-color: var(--code-bg);
    padding: 2px 6px;
    border-radius: 3px;
    font-size: 0.9em;
  }

  .markdown-content :deep(pre) {
    background-color: #1e1e1e;
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
    margin: 1.5rem 0;
  }

  .markdown-content :deep(pre code) {
    background: none;
    padding: 0;
    color: #d4d4d4;
  }
</style>
