<template>
  <app-alert
      alert-title="Работаем с Composition"
      type="primary"
      v-if="alert"
      @close="close"
  ></app-alert>
  <div class="card">
    <h1>Переиспользование</h1>

    <button class="btn primary" @click="toggle">{{ alert ? 'Скрыть' : 'Показать'}} сообщение</button>
    <button class="btn" @click="navigate">Перейти на главную</button>
  </div>
</template>

<script>
import {useRouter, useRoute} from 'vue-router'
import AppAlert from "@/AppAlert";
import {useAlert} from "@/use/alert";

export default {
  name: "ReusablePage",
  components: { AppAlert },

  setup() {
    const router = useRouter()
    const route = useRoute()

    console.log('route.path: ', route.path)

    //const {alert, toggle, close} = useAlert()


    const navigate = () => router.push('/')

    return {
      navigate,
      ...useAlert(true)
    }
  }
}
</script>

<style scoped>

</style>
