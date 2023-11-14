<script setup>
import {user} from "../core/user.js";

const columns = {
  id: { label: 'ID'},
  content: { label: 'Content', search: true },
  category: { label: 'Category' },
  user: { label: 'User' },
  created_at: { label: 'Created at'},
}
const config = {
  entity: 'posts',
  columns,
};
</script>

<template>
  <div class="flex justify-content-between mb-3">
    <div class="text-5xl">Posts</div>
    <template v-if="user.permissions.includes('posts.create')">
      <router-link :to="{ name: 'posts.create' }">
        <Button label="Create" severity="success" class="mr-5" />
      </router-link>
    </template>
  </div>
  <CrudTable :config="config" />
</template>

<style scoped>
</style>
