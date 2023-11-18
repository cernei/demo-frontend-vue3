<script setup>
import FormBuilderGrid from "../core/FormBuilderGrid.vue";
import { useForm } from '@libs/useForm.js';
import { useCreate } from "./useCreate.js";
import { getForm } from "../getForm.js";
import {useRoute} from "vue-router";
import {computed} from "vue";

const route = useRoute()
const currentRouteName = computed(() => route.name);

const { layout, config, initialState, url, entityName } = getForm(currentRouteName.value);
const { form } = useForm(config, initialState);
const { submit } = useCreate(url, form);

</script>

<template>
  <div class="surface-card p-4 shadow-2 border-round w-5 lg:w-6">
    <div class="text-3xl mb-3">Create {{ entityName }}</div>
    <FormBuilderGrid :form="form" :layout="layout" />
    <Button class="m-2" severity="success" label="Submit" @click="submit" />
  </div>
</template>

<style scoped>
</style>
