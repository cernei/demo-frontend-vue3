<script setup>

import {user} from "../core/user.js";

const columns = {
  id: { label: 'ID'},
  name: { label: 'Name', search: true },
}
const config = {
  entity: 'attributes',
  columns,
};

</script>

<template>
  <div class="flex justify-content-between mb-3">
    <div class="text-5xl">Attributes</div>
    <template v-if="user.permissions.includes('attributes.create')">
      <router-link :to="{ name: 'attributes.create' }">
        <Button label="Create" severity="secondary" outlined class="mr-5" />
      </router-link>
    </template>
  </div>
  <CrudTable :config="config" />
</template>

<style scoped>
</style>
