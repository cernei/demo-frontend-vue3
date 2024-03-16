<script setup>
import {computed, onMounted, ref} from 'vue'

import http from '@libs/http.js';
import {FilterMatchMode} from "primevue/api";
import {useConfirm} from "primevue/useconfirm";
import router from "../../routes.js";
import {user} from "./user.js";

const props = defineProps(['config']);

const confirm = useConfirm();
const hasFilters = ref(false);
const currentPage = ref(0);
const sortField = ref('');
const executionTime = ref(0);

const filters = ref({});
Object.keys(props.config.columns).forEach(columnsName => {
  if (props.config.columns[columnsName].search) {
    hasFilters.value = true;
    filters.value[columnsName] = { value: null, matchMode: FilterMatchMode.STARTS_WITH };
  }
});
const filterHasValue = computed(() => Object.keys(filters.value).some((key) => filters.value[key].value));

function deleteItem(data) {
  confirm.require({
    message: 'Are you sure you want to delete?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      http.delete(`api/${props.config.entity}/${data.id}`).then(() => {
        loadPaginated(0);
      });
    },
  });
}
function editItem(data) {
  router.push({ name: props.config.entity + '.edit', params: { id: data.id }});
}
const pagination = ref({});
onMounted( async () => {
  await loadPaginated();
})
async function loadPaginated(page = 0, sortOrder = 1) {
  currentPage.value = page;
  const startTime = new Date();
  const response = await http.post("api/query", {
    entity: props.config.entity,
    filters: filters.value,
    sort: { field: sortField.value, order: sortOrder},
    page: (page + 1),
  });
  executionTime.value = new Date() - startTime;

  const axiosResponse = response.data;
  pagination.value = axiosResponse.data;
}
function paginatorChange($event) {
  currentPage.value = $event.page;
  loadPaginated($event.page);
}
function onFilter($event) {
  loadPaginated();
}
function onSortField(name) {
  sortField.value = name;
}
function onSortOrder(order) {
  loadPaginated(0, order);
}
</script>

<template>
  <ConfirmDialog></ConfirmDialog>
  <template v-if="filterHasValue || pagination.data && pagination.data.length">
    <DataTable :value="pagination.data" lazy tableStyle="min-width: 50rem"
               :filterDisplay="hasFilters ? 'row' : ''"
               @filter="onFilter($event)"
               @update:sortField="onSortField($event)"
               @update:sortOrder="onSortOrder($event)"
               v-model:filters="filters">
  <!--    <template #header>-->
  <!--      <div class="flex justify-content-start">-->
  <!--        <span class="p-input-icon-right">-->
  <!--            <i class="pi pi-search" />-->
  <!--            <InputText v-model="criteria" placeholder="Full text search" />-->
  <!--        </span>-->
  <!--      </div>-->
  <!--    </template>-->
      <template #loading> Loading customers data. Please wait. </template>
      <template v-for="(column, index) in config.columns">
        <template v-if="column.search">
          <Column :field="index" :header="column.label" :sortable="column.sortable" :show-filter-menu="false" >
            <template #body="{ data }">
              {{  $filters.truncate(data[index], 100) }}
            </template>
            <template #filter="{ filterModel, filterCallback }" >
              <InputText v-model="filterModel.value"
                         type="text"
                         @keydown.enter="filterCallback"
                         class="p-column-filter"
                         placeholder="Search" />
            </template>
          </Column>
        </template>
        <template v-else>
          <Column :field="index" :header="column.label" :sortable="column.sortable"></Column>
        </template>
      </template>
      <Column header="Actions">
        <template #body="slotProps">
          <Button v-if="user.permissions.includes(config.entity + '.edit')" @click="editItem(slotProps.data)"  severity="secondary" outlined size="small" icon="pi pi-pencil" class="smallButton" />
          <Button v-if="user.permissions.includes(config.entity + '.delete')" @click="deleteItem(slotProps.data)"  severity="secondary" outlined  size="small" icon="pi pi-trash" class="ml-2 smallButton"/>
        </template>
      </Column>
    </DataTable>
    <div class="footer">
      <div>Query took: {{ executionTime }} ms</div>
      <Paginator :rows="pagination.per_page"
                 :first="currentPage * pagination.per_page"
                 :totalRecords="pagination.total"
                 template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
                 :rowsPerPageOptions="[20, 50, 100]"
                 @page="paginatorChange">

      </Paginator>
      <div style="text-align: right">
        Total: {{ pagination.total }}
      </div>
    </div>
  </template>
  <template v-else>
    <div class="text-3xl flex justify-content-center">No data</div>
  </template>
</template>

<style scoped>
.footer {
  display: grid;
  grid-template-columns: 20% 60% 20%;
  align-items: center;
}
.smallButton {
  padding: 0.25rem;
  width: 2rem;
}
</style>
