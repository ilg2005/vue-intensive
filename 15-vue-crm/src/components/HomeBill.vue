<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

        <AppLoader v-if="loading"/>

        <p v-else
           class="currency-line"
           v-for="currency in currencies"
           :key="currency"
        >
          <span>{{ getCurrency(currency) }} {{ currency }}</span>
        </p>
      </div>
    </div>
  </div>

</template>

<script setup>
import {useStore} from "vuex";
import {computed, onMounted, ref, watch,} from "vue";
import AppLoader from "@/components/app/AppLoader";

const store = useStore();

const loading = ref(true);

const currencies = ['RUB', 'EUR', 'USD'];

const amount = ref();

const getCurrency = currency => Math.floor(amount.value * rates.value[currency]);

const user = computed(() => store.getters.USER);
watch(user, nv => {
  if(nv) {
    console.log('userinfo: ', nv.info);
    const base = computed(() => nv.info.bill / rates.value.RUB / rates.value.EUR);
    console.log('base: ', base.value);
    amount.value = base.value;
  }

});

const rates = computed(() => store.getters.RATES);
console.log('rates: ', rates.value);




onMounted(async () => {
  await store.dispatch('fetchCurrency');
  await store.dispatch('fetchInfo');
  loading.value = false;



});


</script>

<style scoped>

</style>
