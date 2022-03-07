<template>
  <div class="card">
    <p>Название: <strong>{{ name }}</strong></p>
    <p>Версия: <strong>{{ version }} ({{ doubleVersion }})</strong></p>

    <button class="btn danger" @click="changeVersion">Изменить на 3-ю версию</button>
  </div>
</template>

<script>
import {computed} from "vue";

export default {
  props: ['name', 'version'],
  emits: ['changeVersion'],
  setup(props, context) {
    console.log(context)
    const doubleVersion = computed(() => props.version * 2)

    const changeVersion = () => {
      context.emit('changeVersion', 3)
    }

    return {
      doubleVersion,
      changeVersion
    }
  }
}
</script>

<style scoped>

</style>
