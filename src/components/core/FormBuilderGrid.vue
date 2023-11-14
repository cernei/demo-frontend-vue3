<script setup>

import http from "@libs/http.js";
import {computed, reactive} from "vue";

const props = defineProps(['form', 'layout'])

function getError(fieldName) {
  return (props.form.submitted || props.form.errors[fieldName]) ? props.form.errors[fieldName] : ''
}
const fieldNames = Object.keys(props.form.config);
const dictionaries = reactive({});

fieldNames.forEach(fieldName => {
  const field = props.form.config[fieldName];
  if (field.dictionary) {
    http.post('api/dictionaries/' + field.dictionary).then((axiosResponse) => {
      dictionaries[fieldName] = axiosResponse.data.data;
    })
  } else if(field.options) {
    dictionaries[fieldName] = field.options;
  }
})

function onSelect(fieldName, obj) {
  console.log(fieldName, obj);
  props.form.state[fieldName] = obj.value.value;
}
</script>

<template>
  {{ form.state }}
  <div class="p-component">
    <div class="flex gap-3" v-for="row in layout">
      <div class="flex-1  mb-3" v-for="fieldName in row" >
        <label :for="fieldName" class="block text-900 font-medium mb-2">
          {{ form.config[fieldName].label  }}
        </label>
        <template v-if="form.config[fieldName].component === 'text'">
          <InputText :id="fieldName"
                     type="text"
                     class="w-full"
                     :class="{ 'p-invalid': form.errors[fieldName] }"
                     v-model="form.state[fieldName]"
                     :disabled="form.config[fieldName].disabled"
                     @input="form.validate(fieldName)"
          />

          <small class="p-error ml-1">{{ getError(fieldName) }}</small>
        </template>
        <template v-if="form.config[fieldName].component === 'textarea'">
          <Textarea class="w-full"
                    :class="{ 'p-invalid': form.errors[fieldName] }"
                    v-model="form.state[fieldName]"
                    @input="form.validate(fieldName)"
                    rows="5" cols="30"
          />
          <small class="p-error ml-1">{{ getError(fieldName) }}</small>
        </template>
        <template v-if="form.config[fieldName].component === 'select'">
          <Dropdown v-model="form.state[fieldName]"
                    :class="{ 'p-invalid': form.errors[fieldName] }"
                    @change="form.validate(fieldName)"
                    :options="dictionaries[fieldName]"
                    optionLabel="name"
                    placeholder="Select a value"
                    optionValue="id"
                    class="w-full" />
          <!--                    @change="(obj) => onSelect(fieldName, obj)"-->

          <small class="p-error ml-1">{{ getError(fieldName) }}</small>
        </template>
        <template v-if="form.config[fieldName].component === 'checkbox-group'">
          <div class="flex flex-column gap-3 ml-3">
            <div v-for="option in dictionaries[fieldName]" :key="option.id" class="flex align-items-center gap-1">
              <Checkbox v-model="form.state[fieldName]" :inputId="option.id" :name="fieldName" :value="option.id" />
              <label :for="option.id" class="text-800 text-sm">{{ option.name }}</label>
            </div>
          </div>
          <small class="p-error ml-1">{{ getError(fieldName) }}</small>
        </template>

      </div>
    </div>
  </div>

</template>

<style scoped>

</style>