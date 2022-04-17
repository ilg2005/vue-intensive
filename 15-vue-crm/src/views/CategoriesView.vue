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

<script>
import CreateCategory from "@/components/category/CreateCategory";
import UpdateCategory from "@/components/category/UpdateCategory";

export default {
  name: "CategoriesView",
  components: {UpdateCategory, CreateCategory}
}
</script>

<style scoped>

</style>
