import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {layout: 'main'}
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue'),
    meta: {layout: 'empty'}
  },
  {
    path: '/categories',
    name: 'categories',
    component: () => import(/* webpackChunkName: "categories" */ '../views/CategoriesView.vue'),
    meta: {layout: 'main'}
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import(/* webpackChunkName: "detail" */ '../views/DetailRecordView.vue'),
    meta: {layout: 'main'}
  },
  {
    path: '/history',
    name: 'history',
    component: () => import(/* webpackChunkName: "history" */ '../views/HistoryView.vue'),
    meta: {layout: 'main'}
  },
  {
    path: '/planning',
    name: 'planning',
    component: () => import(/* webpackChunkName: "planning" */ '../views/PlanningView.vue'),
    meta: {layout: 'main'}
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "profile" */ '../views/ProfileView.vue'),
    meta: {layout: 'main'}
  },
  {
    path: '/record',
    name: 'record',
    component: () => import(/* webpackChunkName: "record" */ '../views/RecordView.vue'),
    meta: {layout: 'main'}
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
