<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <AppLoader v-if="loading"/>
      <div class="row" v-else>
        <CreateCategory/>
        <UpdateCategory/>
      </div>
    </section>
  </div>

</template>

<script setup>
import CreateCategory from "@/components/category/CreateCategory";
import UpdateCategory from "@/components/category/UpdateCategory";
import {onMounted, ref} from "vue";
import AppLoader from "@/components/app/AppLoader";
import {useStore} from "vuex";

const loading = ref(true);

const store = useStore();

onMounted(() => {
  setTimeout(async () => {
    const categories = await store.dispatch('fetchCategories');
    console.log(categories);
    loading.value = false;
  }, 1000)

})

</script>

<style scoped>

</style>
