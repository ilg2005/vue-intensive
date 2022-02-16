<template>
  <div class="card">
    <h3> Новость </h3>
    <p v-if="isOpen">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto cumque ex, excepturi illum
      neque non quia similique tenetur vitae voluptatem. Accusantium adipisci doloremque magnam quod.</p>
    <button class="btn" @click="isOpen = !isOpen">Открыть</button>
  </div>
</template>

<script>
export default {
  name: "AppNews",
  data() {
    return {
      isOpen: false
    }
  }
}
</script>

<style scoped>

</style>
