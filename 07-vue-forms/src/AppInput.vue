<template>
  <div class="form-control">
    <label :for="id">{{ label }}</label>
    <input
        type="text"
        :id="id"
        :value="modelValue"
        @input="change"
        :placeholder="placeholder"
        :class="error && !modelValue.length ? 'invalid' : ''"
    >
    <small v-if="error && !modelValue.length ">{{ error }}</small>
  </div>

</template>

<script>
export default {
  name: "AppInput",
  emits: ['update:modelValue'],
  props: {
    placeholder: String,
    error: String,
    label: String,
    modelValue: String

  },
  data() {
    return {
      id: 'input-' + Math.random()
    }
  },
  methods: {
    change(evt) {
      this.$emit('update:modelValue', evt.target.value)
    }
  }
}
</script>

<style scoped>

</style>