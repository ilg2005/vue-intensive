import {createRouter, createWebHistory} from 'vue-router'
import LoginView from "@/views/LoginView";

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            component: LoginView
        }
    ]
})
