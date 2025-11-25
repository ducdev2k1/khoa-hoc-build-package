<template>
  <div
    class="h-[100dvh] flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300 overflow-hidden"
  >
    <!-- Header Mobile -->
    <MobileHeader :is-menu-open="showMobileMenu" @toggle-menu="toggleMenu" />

    <div class="flex flex-1 md:flex-row flex-col relative overflow-hidden">
      <!-- Left Sidebar (Navigation) -->
      <Sidebar
        :is-open="showMobileMenu"
        :routes="routes"
        :theme="theme"
        @close="showMobileMenu = false"
        @update:theme="(value: any) => theme = value"
      />

      <!-- Overlay for mobile menu -->
      <div
        v-if="showMobileMenu"
        class="fixed inset-0 bg-black/50 z-10 md:hidden mobile-overlay transition-opacity duration-300"
        :class="showMobileMenu ? 'opacity-100' : 'opacity-0'"
        @click="showMobileMenu = false"
      ></div>

      <!-- Main Content -->
      <MainContent />
    </div>

    <!-- PWA Components -->
    <ReloadPrompt />
    <InstallPrompt />
  </div>
</template>

<script setup lang="ts">
import InstallPrompt from "@/components/InstallPrompt.vue";
import ReloadPrompt from "@/components/ReloadPrompt.vue";
import { useTheme } from "@/composables/useTheme";
import MainContent from "@/layouts/MainContent.vue";
import MobileHeader from "@/layouts/MobileHeader.vue";
import Sidebar from "@/layouts/Sidebar.vue";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const routes = router.getRoutes().filter((r) => r.meta.title);
const { theme } = useTheme();
const showMobileMenu = ref(false);

const toggleMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
};

watch(showMobileMenu, (val) => {
  if (val) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});
</script>
