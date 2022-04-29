<template>
  <div>
    <div class="page-title">
      <h3>{{ i18n.categories }}</h3>
    </div>
    <section>
      <div class="row">
        <CreateCategory @created="update++" :key="update"/>
        <UpdateCategory :key="update"/>
      </div>
    </section>
  </div>

</template>

<script setup>
import CreateCategory from "@/components/category/CreateCategory";
import UpdateCategory from "@/components/category/UpdateCategory";
import {ref} from "vue";
import {useStore} from "vuex";

const update = ref(0);
const i18n = useStore().getters.TRANSLATION;

</script>

<style scoped>

</style>
