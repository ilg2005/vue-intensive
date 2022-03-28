<template>
  <div class="modal-backdrop" @click="$emit('close')"></div>
  <div class="modal" v-if="!closed">
    <h3 v-if="title">{{ title }}</h3>

    <slot/>
  </div>
</template>

<script setup>
import {defineProps, defineEmits} from "vue";

defineProps({
  title: {
    type: String,
  }
});
defineEmits(['close']);
</script>

<style scoped>

</style>
