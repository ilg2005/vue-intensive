<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <AppLoader v-if="isLoading"/>
    <p v-else-if="!records.length" class="center">
      Записей пока нет.
      <router-link to="/record">Добавить первую?</router-link>
    </p>
    <div v-else>
      <div class="history-chart">
        <canvas></canvas>
      </div>

      <section>
        <RecordsTable :records="records"/>
      </section>
    </div>
  </div>

</template>

<script setup>
import RecordsTable from '@/components/history/RecordsTable';
import AppLoader from "@/components/app/AppLoader";
import {onMounted, ref, computed} from "vue";
import {useStore} from "vuex";


const store = useStore();

const isLoading = ref(true);
const records = ref();


onMounted(async () => {
  const recs = await store.dispatch('fetchRecords');
  const categories = await store.dispatch('fetchCategories');
  if (recs) {
    recs.map(record => {
      record.category = categories.find(category => category.id === record.categoryId).name;
      record.class = record.type === 'outcome' ? 'red' : 'green';
      record.typeDescr = record.type === 'outcome' ? 'Расход' : 'Доход';
      record.date = computed(() => {
        return new Intl.DateTimeFormat('ru-RU', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        }).format(new Date(record.created));
      });
    })
  }
  records.value = recs ?? [];
  isLoading.value = false;
});
</script>

<style scoped>

</style>
