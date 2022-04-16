<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Курс валют</span>
        </div>
        <AppLoader v-if="loading"/>
        <table v-else>
          <thead>
          <tr>
            <th>Валюта</th>
            <th>Курс</th>
            <th>Дата</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="currency in currencies"
              :key="currency"
          >
            <td>{{ currency }}</td>
            <td>{{ rates[currency].toFixed(2) }}</td>
            <td>{{ date }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

</template>

<script setup>
import AppLoader from '@/components/app/AppLoader';
import {computed, ref, watch } from "vue";
import {useStore} from "vuex";

const store = useStore();
const loading = ref(true);
const currencies = ['RUB', 'EUR', 'USD'];

const rates = computed(() => store.getters.RATES);

watch(rates, () => {
  loading.value = false;
});

const date = computed(() => {
  return new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).format(new Date());
});


</script>

<style scoped>

</style>
