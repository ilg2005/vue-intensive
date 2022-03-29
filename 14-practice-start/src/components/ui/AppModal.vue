<template>
  <div class="modal-backdrop" @click="closeModal"></div>
  <div class="modal" v-if="!closed">
    <h3 v-if="title">{{ title }}</h3>

    <slot/>
  </div>
</template>

<script setup>
import {defineProps, defineEmits} from "vue";

const closed = false;
defineProps({
  title: {
    type: String,
  }
});
const emit = defineEmits(['close']);
const closeModal = () => {
  emit('close');
}
</script>

<style scoped>

</style>
