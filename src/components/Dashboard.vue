<script setup>
import { reactive, ref } from 'vue';
import http from '@libs/http.js';

const error = ref('');
const tables = reactive({ invoices: [], jobs: [], failedJobs: [], eventLog: [] });
const loading = reactive({ tables: true, batch: false, clear: false, workers: false });
const invoiceTemplate = {
    event: 'invoice.created',
    customer: { id: 'CUST-4711', name: 'Muster Optik GmbH', email: 'kontakt@musteroptik.example' },
    amount: 249.90,
    currency: 'CHF',
    status: 'open',
    due_date: '2026-10-15',
    created_at: '2026-09-08T10:15:00Z'
};

function columns(rows) {
    return rows.length ? Object.keys(rows[0]) : [];
}

function truncateValue(value) {
    const text = String(value);
    return text.length > 1000 ? text.slice(0, 999) + String.fromCharCode(8230) : text;
}

function displayValue(value, column = "") {
    if (value === null || value === undefined) return "";
    if (typeof value === "object") return truncateValue(JSON.stringify(value));
    if (typeof value !== "string" || !isDateColumn(column)) return truncateValue(value);

    const dateOnly = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    if (dateOnly) {
        const [, year, month, day] = dateOnly;
        return truncateValue(new Intl.DateTimeFormat(undefined, {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        }).format(new Date(Number(year), Number(month) - 1, Number(day))));
    }

    if (!/^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}/.test(value)) return truncateValue(value);

    const date = new Date(value.includes("T") ? value : value.replace(" ", "T") + "Z");
    if (Number.isNaN(date.getTime())) return truncateValue(value);

    return truncateValue(new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "medium"
    }).format(date));
}

function isDateColumn(column) {
    return /(?:^|_)(?:date|at|on|time|timestamp)$/.test(column.toLowerCase());
}

async function fetchTables() {
    const response = await http.get('api/data');
    const data = response.data;
    Object.keys(tables).forEach((tableName) => {
        tables[tableName] = Array.isArray(data[tableName]) ? data[tableName] : [];
    });
}

async function apiRequest(requests, action = null) {
    const apiRequests = Array.isArray(requests) ? requests : [requests];
    if (action) loading[action] = true;
    error.value = '';
    try {
        await Promise.all(apiRequests.map((request) => {
            if (typeof request === 'string') return http.get(request);
            if (request.method === 'post') return http.post(request.url, request.data);
            return http.get(request.url);
        }));
    } catch (requestError) {
        const status = requestError.response?.status;
        error.value = status ? `Request failed (${status}).` : requestError.message || 'Unable to complete request.';
    } finally {
        try {
            await fetchTables();
        } catch (tableError) {
            error.value = tableError.message || 'Unable to refresh dashboard data.';
        }
        if (action) loading[action] = false;
    }
}

async function sendInvoices() {
    const testCases = ['ok', 'ok-or-server-error', 'bad-json', 'validation-error', 'bad-response', 'server-error', 'timeout'];
    await apiRequest(
        testCases.map((comment, index) => ({
            method: 'post',
            url: 'api/webhooks/invoices',
            data: { ...invoiceTemplate, invoice_id: `INV-2026-0${index}`, comment }
        })),
        'batch'
    );
}

async function clearAll() {
    await apiRequest('api/clear-all', 'clear');
}

async function runWorkers() {
    await apiRequest(['api/shipment-job-test', 'api/shipment-job-test'], 'workers');
}

fetchTables()
    .catch((requestError) => { error.value = requestError.message || 'Unable to load dashboard data.'; })
    .finally(() => { loading.tables = false; });
</script>

<template>
    <main class="min-h-screen bg-white px-1">
        <section class="flex w-full flex-wrap align-items-center justify-content-between gap-4">
            <button class="p-button p-button-outlined p-button-secondary " type="button" :disabled="loading.batch" @click="sendInvoices">
                {{ loading.batch ? 'Sending...' : 'Send batch of invoices' }}
            </button>
            <button class="p-button p-button-outlined p-button-secondary " type="button" :disabled="loading.clear" @click="clearAll">
                {{ loading.clear ? 'Clearing...' : 'Clear all' }}
            </button>
            <div class="flex align-items-center gap-5 text-center">
                <span class="text-sm ">Run two workers simultaneously to handle invoices, one job per worker -&gt;</span>
                <button class="p-button p-button-outlined p-button-secondary " type="button" :disabled="loading.workers" @click="runWorkers">
                    {{ loading.workers ? 'Running...' : 'Start' }}
                </button>
            </div>
        </section>
        <p v-if="error" class="mt-5 border-1 border-red-200 bg-red-50 p-3 text-sm text-red-700" role="alert">{{ error }}</p>
        <section class="mt-3 min-w-0">
            <div v-if="loading.tables" class="py-12 text-center text-sm ">Loading dashboard...</div>
            <div v-for="(rows, tableName) in tables" :key="tableName">
                <h2 class="pt-8 text-lg font-bold">{{ tableName }}</h2>
                <div class="mt-2 w-full min-w-0 max-w-full overflow-x-auto">
                    <table class="dashboard-table text-left">
                        <thead v-if="rows.length" class="surface-50">
                        <tr class="border-bottom-1 surface-border transition-colors hover:bg-blue-50">
                            <th v-for="column in columns(rows)" :key="column" class="px-2 py-2 white-space-nowrap">{{ column }}</th>
                        </tr>
                        </thead>
                        <tbody v-if="rows.length">
                        <tr v-for="(row, rowIndex) in rows" :key="row.id ?? rowIndex" class="border-bottom-1 surface-border transition-colors hover:bg-blue-50">
                            <td v-for="column in columns(rows)" :name="column" :key="column" class="px-2 py-2 text-sm text-700">{{ displayValue(row[column], column) }}</td>
                        </tr>
                        </tbody>
                        <tbody v-else>
                        <tr class="border-bottom-1 surface-border transition-colors hover:bg-blue-50">
                            <td class="px-5 py-14 text-center">
                                <p class="text-sm font-semibold ">No {{ tableName }} yet</p>
                                <p class="mt-1 text-sm ">New {{ tableName }} records will appear here.</p>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    </main>
</template>

<style scoped>
.dashboard-table {
    width: max-content;
    min-width: 100%;
    max-width: 100%;
    table-layout: auto;
    border-collapse: collapse;
}
.dashboard-table td:is([name="payload"], [name="exception"]) {
  word-break: break-all;
}

</style>
