import http from '@libs/http.js';
import router from "../../routes.js";
import { useToast } from "primevue/usetoast";

export function useUpdate(entity, id, form) {
    const toast = useToast();

    function update() {
        http.put('api/' + entity + '/' + id, form.state).then(() => {
          router.push({ name: entity });
        }).catch((axiosError) => {
          toast.add({ severity: 'error', summary: 'Error', detail: axiosError.response.data.message, life: 5000 });
        });
    }

    function submit() {
      if (form.submit()) {
          update();
      }
    }

    return { submit };
}