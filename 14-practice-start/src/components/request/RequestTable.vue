<template>
  <RequestFilter v-model="filter"/>
  <hr>
  <AppLoader v-if="loading"/>
  <h4 v-else-if="!Object.keys(requests).length" class="text-center">Заявок пока нет</h4>
  <div v-else>
    <table class="table">
      <thead>
      <tr>
        <th>#</th>
        <th>ФИО</th>
        <th>Телефон</th>
        <th>Сумма</th>
        <th>Статус</th>
        <th colspan="2">Действие</th>
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
          <router-link
              class="btn info"
              :to="`/request/${request.id}`"
          >открыть</router-link>
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
import {computed, onBeforeMount, ref, watch} from "vue";
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

const filter = ref({});
const name = ref('');
const status = ref('');

watch(filter, ({fullname, state}) => {
  name.value = fullname;
  status.value = state;
});


let requests = computed(() => store.getters['request/REQUESTS']
    .filter(request => {
      if(name.value) {
        return request.fullName.includes(name.value);
      }
      return request;
    })
    .filter(request => {
      if(status.value) {
        return request.state === status.value;
      }
      return request;
    })
);


const removeRequest = (name) => {
  store.dispatch('request/removeRequest', name);
};

</script>

<style scoped>
.btn {
  font-size: 12px;
}
</style>
