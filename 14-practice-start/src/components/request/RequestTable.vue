<template>

  <AppLoader v-if="loading"/>
  <h4 v-else-if="!Object.keys(requests).length" class="text-center">Заявок пока нет</h4>
  <div v-else>

    <RequestFilter @filter="filtering"/>
    <hr>

    <table class="table">
      <thead>
      <tr>
        <th>#</th>
        <th>ФИО</th>
        <th>Телефон</th>
        <th>Сумма</th>
        <th>Статус</th>
        <th>Действие</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(request, i) in requests"
          :key="request.id"
      >
        <td>{{ i + 1 }}</td>
        <td>{{ request.fullName }}</td>
        <td>{{ request.tel }}</td>
        <td>{{ currency(request.sum) }}</td>
        <td>
          <AppStatus :type="request.state"/>
        </td>
        <td>
          <button class="btn danger" @click="removeRequest(request.id)">удалить</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import {useStore} from "vuex";
import {computed, onBeforeMount, ref} from "vue";
import AppLoader from "@/components/ui/AppLoader";
import {currency} from "@/utils/currency";
import AppStatus from "@/components/ui/AppStatus";
import RequestFilter from "@/components/request/RequestFilter";

const store = useStore();

const loading = ref(false);

onBeforeMount(async () => {
  loading.value = true;
  await store.dispatch('request/getRequests');
  loading.value = false;
});


let requests = computed(() => store.getters['request/REQUESTS']);

const filtering = (payload) => {
  console.log('filter:: ', payload);
}

const removeRequest = (name) => {
  store.dispatch('request/removeRequest', name);
}

</script>

<style scoped>

</style>
