<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <div class="row">

      <HomeBill/>

      <HomeCurrency/>

    </div>
  </div>
</template>

<script setup>

import HomeBill from "@/components/HomeBill";
import HomeCurrency from "@/components/HomeCurrency";
import {onMounted} from "vue";
import {useStore} from "vuex";

const store = useStore();


const refresh = async () => {
  await store.dispatch('fetchInfo');
  await store.dispatch('fetchCurrency');
}

onMounted(async () => {
  await store.dispatch('fetchCurrency');
});

</script>
