<template>
  <div class="card">
    <p>Название: <strong>{{ name }}</strong></p>
    <p>Версия: <strong>{{ version }} ({{ doubleVersion }})</strong></p>

    <button class="btn danger" @click="changeToThree">Изменить на 3-ю версию</button>
  </div>
</template>

<script>
import {computed, inject, onBeforeMount, onMounted, onBeforeUpdate, onUpdated} from "vue";

export default {
  emits: ['changeVersion'],
  setup(props, context) {

    onBeforeMount(() => console.log('beforeMount'))
    onMounted(() => console.log('onMounted'))
    onBeforeUpdate(() => console.log('onBeforeUpdate'))
    onUpdated(() => console.log('onUpdated'))

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
