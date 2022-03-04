import {createRouter, createWebHistory} from 'vue-router'
import LoginView from "@/views/LoginView";
import ForgetView from "@/views/ForgetView";
import DashboardView from "@/views/DashboardView";
import MailView from "@/views/MailView";
import ErrorView404 from "@/views/ErrorView404";
import AppEmailBody from "@/components/AppEmailBody";


export default createRouter({
    history: createWebHistory(),
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
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
            component: MailView,
            children: [
                {
                    path: ':mailId?',
                    component: AppEmailBody,
                    props: true
                }
            ]
        },
        {
            path: '/:notFound(.*)',
            component: ErrorView404
        }
    ]
})
