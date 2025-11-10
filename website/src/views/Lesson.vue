<script setup lang="ts">
  import MarkdownViewer from '@/components/MarkdownViewer/MarkdownViewer.vue';
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
      htmlContent.value = await renderMarkdown(markdown);
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
      <MarkdownViewer :html="htmlContent" />
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

<style scoped></style>
