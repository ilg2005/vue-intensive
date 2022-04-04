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
    type: {
      type: String,
      required: true,
      validator(value) {
        return Object.keys(TextMap).includes(value);
      }
    }
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
