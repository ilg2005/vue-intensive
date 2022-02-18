<template>
  <div>
    <button :class="['btn', color]"
            @click="$emit('action')"
    ><slot/></button>
  </div>
</template>

<script>
export default {
  name: 'AppButton',
  emits: {
    'action': null
  },
  props: {
    color: {
      type: String,
      required: false,
      default: '',
      validator(value) {
        return ['', 'primary', 'danger'].includes(value)
      }
    }
  }
}
</script>

<style scoped>

</style>
