<script setup>
import {user} from "../core/user.js";

const columns = {
  id: { label: 'ID'},
  email: { label: 'Email'},
  total_amount: { label: 'Total'},
  status: { label: 'Status'},
}
const config = {
  entity: 'orders',
  columns,
};
</script>

<template>
  <div class="flex justify-content-between mb-3">
    <div class="text-5xl">Orders</div>
<!--    <template v-if="user.permissions.includes('orders.create')">-->
<!--      <router-link :to="{ name: 'orders.create' }">-->
<!--        <Button label="Create" severity="secondary" outlined class="mr-5" />-->
<!--      </router-link>-->
<!--    </template>-->
  </div>
  <CrudTable :config="config" />
</template>

<style scoped>
</style>
