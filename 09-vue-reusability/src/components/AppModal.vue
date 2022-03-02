<template>
  <div class="modal-backdrop" @click="$emit('closeModal')"></div>
  <div class="modal">
    <h3>Это заголовок модалки</h3>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus atque aut consequuntur facilis libero perspiciatis ullam. Dicta eveniet ipsam unde?</p>
  </div>
</template>

<script>
export default {
  name: "AppModal",
  emits: ['closeModal']
}
</script>

<style scoped>

</style>
