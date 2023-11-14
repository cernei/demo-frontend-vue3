<script setup>
import { user} from "../core/user.js";

const columns = {
  id: { label: 'ID'},
  name: { label: 'Name'},
  user: { label: 'Created by' },
}
const config = {
  entity: 'roles',
  columns,
};

</script>

<template>
  <div class="flex justify-content-between mb-3">
    <div class="text-5xl">Roles</div>
    <template v-if="user.permissions.includes('roles.create')">
      <router-link :to="{ name: 'roles.create' }">
        <Button label="Create" severity="success" class="mr-5" />
      </router-link>
    </template>
  </div>
  <CrudTable :config="config" />
</template>

<style scoped>
</style>
