import {createRouter, createWebHistory} from 'vue-router'
import HomePage from "@/views/HomePage";
import ReusablePage from "@/views/ReusablePage";

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            alias: '/home',
            component: HomePage
        },
        {
            path: '/reusable',
            component: ReusablePage
        },
    ],
    linkActiveClass: 'active',
    linkExactActiveClass: 'active'
})
