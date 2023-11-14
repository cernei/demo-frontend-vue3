import {createRouter, createWebHashHistory} from "vue-router";

import Login from "./components/Login/Login.vue";
import AdminPanel from "./AdminPanel.vue";
import ProgressSpinner from "primevue/progressspinner";
import {defineAsyncComponent} from "vue";

import Users from './components/Users/Users.vue';
import Categories from './components/Categories/Categories.vue';
import Posts from './components/Posts/Posts.vue';
import Roles from './components/Roles/Roles.vue';

import Create from "./components/core/Create.vue";
import Edit from "./components/core/Edit.vue";
import {getUser, user} from "./components/core/user.js";
import Forbidden from "./components/Forbidden.vue";
import Dashboard from "./components/Dashboard.vue";

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
    { name: 'login', path: '/login', component: Login },
    {
        path: '',
        component: AdminPanel,
        children: [
        //    { path: '/map', component: CityMap, meta: { permission: 'authorized'} },
        //    { path: '/form-editor', component: FormEditor, meta: { permission: 'authorized'} },
        //    { path: '/book', component: Huge, meta: { permission: 'authorized'} },
            { path: '/forbidden', name: 'forbidden', component: Forbidden, meta: { permission: 'authorized'} },
            { path: '/dashboard', name: 'dashboard', component: Dashboard, meta: { permission: 'authorized'} },
            { path: '/users', name: 'users', component: Users, meta: { permission: 'users.view'} },
            { path: '/users/create', name: 'users.create', component: Create, meta: { permission: 'users.create'} },
            { path: '/users/:id/edit', name: 'users.edit', component: Edit, meta: { permission: 'users.edit'} },

            { path: '/posts', name: 'posts', component: Posts, meta: { permission: 'posts.view'} },
            { path: '/posts/create', name: 'posts.create', component: Create, meta: { permission: 'posts.create'} },
            { path: '/posts/:id/edit', name: 'posts.edit', component: Edit, meta: { permission: 'posts.edit'} },

            { path: '/categories', name: 'categories', component: Categories, meta: { permission: 'categories.view'} },
            { path: '/categories/create', name: 'categories.create', component: Create, meta: { permission: 'categories.create'} },
            { path: '/categories/:id/edit', name: 'categories.edit', component: Edit, meta: { permission: 'categories.edit'} },

            { path: '/roles', name: 'roles', component: Roles, meta: { permission: 'roles.view'} },
            { path: '/roles/create', name: 'roles.create', component: Create, meta: { permission: 'roles.create'} },
            { path: '/roles/:id/edit', name: 'roles.edit', component: Edit, meta: { permission: 'roles.edit'} },

        ]
    },
];
const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
});
const guard = function (to, from, next) {
    if (user.value.permissions.includes(to.meta.permission)) {
        next();
    } else {
        next({ name: "forbidden" });
    }
};
router.beforeEach(async (to, from, next) => {
    // maybe also close modals
    console.log(to);
    if (to.meta.permission) {
        if (!user.value.permissions.length) {
            return getUser().then(() => {
                guard(to, from, next);
            })
            .catch(() => {
                next({ name: "login" });
            });
        } else {
            guard(to, from, next);
        }
    } else {
        next();
    }
});
export default router;