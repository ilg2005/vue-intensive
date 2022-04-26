<template>
  <AppLoader v-if="isLoading"/>
  <p v-else-if="!categories.length">Категорий пока нет.
    <router-link to="/categories"> Добавить новую категорию ?</router-link>
  </p>
  <div v-else>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{ bill }}</h4>
    </div>

    <section>
      <div v-for="category in categories"
           :key="category.id"
      >
        <p>
          <strong>{{ category.name }}:</strong>
          12 122 из 14 0000
        </p>
        <div class="progress">
          <div
              class="determinate green"
              style="width:40%"
          ></div>
        </div>
      </div>
    </section>
  </div>

</template>

<script setup>
import {useStore} from "vuex";
import currencyFilter from "@/utils/currencyFilter";
import AppLoader from "@/components/app/AppLoader";
import {onMounted, ref} from "vue";
import {toast} from "@/utils/toast";

const store = useStore();

const user = store.getters.USER;
const isLoading = ref(true);

const bill = currencyFilter(user.info.bill, 'RUB');
const categories = ref();

onMounted(async () => {
  try {
    categories.value = await store.dispatch('fetchCategories');
    isLoading.value = false;
  } catch (e) {
    toast(e.message, 1);
  }
})

</script>

<style scoped>

</style>
