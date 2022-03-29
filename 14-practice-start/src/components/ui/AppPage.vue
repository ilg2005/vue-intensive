<template>
  <div class="card">
    <h1 class="card-title">
      {{ title }}
      <slot name="header"/>
    </h1>
    <slot />
  </div>
</template>

<script setup>
import {defineProps} from "vue";

const props = defineProps({
  title: {
    title: String,
    required: true,
  }
});

document.title = `${props.title} | Клон Банка`;

</script>

<style scoped>

</style>
