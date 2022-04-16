<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <AppLoader v-show="loading"/>

    <div class="row" v-show="!loading">

      <HomeBill/>

      <HomeCurrency/>

    </div>
  </div>
</template>

<script setup>

import HomeBill from "@/components/HomeBill";
import HomeCurrency from "@/components/HomeCurrency";
import AppLoader from "@/components/app/AppLoader";
import {onMounted, ref} from "vue";
import {useStore} from "vuex";

const store = useStore();

const loading = ref(false);
const refresh =  () => {
  loading.value = true;
  setTimeout(async () => {
    await store.dispatch('fetchInfo');
    await store.dispatch('fetchCurrency');
    loading.value = false;
  }, 1000);


}

onMounted(async () => {
  await store.dispatch('fetchCurrency');
});

</script>
