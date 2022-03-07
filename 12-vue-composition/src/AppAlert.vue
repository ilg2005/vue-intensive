<template>
<div class="alert" :class="type" @click="$emit('close')">
  <p class="alert-title"> {{ alertTitle }}</p>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
</div>
</template>

<script>
export default {
  name: "AppAlert",
  props: ['alertTitle', 'type'],
  emits: ['close']
}
</script>

<style scoped>

</style>
