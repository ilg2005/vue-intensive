<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <AppLoader v-if="isLoading"/>
    <p v-else-if="!allRecords.length" class="center">
      Записей пока нет.
      <router-link to="/record">Добавить первую?</router-link>
    </p>
    <div v-else>
      <div class="history-chart">
        <canvas></canvas>
      </div>

      <section>
        <RecordsTable :records="records"/>
        <Paginate
            v-model="page"
            :page-count="pageCount"
            :page-range="pageSize"
            :margin-pages="2"
            :click-handler="clickCallback"
            :prev-text="'Назад'"
            :next-text="'Вперед'"
            :container-class="'pagination'"
            :page-class="'waves-effect'"
        />
      </section>
    </div>
  </div>

</template>

<script setup>
import RecordsTable from '@/components/history/RecordsTable';
import AppLoader from "@/components/app/AppLoader";
import Paginate from "vuejs-paginate-next";
import {onMounted, ref, computed, watch} from "vue";
import {useStore} from "vuex";
import dateFilter from "@/utils/dateFilter";
import {useRoute, useRouter} from "vue-router";
import _ from 'lodash';


const store = useStore();

const isLoading = ref(true);
const allRecords = ref();
const records = ref();

const router = useRouter();
const route = useRoute();
const page = ref();

const pageSize = 3;
const pageCount = ref(0);

const clickCallback = pageNum => {
  page.value = pageNum;
}

onMounted(async () => {
  const recs = await store.dispatch('fetchRecords');
  const categories = await store.dispatch('fetchCategories');
  if (recs) {
    recs.map(record => {
      record.category = categories.find(category => category.id === record.categoryId).name;
      record.class = record.type === 'outcome' ? 'red' : 'green';
      record.typeDescr = record.type === 'outcome' ? 'Расход' : 'Доход';
      record.date = computed(() => dateFilter(record.created));
    })
  }
  allRecords.value = recs ?? [];

  page.value = +route.query.page ?? 1;
  isLoading.value = false;
});

watch(page, () => {
  router.push(`?page=${page.value}`);

  const dividedArray = _.chunk(allRecords.value, pageSize);
  pageCount.value = dividedArray.length;

  if (!dividedArray[page.value - 1]) {
    page.value = 1;
  }

  records.value = dividedArray[page.value - 1]
})

</script>

<style scoped>

</style>
