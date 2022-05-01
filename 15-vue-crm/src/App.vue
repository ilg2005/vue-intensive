<template>
  <AppLoader
      v-if="isLoading"
      class="grey darken-1 empty-layout"
      spinner="spinner-yellow-only"
      size="big"
  />
  <component :is="view" v-else>
    <router-view/>
  </component>

</template>

<script setup>
import AppLoader from "@/components/app/AppLoader";
import EmptyLayout from "@/layouts/EmptyLayout";
import MainLayout from "@/layouts/MainLayout";

import {useRoute} from 'vue-router';
import {ref, watch, computed, onMounted} from "vue";
import {useStore} from "vuex";
import {toast} from "@/utils/toast";

const route = useRoute();
const store = useStore();
const isLoading = ref(true);

const view = computed(() => route.meta.layout === 'main' ? MainLayout : EmptyLayout);

const translation = computed(() => store.getters.TRANSLATION);
watch(translation, () => {
  isLoading.value = false;
});

onMounted(async () => {
  try {
    await store.dispatch('fetchTranslation', true);
  } catch (e) {
    toast(e.message, 1);
  }

})

</script>

<style>

</style>
