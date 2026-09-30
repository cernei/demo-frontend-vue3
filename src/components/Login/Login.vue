<script setup>
import http from "@libs/http.js";
import router from "../../routes.js";
import {config, initialState, layout} from "./form.js";
import FormBuilderGrid from "../core/FormBuilderGrid.vue";
import {useForm} from "@libs/useForm.js";
import {useToast} from "primevue/usetoast";

const toast = useToast();

const { form } = useForm(config, initialState);

async function login() {

  try {
    const result = await http.post('api/login', { email: form.state.email, password: form.state.password});
    console.log(result);
    await router.push({name: 'dashboard'});
  } catch(axiosError) {
    const err = axiosError.response?.data?.message ?? axiosError.message;

    toast.add({ severity: 'error', summary: 'Error', detail: err, life: 5000 });
  }
}
function submit() {
  if (form.submit()) {
    login();
  }
}
</script>

<template>
  <div class="flex justify-content-center mt-5">
    <div class="surface-card p-4 mt-8 shadow-2 border-round w-full md:w-30rem">
      <div class="text-center mb-5">
        <div class="text-900 text-3xl font-medium mb-3">Admin Panel</div>
      </div>
      <div>
        <FormBuilderGrid :form="form" :layout="layout" />
<!--        <div class="flex align-items-center justify-content-between mb-6">-->
<!--          <div class="flex align-items-center">-->
<!--            <Checkbox inputId="remember_me" :binary="true" v-model="checked" class="mr-2"></Checkbox>-->
<!--            <label for="remember_me">Remember me</label>-->
<!--          </div>-->
<!--          <a class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot password?</a>-->
<!--        </div>-->

        <Button label="Sign In" icon="pi pi-user" class="w-full mt-4" @click="submit" />
      </div>
    </div>
  </div>

</template>

<style scoped>
</style>
