<script setup lang="ts">
  import { getNextLesson, getPrevLesson } from '@/utils/lessons';
  import { renderMarkdown } from '@/utils/markdown';

  const route = useRoute();
  const lessonId = computed(() => route.params.id as string);
  // const lesson = computed(() => getLessonById(lessonId.value));
  const nextLesson = computed(() => getNextLesson(lessonId.value));
  const prevLesson = computed(() => getPrevLesson(lessonId.value));

  const loading = ref(true);
  const error = ref<string | null>(null);
  const htmlContent = ref('');

  const fetchData = async () => {
    try {
      loading.value = true;
      const response = await fetch(`/lessons/${lessonId.value}.md`);
      if (!response.ok) {
        throw new Error('Không tìm thấy bài học');
      }
      const markdown = await response.text();
      htmlContent.value = renderMarkdown(markdown);
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Có lỗi xảy ra';
    } finally {
      loading.value = false;
    }
  };

  watch(
    () => lessonId.value,
    async () => {
      await fetchData();
    },
    {
      immediate: true,
    },
  );
</script>

<template>
  <div class="lesson">
    <div v-if="loading" class="loading">Đang tải...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="lesson-content">
      <div class="lesson-header">
        <router-link to="/" class="back-link">← Về trang chủ</router-link>
        <!-- <h1>{{ lesson?.title }}</h1> -->
      </div>

      <div class="markdown-content" v-html="htmlContent"></div>

      <div class="lesson-navigation">
        <router-link v-if="prevLesson" :to="prevLesson.path" class="nav-btn nav-prev">
          ← {{ prevLesson.title }}
        </router-link>
        <router-link v-if="nextLesson" :to="nextLesson.path" class="nav-btn nav-next">
          {{ nextLesson.title }} →
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .lesson {
    /* max-width: 900px; */
    margin: 0 auto;
    padding: 2rem;
    min-height: calc(100vh - 200px);
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

  .lesson-header {
    margin-bottom: 2rem;
  }

  .back-link {
    display: inline-block;
    margin-bottom: 1rem;
    color: var(--primary-color);
    font-weight: 500;
  }

  .lesson-header h1 {
    margin: 0;
    border: none;
    padding: 0;
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

  .markdown-content :deep(h3) {
    font-size: 1.5rem;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
  }

  .markdown-content :deep(code) {
    background-color: var(--code-bg);
    padding: 2px 6px;
    border-radius: 3px;
    font-size: 0.9em;
    font-family: 'Fira Code', 'Courier New', monospace;
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

  .markdown-content :deep(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
  }

  .markdown-content :deep(th),
  .markdown-content :deep(td) {
    border: 1px solid var(--border-color);
    padding: 0.75rem;
    text-align: left;
  }

  .markdown-content :deep(th) {
    background-color: var(--code-bg);
    font-weight: 600;
  }

  .markdown-content :deep(blockquote) {
    border-left: 4px solid var(--primary-color);
    padding-left: 1rem;
    margin: 1.5rem 0;
    color: #666;
    font-style: italic;
  }

  .markdown-content :deep(ul),
  .markdown-content :deep(ol) {
    margin-left: 2rem;
    margin-bottom: 1.5rem;
  }

  .markdown-content :deep(li) {
    margin-bottom: 0.5rem;
  }

  .lesson-navigation {
    display: flex;
    justify-content: space-between;
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid var(--border-color);
    gap: 1rem;
  }

  .nav-btn {
    padding: 0.75rem 1.5rem;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    text-decoration: none;
    color: var(--text-color);
    transition: all 0.2s;
    max-width: 45%;
  }

  .nav-btn:hover {
    border-color: var(--primary-color);
    color: var(--primary-color);
    background: var(--code-bg);
  }

  .nav-next {
    margin-left: auto;
    text-align: right;
  }

  @media (max-width: 768px) {
    .lesson {
      padding: 1rem;
    }

    .lesson-navigation {
      flex-direction: column;
    }

    .nav-btn {
      max-width: 100%;
    }

    .nav-next {
      text-align: left;
    }
  }
</style>
