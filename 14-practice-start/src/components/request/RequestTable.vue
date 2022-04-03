<template>
  <h4 v-if="!requests" class="text-center">Заявок пока нет</h4>
  <table v-else class="table">
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
      <tr v-for="(request, name, index) in requests"
          :key="request.id"
      >
        <td>{{ index + 1 }}</td>
        <td>{{ request.fullName }}</td>
        <td>{{ request.tel }}</td>
        <td>{{ request.sum }}</td>
        <td>{{ stateMap[request.state] }}</td>
        <td>
          <button class="btn danger" @click="removeRequest(request.id, name)">удалить</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import {useStore} from "vuex";
import {computed, onBeforeMount} from "vue";

const store = useStore();
const stateMap = store.getters['request/STATE_MAP'];

onBeforeMount(() => {
  store.dispatch('request/getRequests');
});



let requests = computed(() => store.getters['request/REQUESTS']);

const removeRequest = (id, name) => {
  console.log('id::', id);
  store.dispatch('request/removeRequest', {id, name});
}

</script>

<style scoped>

</style>
