export default {
    name: 'auth',
    component: () => import(/* webpackChunkName: "AuthLayout" */ '@/modules/auth/layouts/AuthLayout.vue'),
    children: [
        {
            path: '',
            name: 'login',
            component: () => import(/* webpackChunkName: "LoginView" */ '@/modules/auth/views/LoginView.vue'),
        },
        {
            path: 'register',
            name: 'register',
            component: () => import(/* webpackChunkName: "RegisterView" */ '@/modules/auth/views/RegisterView.vue'),
        },
    ]
}