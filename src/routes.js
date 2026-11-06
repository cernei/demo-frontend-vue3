import {createRouter, createWebHashHistory} from "vue-router";

import Login from "./components/Login/Login.vue";
import AdminPanel from "./AdminPanel.vue";


import Users from './components/Users/Users.vue';
import Categories from './components/Categories/Categories.vue';
import Products from './components/Products/Products.vue';
import Roles from './components/Roles/Roles.vue';

import Create from "./components/core/Create.vue";
import Edit from "./components/core/Edit.vue";
import {getUser, trackView, user} from "./components/core/user.js";
import Forbidden from "./components/Forbidden.vue";
import Dashboard from "./components/Dashboard.vue";
import AccessLog from "./components/AccessLog/AccessLog.vue";
import Attributes from "./components/Attributes/Attributes.vue";
import Admins from "./components/Admins/Admins.vue";
import Orders from "./components/Orders/Orders.vue";
import StockLocations from "./components/StockLocations/StockLocations.vue";
import StockItems from "./components/StockItems/StockItems.vue";

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
    { path: '/login', name: 'login', component: Login },
    {
        path: '/',
        redirect: { name: "dashboard" }, // redirect property
        component: AdminPanel,
        children: [
        //    { path: '/map', component: CityMap, meta: { permission: 'authorized'} },
        //    { path: '/form-editor', component: FormEditor, meta: { permission: 'authorized'} },
        //    { path: '/book', component: Huge, meta: { permission: 'authorized'} },
            { path: '/access_log', name: 'access_log', component: AccessLog, meta: { permission: 'authorized'} },

            { path: '/forbidden', name: 'forbidden', component: Forbidden, meta: { permission: 'authorized'} },
            { path: '/dashboard', name: 'dashboard', component: Dashboard, meta: { permission: 'authorized'} },

            { path: '/admins', name: 'admins', component: Admins, meta: { permission: 'admins.view'} },
            { path: '/admins/create', name: 'admins.create', component: Create, meta: { permission: 'admins.create'} },
            { path: '/admins/:id/edit', name: 'admins.edit', component: Edit, meta: { permission: 'admins.edit'} },

            { path: '/products', name: 'products', component: Products, meta: { permission: 'products.view'} },
            { path: '/products/create', name: 'products.create', component: Create, meta: { permission: 'products.create'} },
            { path: '/products/:id/edit', name: 'products.edit', component: Edit, meta: { permission: 'products.edit'} },

            { path: '/orders', name: 'orders', component: Orders, meta: { permission: 'orders.view'} },
            { path: '/orders/create', name: 'orders.create', component: Create, meta: { permission: 'orders.create'} },
            { path: '/orders/:id/edit', name: 'orders.edit', component: Edit, meta: { permission: 'orders.edit'} },

            { path: '/stock-locations', name: 'stock-locations', component: StockLocations, meta: { permission: 'stock_locations.view'} },
            { path: '/stock-locations/create', name: 'stock-locations.create', component: Create, meta: { permission: 'stock_locations.create'} },
            { path: '/stock-locations/:id/edit', name: 'stock-locations.edit', component: Edit, meta: { permission: 'stock_locations.edit'} },

            { path: '/stock-items', name: 'stock-items', component: StockItems, meta: { permission: 'stock_items.view'} },
            { path: '/stock-items/create', name: 'stock-items.create', component: Create, meta: { permission: 'stock_items.create'} },
            { path: '/stock-items/:id/edit', name: 'stock-items.edit', component: Edit, meta: { permission: 'stock_items.edit'} },

            { path: '/categories', name: 'categories', component: Categories, meta: { permission: 'categories.view'} },
            { path: '/categories/create', name: 'categories.create', component: Create, meta: { permission: 'categories.create'} },
            { path: '/categories/:id/edit', name: 'categories.edit', component: Edit, meta: { permission: 'categories.edit'} },

            { path: '/roles', name: 'roles', component: Roles, meta: { permission: 'roles.view'} },
            { path: '/roles/create', name: 'roles.create', component: Create, meta: { permission: 'roles.create'} },
            { path: '/roles/:id/edit', name: 'roles.edit', component: Edit, meta: { permission: 'roles.edit'} },

            { path: '/attributes', name: 'attributes', component: Attributes, meta: { permission: 'attributes.view'} },
            { path: '/attributes/create', name: 'attributes.create', component: Create, meta: { permission: 'attributes.create'} },
            { path: '/attributes/:id/edit', name: 'attributes.edit', component: Edit, meta: { permission: 'attributes.edit'} },
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
        // make tracking to run after, since it has low priority
        setTimeout(() => {
            trackView(to.fullPath);
        }, 100);
        next();
    } else {
        next({ name: "forbidden" });
    }
};
router.beforeEach(async (to, from, next) => {
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