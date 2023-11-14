<script setup>
import {ref, unref} from 'vue'
import FormBuilderGrid from "./core/FormBuilderGrid.vue";
import { Formation } from '@libs/formation';
import {useForm} from "@libs/useForm.js";

const source = ref('');
const layout = ref([]);
const { form } = useForm(config, {});

function convert() {
  form.value = Formation.parse(source.value);
  console.log(form);
}

</script>

<template>
  <div class="p-component bg-gray-100 p-3">
    <div class="grid">
      <div class="col-4">
        <div class="text-3xl mb-3">Input:</div>
        <Textarea v-model="source" rows="5" cols="30" @input="convert()" class="w-full"/>
      </div>
      <div class="col-8">
        <div class="text-3xl mb-3">Output:</div>
        <div class="flex-grow-1">
          <FormBuilderGrid :form="form" :layout="layout"  />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
