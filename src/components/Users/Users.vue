<script setup>
import {user} from "../core/user.js";

const columns = {
  id: { label: 'ID'},
  name: { label: 'Name' },
  email: { label: 'Email' },
  created_at: { label: 'Created at' },
}
const config = {
  entity: 'users',
  columns,
};

</script>

<template>
  <div class="flex justify-content-between mb-3">
    <div class="text-5xl">Users</div>
    <template v-if="user.permissions.includes('users.create')">
      <router-link :to="{ name: 'users.create' }">
        <Button label="Create" severity="success" class="mr-5" />
      </router-link>
    </template>

  </div>
  <CrudTable :config="config" />
</template>

<style scoped>
</style>
