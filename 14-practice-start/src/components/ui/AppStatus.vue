<template>
  <div :class="['badge', ClassMap.type]">
    {{ TextMap.type }}
  </div>
</template>

<script>

</script>
<script setup>
import {defineProps} from "vue";

defineProps(['type']);



export const TextMap = {
  active: 'активна',
  cancelled: 'отменена',
  pending: 'выполняется',
  done: 'завершена',
}

const ClassMap = {
  active: 'primary',
  cancelled: 'danger',
  pending: 'warning',
  done: 'primary',
}

</script>

<style scoped>

</style>