<script setup>
import { onMounted, ref } from 'vue'
import http from '@libs/http.js'

const loading = ref(true)
const error = ref('')
const dashboardData = ref({})

const widgets = [
  { title: 'Orders', items: [{ label: 'Unprocessed orders', group: 'orders', key: 'unprocessed' }], icon: '🛍️', color: 'orders' },
  { title: 'Products', items: [{ label: 'Best-selling product', group: 'products', key: 'bestSelling' }], icon: '📦', color: 'products' },
  { title: 'Warehouse', items: [
    { label: 'Total items', group: 'warehouse', key: 'totalItems' },
  ], icon: '🏬', color: 'warehouse' },
]

function itemValue(group, key) {
  const value = dashboardData.value?.[group]?.[key]
  if (value === undefined || value === null) return '—'
  if (Array.isArray(value)) return value.length
  if (typeof value === 'object') {
    return value.name ?? value.title ?? value.product_name ?? value.data?.name ?? JSON.stringify(value)
  }
  return value
}

onMounted(async () => {
  try {
    const response = await http.get('/dashboard')
    dashboardData.value = response.data?.data ?? response.data ?? {}
  } catch (requestError) {
    error.value = requestError.response?.status
      ? `Unable to load dashboard (${requestError.response.status}).`
      : requestError.message || 'Unable to load dashboard.'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <main class="dashboard">
    <header class="dashboard__header">
      <p class="dashboard__eyebrow">Overview</p>
      <h1>Dashboard</h1>
    </header>
    <p v-if="error" class="dashboard__error" role="alert">{{ error }}</p>
    <section class="widget-grid" aria-label="Dashboard overview">
      <article v-for="widget in widgets" :key="widget.title" class="widget" :class="`widget--${widget.color}`">
        <div class="widget__heading">
          <span class="widget__icon" aria-hidden="true">{{ widget.icon }}</span>
          <h2>{{ widget.title }}</h2>
        </div>
        <ul class="widget__items">
          <li v-for="item in widget.items" :key="item.label">
            <span>{{ item.label }}</span>
            <strong v-if="loading" class="widget__value">…</strong>
            <strong v-else class="widget__value">{{ itemValue(item.group, item.key) }}</strong>
          </li>
        </ul>
      </article>
    </section>
  </main>
</template>

<style scoped>
.dashboard { min-height: 100%; padding: 32px; color: #172033; background: #f6f8fb; }
.dashboard__header { margin-bottom: 28px; }
.dashboard__eyebrow { margin: 0 0 6px; color: #718096; font-size: 12px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; }
h1 { margin: 0; font-size: 28px; font-weight: 700; }
.widget-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
.widget { min-height: 210px; padding: 22px; border: 1px solid #e6eaf0; border-radius: 14px; background: #fff; box-shadow: 0 4px 14px rgb(29 47 77 / 4%); }
.widget__heading { display: flex; align-items: center; gap: 12px; padding-bottom: 18px; border-bottom: 1px solid #edf0f4; }
.widget__icon { display: grid; width: 42px; height: 42px; place-items: center; border-radius: 12px; background: #eff4ff; font-size: 20px; }
.widget--products .widget__icon { background: #eaf8f1; }
.widget--warehouse .widget__icon { background: #fff4e8; }
h2 { margin: 0; font-size: 18px; font-weight: 650; }
.widget__items { display: grid; gap: 4px; margin: 12px 0 0; padding: 0; list-style: none; }
.widget__items li { display: flex; align-items: center; justify-content: space-between; min-height: 42px; color: #4b5565; font-size: 14px; }
.widget__arrow { color: #98a2b3; font-size: 16px; }
.widget__value { margin-left: 12px; color: #172033; font-size: 14px; text-align: right; }
.dashboard__error { margin: 0 0 20px; padding: 12px 16px; border-radius: 8px; color: #a12b2b; background: #fff0f0; }
@media (max-width: 900px) { .widget-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 600px) { .dashboard { padding: 22px 16px; } .widget-grid { grid-template-columns: 1fr; } }
</style>
