<template>
  <app-page title="Заявка">
  </app-page>
  <p><strong></strong></p>
</template>

<script setup>

import AppPage from '@/components/ui/AppPage';
import {useRoute} from "vue-router";
import {useStore} from "vuex";

const route = useRoute();
const store = useStore();
const id = route.params.id;
console.log(id);
console.log('Заявка: ', store.getters['request/REQUEST']);

</script>

<style scoped>

</style>
