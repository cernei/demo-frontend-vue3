<script setup>
import http from "@libs/http";
import router from "../routes.js";
import Avatar from 'primevue/avatar';
import {useRoute} from "vue-router";
import {computed} from "vue";
import { user } from './core/user.js';

async function logout() {
  try {
    await http.get('api/logout');
    await router.push({name: 'login'})
  } catch(error) {

  }
}

</script>

<template>
  <div class="flex align-items-center justify-content-between p-2 ">
    <div class="flex">
      <div class="text-xl">
        <Avatar icon="pi pi-user" class="m-1" style="background-color: #dee2e6; color: #ffffff" shape="circle" />
        <span style="color: #555;" class="ml-2">{{ user.name }}</span>
      </div>

    </div>
    <div class="flex align-items-center gap-4">

      <Button rounded text  class="p-2" @click="logout">
        <i class="pi pi-sign-in text-xl" />
      </Button>
    </div>
  </div>
</template>

<script>
export default {

}
</script>