import {computed, reactive, ref} from "vue";
import http from "@libs/http.js";
import router from "../../routes.js";

export const user = ref({permissions: []});
export async function getUser() {
    return http.get('api/user').then((response) => {
        user.value = response.data.data;
    }).catch(error => {
        router.push({ name: 'login'});
    });
}
