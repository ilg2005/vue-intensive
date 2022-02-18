<template>
  <div class="card">
    <h3> {{ id }}. {{ title }} </h3>
    <app-button @action="open">{{ itemOpen ? 'Закрыть' : 'Открыть' }}</app-button>
    <div v-if="itemOpen">
      <hr>
      <p> {{ content }}</p>
      <app-button v-if="!wasRead" color="primary" @action="mark">Прочесть новость</app-button>
      <app-button color="danger" v-if="wasRead" @action="$emit('unmark', id)">Отметить непрочитанной</app-button>

    </div>
  </div>
</template>

<script>
import AppButton from "@/components/AppButton";
export default {
  name: "AppNews",
  components: {AppButton},
  // props: ['title'],
  props: {
    wasRead: Boolean,
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
  emits: {
    open: null,
    unmark: null,
    'read-news'(id) {
      if (id) {
        return true
      }
      console.warn('Нет параметра id для emit read-news')
      return false
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
    },
    mark() {
      this.itemOpen = false
      this.$emit('read-news', this.id)
    },
/*
    unmark() {
      this.$emit('unmark', this.id)

    }
*/
  }
}
</script>

<style scoped>

</style>
