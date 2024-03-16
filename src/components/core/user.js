import {ref} from "vue";
import http from "@libs/http.js";

export const user = ref({permissions: []});
export async function getUser() {
    return http.get('api/user').then((response) => {
        user.value = response.data.data;
    });
}

export async function trackView(url) {
    return http.post('api/access_log', {
        url
    });
}
