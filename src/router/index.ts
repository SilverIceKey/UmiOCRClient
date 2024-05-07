// router/index.ts
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    // 其他路由...
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
