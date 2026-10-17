<script setup>
import {user} from "../core/user.js";

const columns = {
  id: { label: 'ID'},
  title: { label: 'Title' },
  description: { label: 'Content', search: true },
  category: { label: 'Category' },
  user: { label: 'Created by' },
  created_at: { label: 'Created at'},
}
const config = {
  entity: 'products',
  columns,
};
</script>

<template>
  <div class="flex justify-content-between mb-3">
    <div class="text-5xl">Products</div>
    <template v-if="user.permissions.includes('products.create')">
      <router-link :to="{ name: 'products.create' }">
        <Button label="Create" severity="secondary" outlined class="mr-5" />
      </router-link>
    </template>
  </div>
  <CrudTable :config="config" />
</template>

<style scoped>
</style>
