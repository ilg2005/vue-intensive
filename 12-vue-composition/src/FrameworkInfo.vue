<template>
  <div class="card">
    <p>Название: <strong>{{ name }}</strong></p>
    <p>Версия: <strong>{{ version }} ({{ doubleVersion }})</strong></p>

    <button class="btn danger" @click="changeToThree">Изменить на 3-ю версию</button>
  </div>
</template>

<script>
import {computed, inject} from "vue";

export default {
  emits: ['changeVersion'],
  setup(props, context) {
    console.log(context)

    const version = inject('version')

    const changeToThree = () => context.emit('changeVersion', 3)


    return {
      name: inject('name'),
      version,
      doubleVersion: computed(() => version.value * 2),
      changeToThree
    }
  }
}
</script>

<style scoped>

</style>
