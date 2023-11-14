import http from '@libs/http.js';
import router from "../../routes.js";
import { useToast } from "primevue/usetoast";

export function useCreate(entity, form) {
    const toast = useToast();

    function create() {
        http.post('api/' + entity, form.state).then(() => {
          router.push({ name: entity });
        }).catch((axiosError) => {
          toast.add({ severity: 'error', summary: 'Error', detail: axiosError.response.data.message, life: 5000 });
        });
    }

    function submit() {
      if (form.submit()) {
        create();
      }
    }

    return { submit };
}