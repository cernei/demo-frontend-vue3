<script setup>
import AppTopBar from "./components/AppTopBar.vue";
import Button from "primevue/button";
import {user} from "./components/core/user.js";

const routes = [
  { path: '/dashboard', permission: 'authorized', label: 'Dashboard', icon: 'pi-chart-line'},
  { path: '/orders', permission: 'orders.view', label: 'Products', icon: 'pi-shopping-cart'},
  { path: '/stock-locations', permission: 'stock_locations.view', label: 'Stock locations', icon: 'pi-objects-column'},

  { path: '/stock-items', permission: 'stock_items.view', label: 'Stock items', icon: 'pi-warehouse'},
  { path: '/products', permission: 'products.view', label: 'Products', icon: 'pi-box'},

  { path: '/categories', permission: 'categories.view', label: 'Categories', icon: 'pi-tag'},
  { path: '/attributes', permission: 'roles.view', label: 'Roles', icon: 'pi-tags'},
  { path: '/admins', permission: 'admins.view', label: 'Admins', icon: 'pi-users'},
  { path: '/roles', permission: 'roles.view', label: 'Roles', icon: 'pi-shield'},
];
</script>

<template>
  <div class="layout-wrapper">
    <AppTopBar  />
    <div class="flex">
      <div class="p-2 flex gap-2 flex-column">
        <template v-for="value in routes">
          <router-link :to="value.path" v-if="user.permissions.includes(value.permission)" >
            <Button plain text rounded class="block p-2" :title="value.label">
              <i :class="`pi ${value.icon} text-xl`" />
            </Button>
          </router-link>
        </template>
      </div>
      <div class="flex-grow-1 min-w-0 p-2">
        <router-view></router-view>
      </div>
    </div>
  </div>

</template>

<style>

</style>
