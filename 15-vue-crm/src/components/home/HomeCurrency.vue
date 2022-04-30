<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{ i18n.exchangeRate }}</span>
        </div>
        <AppLoader v-if="loading"/>
        <table v-else>
          <thead>
          <tr>
            <th>{{ i18n.currency }}</th>
            <th>{{ i18n.rate }}</th>
            <th>{{ i18n.date }}</th>
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
import dateFilter from "@/utils/dateFilter";

const store = useStore();
const locale = computed(() => store.getters.USER.info.locale);
const i18n = computed(() => store.getters.TRANSLATION[locale.value]);

const loading = ref(true);
const currencies = ['RUB', 'USD', 'EUR'];

const rates = computed(() => store.getters.RATES);

watch(rates, () => {
  loading.value = false;
});

const date = computed(() => dateFilter(store.getters.CURRENCY.lastupdate));


</script>

<style scoped>

</style>
