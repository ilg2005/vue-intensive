import {createRouter, createWebHistory} from 'vue-router'
import LoginView from "@/views/LoginView";
import ForgetView from "@/views/ForgetView";
import DashboardView from "@/views/DashboardView";
import MailView from "@/views/MailView";
import ErrorView404 from "@/views/ErrorView404";
import AppEmailBody from "@/components/AppEmailBody";


const router = createRouter({
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
            component: ForgetView,
            meta: {forbidden: true}
        },
        {
            path: '/dashboard',
            name: 'home',
            beforeEnter() {
                console.log('beforeEnter')
            },
            component: DashboardView
        },
        {
            path: '/mail',
            name: 'email',
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

router.beforeEach((to, from, next) => {
    console.log('beforeEach')
    if (to.meta.forbidden) {
        next({
            name: 'home'
        })
    } else {
        next()
    }
})

router.afterEach(() => {
    console.log('afterEach')
})
export default router
