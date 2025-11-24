<template>
  <nav class="sticky top-6 max-h-[calc(100vh-3rem)] overflow-auto pr-6">
    <h3
      class="font-semibold text-gray-900 dark:text-gray-100 mb-4 uppercase text-xs tracking-wider"
    >
      Mục lục
    </h3>
    <ul class="space-y-2 text-sm pl-4">
      <li v-for="header in headers" :key="header.id">
        <a
          :href="`#${header.id}`"
          class="block py-1 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 relative"
          :class="{
            'pl-4': header.level === 3,
            'toc-active': activeId === header.id,
          }"
          @click.prevent="scrollTo(header.id)"
        >
          {{ header.text }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const headers = ref<{ id: string; text: string; level: number }[]>([]);
const activeId = ref<string>("");
let observer: IntersectionObserver | null = null;

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
};

const extractHeaders = () => {
  setTimeout(() => {
    const elements = document.querySelectorAll(
      ".markdown-body h2, .markdown-body h3"
    );

    headers.value = Array.from(elements).map((el) => {
      // Generate ID if missing
      if (!el.id) {
        el.id = slugify(el.textContent || "");
      }

      return {
        id: el.id,
        text: el.textContent || "",
        level: parseInt(el.tagName.substring(1)),
      };
    });

    setupObserver();
  }, 100);
};

const setupObserver = () => {
  if (observer) {
    observer.disconnect();
  }

  const mainContent = document.getElementById("article-content");

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id;
        }
      });
    },
    {
      root: mainContent, // Use article content as root
      rootMargin: "-80px 0px -80% 0px",
      threshold: 0,
    }
  );

  headers.value.forEach((header) => {
    const el = document.getElementById(header.id);
    if (el) {
      observer?.observe(el);
    }
  });
};

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  const mainContent = document.getElementById("article-content");

  if (el && mainContent) {
    // Calculate position relative to the main content container
    // We need to account for the container's current scroll position
    const elementTop = el.getBoundingClientRect().top;
    const containerTop = mainContent.getBoundingClientRect().top;
    const scrollTop = mainContent.scrollTop;

    // Position inside the container = current scroll + (element top - container top)
    const offsetPosition = scrollTop + (elementTop - containerTop) - 80; // 80px offset

    mainContent.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    // Update URL hash and active state after scroll starts
    setTimeout(() => {
      history.pushState(null, "", `#${id}`);
      activeId.value = id;
    }, 100);
  }
};

onMounted(() => {
  extractHeaders();

  if (window.location.hash) {
    const id = window.location.hash.substring(1);
    setTimeout(() => scrollTo(id), 500);
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});

watch(
  () => route.path,
  () => {
    activeId.value = "";
    extractHeaders();
  }
);
</script>
