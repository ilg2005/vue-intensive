import { createRouter, createWebHistory } from 'vue-router'
import Tasks from '../views/TasksView.vue'

const routes = [
  {
    path: '/',
    name: 'Tasks',
    component: Tasks
  },
  {
    path: '/new',
    name: 'New',
    component: () => import('../views/NewView.vue')
  },
  {
    path: '/task/:id',
    name: 'Task',
    props: true,
    component: () => import('../views/TaskView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

export default router
