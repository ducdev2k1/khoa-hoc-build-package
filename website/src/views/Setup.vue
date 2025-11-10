<script setup lang="ts">
  import MarkdownViewer from '@/components/MarkdownViewer/MarkdownViewer.vue';
  import { renderMarkdown } from '@/utils/markdown';

  const loading = ref(true);
  const error = ref<string | null>(null);
  const htmlContent = ref('');

  onMounted(async () => {
    try {
      loading.value = true;
      const response = await fetch('/SETUP.md');
      if (!response.ok) {
        throw new Error('Không tìm thấy file');
      }
      const markdown = await response.text();
      htmlContent.value = await renderMarkdown(markdown);
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Có lỗi xảy ra';
    } finally {
      loading.value = false;
    }
  });
</script>

<template>
  <div class="p-setup">
    <div v-if="loading" class="loading">Đang tải...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="setup-content">
      <!-- <h1>🚀 Hướng dẫn Cài đặt và Thiết lập</h1> -->
      <MarkdownViewer :html="htmlContent" />
    </div>
  </div>
</template>

<style scoped>
  .p-setup {
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

  .setup-content h1 {
    margin-bottom: 2rem;
  }

  @media (max-width: 767px) {
    .p-setup {
      padding: 1rem;
    }
  }
</style>
