import { createRouter, createWebHistory } from "vue-router"
import VPostsList from "../components/VPostsList.vue"
import VUsersList from "../components/VUsersList.vue"
import VAboutPage from "@/components/VAboutPage.vue"
import VSandboxPage from "@/components/VSandboxPage.vue"


const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../components/VHomePage.vue') 
    },
    {
        path: '/posts',
        name: 'posts',
        component: VPostsList
    },
    {
        path:'/users',
        name:'users',
        component: VUsersList
    },
    {
        path: '/about',
        name: 'about',
        component: VAboutPage
    },
    {
        path:'/sandbox',
        name:'sandbox',
        component: VSandboxPage
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router