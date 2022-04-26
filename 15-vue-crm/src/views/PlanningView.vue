<template>
  <AppLoader v-if="isLoading"/>
  <p v-else-if="!categories.length" class="text-center">Категорий пока нет.
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
          {{ currencyFilter(category.spent, 'RUB') }} из {{ currencyFilter(category.limit, 'RUB') }}
        </p>
        <div class="progress">
          <div
              :class="['determinate', getProgressColor(category.percent)]"
              :style="`width:${category.percent}%`"
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

const getProgressColor = percent => percent <= 50 ? 'green' : (percent > 80 ? 'red' : 'yellow');

onMounted(async () => {
  try {
    let cats = await store.dispatch('fetchCategories');
    const records = await store.dispatch('fetchRecords');

      cats.map(element => {
        const spentAmount = records
            .filter(r => r.categoryId === element.id)
            .filter(r => r.type === 'outcome')
            .reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0);
        element.spent = spentAmount;

        element.percent = spentAmount * 100 / element.limit;
      });
    categories.value = cats;
    isLoading.value = false;
  } catch (e) {
    toast(e.message, 1);
  }
})

</script>

<style scoped>

</style>
