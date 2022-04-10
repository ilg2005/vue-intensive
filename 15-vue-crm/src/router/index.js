import {createRouter, createWebHistory} from 'vue-router';

const routes = [
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
})


export default router
