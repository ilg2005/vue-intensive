<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <CreateCategory/>
        <UpdateCategory/>
      </div>
    </section>
  </div>

</template>

<script setup>
import CreateCategory from "@/components/category/CreateCategory";
import UpdateCategory from "@/components/category/UpdateCategory";

</script>

<style scoped>

</style>
