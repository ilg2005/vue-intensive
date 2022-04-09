<template>
  <app-page :title="request ? `Заявка # ${id}` : ''">
    <template #header>
      <router-link v-if="request" class="btn primary" to="/">Назад</router-link>
      <div v-else-if="!loading && !request"
           class="text-danger"
      > Заявка # {{ id }} не найдена!
      </div>
    </template>
    <AppLoader v-if="loading"/>
    <div v-else-if="request">
      <p><strong>ФИО: </strong>{{ request.fullName }}</p>
      <p><strong>Телефон: </strong>{{ request.tel }}</p>
      <p><strong>Сумма: </strong>{{ request.sum }}</p>
      <p><strong>Статус: </strong>{{ request.state }}</p>
    </div>

  </app-page>


</template>

<script setup>

import AppPage from '@/components/ui/AppPage';
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import {onBeforeMount, ref} from "vue";
import AppLoader from "@/components/ui/AppLoader";

const route = useRoute();
const store = useStore();
const id = route.params.id;

const loading = ref(false);
const request = ref();

onBeforeMount(async () => {
  loading.value = true;
  request.value = await store.dispatch('request/getRequest', id);
  loading.value = false;
});


</script>

<style scoped>
.btn {
  font-size: 1rem;
}
</style>
