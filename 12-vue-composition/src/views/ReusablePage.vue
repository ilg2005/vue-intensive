<template>
  <div class="card">
    <h1>Переиспользование</h1>
    <button class="btn primary">Показать сообщение</button>
    <button class="btn" @click="navigate">Перейти на главную</button>
  </div>
</template>

<script>
import {useRouter, useRoute} from 'vue-router'

export default {
  name: "ReusablePage",
  setup() {
    const router = useRouter()
    const route = useRoute()

    console.log('route.path: ', route.path)

    const navigate = () => {
      console.log('route: ', route)
      router.push('/')
    }
    return {
      navigate
    }
  }
}
</script>

<style scoped>

</style>
