import {createApp} from 'vue';
import './style.css';
import App from './App.vue';

import PrimeVue from "primevue/config";
import "primevue/resources/themes/lara-light-indigo/theme.css";
import '/node_modules/primeflex/primeflex.css';
import '/node_modules/primeicons/primeicons.css';

import Toast from "primevue/toast";
import InputText from "primevue/inputtext";
import Textarea from 'primevue/textarea';
import Column from "primevue/column";
import DataTable from 'primevue/datatable';
import Paginator from 'primevue/paginator';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import Checkbox from "primevue/checkbox";
import ConfirmDialog from "primevue/confirmdialog";

import CrudTable from "./components/core/CrudTable.vue";
import FormBuilderGrid from "./components/core/FormBuilderGrid.vue";

import router from './routes.js';
import ToastService from "primevue/toastservice";
import ConfirmationService from "primevue/confirmationservice";

const app = createApp(App);

app.component('Button', Button);
app.component('InputText', InputText);
app.component('Textarea', Textarea);
app.component('Column', Column);
app.component('DataTable', DataTable);
app.component('Paginator', Paginator);
app.component('CrudTable', CrudTable);
app.component('FormBuilderGrid', FormBuilderGrid);
app.component('Dropdown', Dropdown);
app.component('Toast', Toast);
app.component('ConfirmDialog', ConfirmDialog);
app.component('Checkbox', Checkbox);

app.use(router);

app.use(PrimeVue);
app.use(ToastService);
app.use(ConfirmationService);

app.mount('#app')

app.config.globalProperties.$filters = {
    truncate(text, stop, clamp) {
        return text.slice(0, stop) + (stop < text.length ? clamp || '...' : '')
    }
}
