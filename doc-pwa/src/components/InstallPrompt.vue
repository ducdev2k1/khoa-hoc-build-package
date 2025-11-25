<script setup lang="ts">
import { onMounted, ref } from "vue";

const showPrompt = ref(false);
const deferredPrompt = ref<any>(null);

onMounted(() => {
  // Kiểm tra xem người dùng đã từ chối cài đặt chưa
  const hasDeclined = localStorage.getItem("pwa-install-declined");

  // Kiểm tra xem đã cài đặt chưa
  const isInstalled = window.matchMedia("(display-mode: standalone)").matches;

  if (!hasDeclined && !isInstalled) {
    // Lắng nghe sự kiện beforeinstallprompt
    window.addEventListener("beforeinstallprompt", (e) => {
      // Ngăn trình duyệt hiển thị prompt mặc định
      e.preventDefault();
      // Lưu event để sử dụng sau
      deferredPrompt.value = e;
      // Hiển thị custom prompt sau 3 giây
      setTimeout(() => {
        showPrompt.value = true;
      }, 3000);
    });
  }
});

const installPWA = async () => {
  if (!deferredPrompt.value) return;

  // Hiển thị prompt cài đặt
  deferredPrompt.value.prompt();

  // Đợi người dùng phản hồi
  const { outcome } = await deferredPrompt.value.userChoice;

  if (outcome === "accepted") {
    console.log("User accepted the install prompt");
  } else {
    console.log("User dismissed the install prompt");
  }

  // Reset
  deferredPrompt.value = null;
  showPrompt.value = false;
};

const closePrompt = () => {
  showPrompt.value = false;
  // Lưu trạng thái đã đóng (7 ngày)
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 7);
  localStorage.setItem("pwa-install-declined", expiryDate.toISOString());
};
</script>

<template>
  <div
    v-if="showPrompt"
    class="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md p-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-2xl z-50 animate-slide-up"
    role="alert"
  >
    <div class="flex items-start gap-4">
      <div class="flex-shrink-0">
        <img src="/logo.svg" alt="PWA Icon" class="w-12 h-12 rounded-lg" />
      </div>
      <div class="flex-1">
        <h3 class="font-bold text-white mb-1 text-lg">Cài đặt ứng dụng PWA</h3>
        <p class="text-sm text-white/90 mb-4 leading-relaxed">
          Thêm ứng dụng vào màn hình chính để truy cập nhanh hơn và sử dụng
          offline! 🚀
        </p>
        <div class="flex gap-3">
          <button
            @click="installPWA"
            class="flex-1 px-4 py-2.5 bg-white hover:bg-gray-100 text-indigo-600 text-sm font-semibold rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg"
          >
            Cài đặt ngay
          </button>
          <button
            @click="closePrompt"
            class="px-4 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-lg transition-colors border border-white/20"
          >
            Để sau
          </button>
        </div>
      </div>
      <button
        @click="closePrompt"
        class="flex-shrink-0 text-white/80 hover:text-white transition-colors"
        aria-label="Close"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.animate-slide-up {
  animation: slideUp 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes slideUp {
  from {
    transform: translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
