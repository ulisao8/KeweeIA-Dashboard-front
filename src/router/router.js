import {createRouter, createWebHistory} from 'vue-router'
import {AuthService} from "@/services/auth_service.js";
import ApiConstants from "@/constants/api_constants.js";
import RoleConstants from "@/constants/role_constants.js";

const routes  = [
    {
        path: '/',
        name: ApiConstants.FILES_GET,
        component: () => import('@/views/files/GetFileView.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: `/${ApiConstants.LOGIN_ROUTE}`,
        name: ApiConstants.LOGIN_ROUTE,
        component: () => import('@/views/auth/LoginView.vue')
    },
    {
        path: `/${ApiConstants.USERS}`,
        name: ApiConstants.USERS,
        children: [
            {
                path: 'create',
                name: ApiConstants.CREATE_USERS,
                component: () => import('@/views/users/CreateUsers.vue'),
                meta: { requiresAuth: true, roles: [RoleConstants.ROLE_ADMIN] }
            }
        ]
    },
    {
        path: `/${ApiConstants.FILES_ROUTE}`,
        name: ApiConstants.FILES_ROUTE,
        children: [
            {
                path: 'upload',
                name: ApiConstants.FILES_UPLOAD,
                component: () => import('@/views/files/UploadFileView.vue'),
                meta: { requiresAuth: true, roles: [RoleConstants.ROLE_ADMIN] }
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    const token = AuthService.getToken();
    const role = AuthService.getRole();

    if (to.meta.requiresAuth) {
        if (!token) {
            return next({ name: ApiConstants.LOGIN_ROUTE });
        }

        if (to.meta.roles && !to.meta.roles.includes(role)) {
            return next({ name: 'NotFound' });
        }
    }

    if (to.path === `/${ApiConstants.LOGIN_ROUTE}` && AuthService.getToken()) {
        if (role === RoleConstants.ROLE_ADMIN) {
            next({name: ApiConstants.FILES_UPLOAD});
        } else if (role === RoleConstants.ROLE_USER) {
            next({name: ApiConstants.FILES_GET});
        } else {
            next({name: ApiConstants.LOGIN_ROUTE});
        }
    }

    next();
})

export default router