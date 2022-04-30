<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">{{ i18n.currencyAccount }}</span>

        <AppLoader v-if="loading"/>

        <p v-else
           class="currency-line"
           v-for="currency in currencies"
           :key="currency"
        >
          <span>{{ currencyFilter(getCurrency(currency), currency) }}</span>
        </p>
      </div>
    </div>
  </div>

</template>

<script setup>
import {useStore} from "vuex";
import {computed, ref, watch,} from "vue";
import AppLoader from "@/components/app/AppLoader";
import currencyFilter from "@/utils/currencyFilter";

const store = useStore();
const locale = computed(() => store.getters.USER.info.locale);
const i18n = computed(() => store.getters.TRANSLATION[locale.value]);

const loading = ref(true);

const currencies = ['RUB', 'USD', 'EUR'];

const amount = ref();

const getCurrency = currency => currency !== 'RUB' ? Math.floor(amount.value * rates.value[currency]) : (amount.value * rates.value['RUB']);

const user = computed(() => store.getters.USER);

const rates = computed(() => store.getters.RATES);

watch([user, rates], ([newUser]) => {
  if (newUser) {
    const base = computed(() => user.value.info.bill / rates.value.RUB / rates.value.USD);
    amount.value = base.value;
    loading.value = false;
  }
});

</script>

<style scoped>

</style>
