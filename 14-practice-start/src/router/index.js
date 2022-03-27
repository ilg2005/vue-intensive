import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import store from "@/store";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      layout: "main",
      auth: true,
    }
  },
  {
    path: '/help',
    name: 'Help',
    component: () => import('../views/HelpView.vue'),
    meta: {
      layout: "main",
      auth: true,
    }

  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/AuthView'),
    meta: {
      layout: "auth",
      auth: false,
    }

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const requireAuth = to.meta.auth;
  if (requireAuth && store.getters['auth/isAuthenticated']) {
      next();
  } else if (requireAuth && !store.getters['auth/isAuthenticated']) {
    next('/auth?message=auth')
  } else {
    next();
  }
})

export default router
