<template>
  <AppLoader v-if="isLoading"/>
  <div v-else-if="record">
    <div>
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">История</router-link>
        <a class="breadcrumb" @click.prevent>
          {{ record.type === 'outcome' ? 'Расход' : 'Доход' }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card"
               :class="{
                red: record.type === 'outcome',
                green: record.type === 'income',
               }"
          >
            <div class="card-content white-text">
              <p>Описание: {{ record.description }}</p>
              <p>Сумма: {{ currencyFilter(record.amount, 'RUB') }}</p>
              <p>Категория: {{ category.name }}</p>

              <small>{{ dateFilter(record.created) }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <p class="center" v-else>Записи с id = <strong>{{ $route.params.id }}</strong> не существует</p>

</template>

<script setup>
import {onMounted, ref} from "vue";
import {toast} from "@/utils/toast";
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import AppLoader from "@/components/app/AppLoader";
import currencyFilter from "@/utils/currencyFilter";
import dateFilter from "@/utils/dateFilter";

const store = useStore();
const route = useRoute();
const isLoading = ref(true);
const record = ref();
const category = ref();

onMounted(async () => {
  try {
    record.value = await store.dispatch('fetchRecordById', route.params.id);
    category.value = await store.dispatch('fetchCategoryById', record.value.categoryId);
    isLoading.value = false;
  } catch (e) {
    toast(e.message, 1);
  }

})
</script>

<style scoped>

</style>
