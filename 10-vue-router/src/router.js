import {createRouter, createWebHistory} from 'vue-router'
import LoginView from "@/views/LoginView";
import ForgetView from "@/views/ForgetView";
import DashboardView from "@/views/DashboardView";
import MailView from "@/views/MailView";


export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            alias: '/',
            component: LoginView,
        },
        {
            path: '/forget',
            component: ForgetView
        },
        {
            path: '/dashboard',
            component: DashboardView
        },
        {
            path: '/mail',
            component: MailView
        },
    ]
})
