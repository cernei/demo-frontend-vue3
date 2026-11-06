<script setup>
import {user} from "../core/user.js";

const columns = {
  id: { label: 'ID'},
  product: { label: 'Product'},
  location: { label: 'Location'},
  quantity: { label: 'Quantity'},
}
const config = {
  entity: 'stock_items',
  columns,
};
</script>

<template>
  <div class="flex justify-content-between mb-3">
    <div class="text-5xl">Stock items</div>
    <template v-if="user.permissions.includes('stock_items.create')">
      <router-link :to="{ name: 'stock-items.create' }">
        <Button label="Create" severity="secondary" outlined class="mr-5" />
      </router-link>
    </template>
  </div>
  <CrudTable :config="config" />
</template>

<style scoped>
</style>
