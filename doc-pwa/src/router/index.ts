import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/home.md'
import Introduction from '@/pages/01-introduction.md'
import LearningObjectives from '@/pages/02-learning-objectives.md'
import Setup from '@/pages/03-setup.md'
import ViteConfig from '@/pages/04-vite-config-and-manifest.md'
import ServiceWorker from '@/pages/05-service-worker.md'
import OfflineStrategies from '@/pages/06-offline-strategies.md'
import AddToHomeScreen from '@/pages/07-add-to-home-screen.md'
import AutoUpdate from '@/pages/08-auto-update.md'
import PushNotifications from '@/pages/09-push-notifications.md'
import Deployment from '@/pages/10-deployment.md'
import PracticalLabs from '@/pages/11-practical-labs.md'
import Checklist from '@/pages/12-checklist-and-qa.md'
import Resources from '@/pages/13-resources.md'

const routes = [
  { path: '/', component: Home, meta: { title: 'Trang chủ' } },
  { path: '/introduction', component: Introduction, meta: { title: '1. Giới thiệu' } },
  { path: '/learning-objectives', component: LearningObjectives, meta: { title: '2. Mục tiêu khóa học' } },
  { path: '/setup', component: Setup, meta: { title: '3. Cài đặt môi trường' } },
  { path: '/vite-config', component: ViteConfig, meta: { title: '4. Cấu hình Vite & Manifest' } },
  { path: '/service-worker', component: ServiceWorker, meta: { title: '5. Service Worker' } },
  { path: '/offline-strategies', component: OfflineStrategies, meta: { title: '6. Chiến lược Offline' } },
  { path: '/add-to-home-screen', component: AddToHomeScreen, meta: { title: '7. Cài đặt (A2HS)' } },
  { path: '/auto-update', component: AutoUpdate, meta: { title: '8. Tự động cập nhật' } },
  { path: '/push-notifications', component: PushNotifications, meta: { title: '9. Push Notifications' } },
  { path: '/deployment', component: Deployment, meta: { title: '10. Triển khai' } },
  { path: '/practical-labs', component: PracticalLabs, meta: { title: '11. Bài tập thực hành' } },
  { path: '/checklist', component: Checklist, meta: { title: '12. Checklist & QA' } },
  { path: '/resources', component: Resources, meta: { title: '13. Tài nguyên' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

export default router
