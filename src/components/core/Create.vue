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
  <div class="bg-gray-100 p-3 w-5 p-component">
    <div class="text-3xl mb-3">Create {{ entityName }}</div>
    <FormBuilderGrid :form="form" :layout="layout" />
    <Button class="m-2" severity="success" label="Submit" @click="submit" />
  </div>
</template>

<style scoped>
</style>
