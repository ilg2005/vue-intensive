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
import {ref, computed} from "vue";
import {useStore} from "vuex";

const store = useStore();
const update = ref(0);
const locale = computed(() => store.getters.USER.info.locale);
const i18n = computed(() => store.getters.TRANSLATION[locale.value]);

</script>

<style scoped>

</style>
