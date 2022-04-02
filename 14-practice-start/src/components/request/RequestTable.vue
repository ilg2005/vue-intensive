<template>
  <h4 v-if="requests.length === 0" class="text-center">Заявок пока нет</h4>
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

    <tr v-for="(request, i) in requests"
        :key="request"
    >
      <td>{{ i + 1 }}</td>
      <td>{{ request.fullName }}</td>
      <td>{{ request.tel }}</td>
      <td>{{ request.sum }}</td>
      <td>{{ stateMap[request.state] }}</td>
      <td>{{ request.action }}</td>
    </tr>

    </tbody>
  </table>
</template>

<script setup>
import {defineProps} from "vue";
import {useStore} from "vuex";

const store = useStore();
const stateMap = store.getters['request/STATE_MAP'];
defineProps(['requests']);


</script>

<style scoped>

</style>
