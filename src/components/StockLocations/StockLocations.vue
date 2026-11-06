<script setup>
import {user} from "../core/user.js";

const columns = {
  id: { label: 'ID'},
  code: { label: 'Code' },
}
const config = {
  entity: 'stock_locations',
  columns,
};
</script>

<template>
  <div class="flex justify-content-between mb-3">
    <div class="text-5xl">Stock locations</div>
    <template v-if="user.permissions.includes('stock_locations.create')">
      <router-link :to="{ name: 'stock-locations.create' }">
        <Button label="Create" severity="secondary" outlined class="mr-5" />
      </router-link>
    </template>
  </div>
  <CrudTable :config="config" />
</template>

<style scoped>
</style>
