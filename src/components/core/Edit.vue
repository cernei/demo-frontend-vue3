<script setup>
import FormBuilderGrid from "../core/FormBuilderGrid.vue";
import { useForm } from '@libs/useForm.js';
import { useUpdate } from "./useUpdate.js";
import { getForm } from "../getForm.js";
import {useRoute} from "vue-router";
import {computed, reactive, toRefs} from "vue";
import http from "@libs/http.js";
import router from "../../routes.js";
import {useToast} from "primevue/usetoast";

const route = useRoute();
const currentRouteName = computed(() => route.name);
const toast = useToast();

const { layout, config, initialState, url, entityName } = getForm(currentRouteName.value);
const { form } = useForm(config, initialState);
const { submit } = useUpdate(url, route.params.id, form);

http.get(`api/${url}/${route.params.id}/edit`).then((response) => {
  form.state = response.data.data;
}).catch((axiosError) => {
  toast.add({ severity: 'error', summary: 'Error', detail: axiosError.response.data.message, life: 5000 });
});

</script>

<template>
  <div class="bg-gray-100 p-3 w-5 p-component">
    <div class="text-3xl mb-3">Update {{ entityName }}</div>
    <FormBuilderGrid :form="form" :layout="layout" />
    <Button class="m-2" severity="success" label="Submit" @click="submit" />
  </div>
</template>

<style scoped>
</style>
