<script setup>

const columns = {
  id: { label: 'ID'},
  url: { label: 'Url' },
  ip: { label: 'Ip' },
  referer: { label: 'Referer' },
  user_agent: { label: 'User agent' },
  created_at: { label: 'Created at' },
}
const config = {
  entity: 'access_log',
  columns,
};

</script>

<template>
  <div class="flex justify-content-between mb-3">
    <div class="text-5xl">Access Log</div>
  </div>
  <CrudTable :config="config" />
</template>

<style scoped>
</style>
