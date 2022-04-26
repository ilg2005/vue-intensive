import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import {firebaseConfig} from "../../firebase.config.js";
import {getAuth} from "firebase/auth";
import {initializeApp} from "firebase/app";

import {toast} from "@/utils/toast";
import messages from "@/utils/messages";



const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {layout: 'main', auth: true}
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue'),
    meta: {layout: 'empty', auth: false}
  },
  {
    path: '/register',
    name: 'register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "register" */ '../views/RegisterView.vue'),
    meta: {layout: 'empty', auth: false}
  },
  {
    path: '/categories',
    name: 'categories',
    component: () => import(/* webpackChunkName: "categories" */ '../views/CategoriesView.vue'),
    meta: {layout: 'main', auth: true}
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import(/* webpackChunkName: "detail" */ '../views/DetailRecordView.vue'),
    meta: {layout: 'main', auth: true}
  },
  {
    path: '/history',
    name: 'history',
    component: () => import(/* webpackChunkName: "history" */ '../views/HistoryView.vue'),
    meta: {layout: 'main', auth: true}
  },
  {
    path: '/planning',
    name: 'planning',
    component: () => import(/* webpackChunkName: "planning" */ '../views/PlanningView.vue'),
    meta: {layout: 'main', auth: true}
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "profile" */ '../views/ProfileView.vue'),
    meta: {layout: 'main', auth: true}
  },
  {
    path: '/record',
    name: 'record',
    component: () => import(/* webpackChunkName: "record" */ '../views/RecordView.vue'),
    meta: {layout: 'main', auth: true}
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _, next) => {
  const currentUser = auth.currentUser;
  const requiresAuth = to.meta.auth;
  if (requiresAuth && currentUser === null) {
    next('/login?message=login');
    toast(messages['login']);
  } else {
    next();
  }
});


export default router
