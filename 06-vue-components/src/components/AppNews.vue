<template>
  <div class="card">
    <h3> {{ id }}. {{ title }} </h3>
    <p v-if="itemOpen"> {{ content }}</p>
    <button class="btn" @click="open">{{ itemOpen ? 'Закрыть' : 'Открыть' }}</button>
  </div>
</template>

<script>
export default {
  name: "AppNews",
  // props: ['title'],
  props: {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    id: {
      type: Number,
    },
    isOpen: {
      type: Boolean,
      required: false,
      default: false,
      validator(value) {
        return value === true || value === false
      }
    }
  },
  data() {
    return {
      itemOpen: false,
    }
  },
  methods: {
    open() {
      this.itemOpen = !this.itemOpen
      if (this.itemOpen) {
        this.$emit('open')
      }
    }
  }
}
</script>

<style scoped>

</style>
