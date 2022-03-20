import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/HomeView.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/users',
    component: () => import('../views/UsersView.vue'),
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
  linkExactActiveClass: 'active',
  linkActiveClass: 'active',
});

export default router;
