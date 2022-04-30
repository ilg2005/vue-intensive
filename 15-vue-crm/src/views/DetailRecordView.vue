<template>
  <Teleport to="head">
    <title>{{ i18n.recordsHistory }} | {{ i18n.homeBanking }}</title>
  </Teleport>

  <AppLoader v-if="isLoading"/>
  <div v-else-if="record">
    <div>
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{ i18n.history }}</router-link>
        <a class="breadcrumb" @click.prevent>
          {{ record.type === 'outcome' ? i18n.outcome : i18n.income }}
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
              <p>{{ i18n.description }}: {{ record.description }}</p>
              <p>{{ i18n.amount }}: {{ currencyFilter(record.amount, 'RUB') }}</p>
              <p>{{ i18n.category }}: {{ category.name }}</p>

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
import {onMounted, ref, computed} from "vue";
import {toast} from "@/utils/toast";
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import AppLoader from "@/components/app/AppLoader";
import currencyFilter from "@/utils/currencyFilter";
import dateFilter from "@/utils/dateFilter";

const store = useStore();
const locale = computed(() => store.getters.USER.info.locale);
const i18n = computed(() => store.getters.TRANSLATION[locale.value]);
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
