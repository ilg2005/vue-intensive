<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <AppLoader v-if="loading"/>
    <div class="row" v-else>

      <HomeBill />

      <HomeCurrency/>

    </div>
  </div>
</template>

<script setup>
import HomeBill from "@/components/HomeBill";
import HomeCurrency from "@/components/HomeCurrency";
import AppLoader from '@/components/app/AppLoader';
import {onMounted, ref} from "vue";
import {useStore} from "vuex";

let loading = ref(true);

const store = useStore();

const refresh = () => {
  console.log('refreshing');
}

onMounted(async () => {
  await store.dispatch('fetchCurrency');
  loading.value = false;
})
</script>
