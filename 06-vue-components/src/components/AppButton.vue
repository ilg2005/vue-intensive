<template>
    <button :class="['btn', color]"
            @click="$emit('action')"
    ><slot/></button>
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
  },
  methods: {
    btnLog() {
      console.log('Button log')
    }
  }
}
</script>

<style scoped>
</style>
