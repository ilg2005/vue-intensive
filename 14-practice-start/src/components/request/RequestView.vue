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
      <p><strong>Сумма: </strong>{{ currency(request.sum) }}</p>
      <p class="form-control">
        <label for="state">Статус: </label>
        <select
            id="state"
            name="state"
            v-model="state"
        >
          <option v-for="(value, state) in TextMap"
                  :key="state"
                  :value=state>{{ value }}
          </option>
        </select>
      </p>
      <button class="btn" v-if="state !== request.state">Обновить</button>
    </div>

  </app-page>


</template>

<script setup>

import AppPage from '@/components/ui/AppPage';
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import {onBeforeMount, ref} from "vue";
import AppLoader from "@/components/ui/AppLoader";
import {currency} from "@/utils/currency";
import {TextMap} from "@/components/ui/AppStatus";


const route = useRoute();
const store = useStore();
const id = route.params.id;

const loading = ref(false);
const request = ref();
const state = ref();

onBeforeMount(async () => {
  loading.value = true;
  request.value = await store.dispatch('request/getRequest', id);
  state.value = request.value.state;
  loading.value = false;
});


</script>

<style scoped>
.btn {
  font-size: 1rem;
}

.form-control {
  display: flex;
  justify-content: left;
}

label {
  margin-right: 0.5rem;
  margin-top: 0.5rem;
}

.btn {
  margin-top: 1rem;
}
</style>
