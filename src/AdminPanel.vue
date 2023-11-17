<script setup>
import AppTopBar from "./components/AppTopBar.vue";
import Button from "primevue/button";
import {user} from "./components/core/user.js";

const routes = [
  { path: '/posts', permission: 'posts.view', label: 'Posts', icon: 'pi-comments'},
  { path: '/categories', permission: 'categories.view', label: 'Categories', icon: 'pi-tags'},
  { path: '/users', permission: 'users.view', label: 'Users', icon: 'pi-users'},
  { path: '/roles', permission: 'roles.view', label: 'Roles', icon: 'pi-cog'},
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
      <div class="flex-grow-1 p-2">
        <router-view></router-view>
      </div>
    </div>
  </div>

</template>

<style>

</style>
