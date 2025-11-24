<script setup lang="ts">
import { useRegisterSW } from "virtual:pwa-register/vue";

const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW();

const close = async () => {
  offlineReady.value = false;
  needRefresh.value = false;
};
</script>

<template>
  <div
    v-if="offlineReady || needRefresh"
    class="fixed bottom-4 right-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 max-w-md animate-slide-up"
    role="alert"
  >
    <div class="flex items-start gap-4">
      <div class="flex-shrink-0">
        <span class="text-2xl">✨</span>
      </div>
      <div class="flex-1">
        <h3 class="font-semibold text-gray-900 dark:text-white mb-1">
          <span v-if="offlineReady">Sẵn sàng hoạt động offline</span>
          <span v-else>Có bản cập nhật mới</span>
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
          <span v-if="offlineReady">
            Ứng dụng đã được cache và sẵn sàng sử dụng khi không có mạng.
          </span>
          <span v-else>
            Nội dung mới đã sẵn sàng, vui lòng tải lại để cập nhật.
          </span>
        </p>
        <div class="flex gap-3">
          <button
            v-if="needRefresh"
            @click="updateServiceWorker()"
            class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md transition-colors"
          >
            Tải lại ngay
          </button>
          <button
            @click="close"
            class="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 text-sm font-medium rounded-md transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-slide-up {
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
