<template>
    <div class="badge" :class="ClassMap[type]">
      {{ TextMap[type] }}</div>
</template>

<script>
export const TextMap = {
  active: 'активна',
  cancelled: 'отменена',
  pending: 'выполняется',
  done: 'завершена',
};

export default {
  props: {
    type: String,
  },

  setup() {
    const ClassMap = {
      active: 'primary',
      cancelled: 'danger',
      pending: 'warning',
      done: 'primary',
    };

    return {TextMap, ClassMap}
  },
};
</script>

<style scoped>

</style>
