<template>
  <div>
    <div class="page-title">
      <Teleport to="head">
        <title>{{ i18n.account }} | {{ i18n.homeBanking }}</title>
      </Teleport>
      <h3>{{ i18n.account }}</h3>

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

import HomeBill from "@/components/home/HomeBill";
import HomeCurrency from "@/components/home/HomeCurrency";
import AppLoader from "@/components/app/AppLoader";
import {onMounted, ref, computed} from "vue";
import {useStore} from "vuex";

const store = useStore();
const locale = computed(() => store.getters.USER.info.locale);
const i18n = computed(() => store.getters.TRANSLATION[locale.value]);

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
