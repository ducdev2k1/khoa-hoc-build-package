import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/lessons/:id",
    name: "Lesson",
    component: () => import("@/views/Lesson.vue"),
    props: true,
  },
  {
    path: "/setup",
    name: "Setup",
    component: () => import("@/views/Setup.vue"),
  },
  {
    path: "/resources",
    name: "Resources",
    component: () => import("@/views/Resources.vue"),
  },
  {
    path: "/examples",
    name: "Examples",
    component: () => import("@/views/Examples.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

