<template>
  <div class="container">
    <app-alert
        v-if="alert"
        text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores, repellat."
        title="Внимание!"
        @close="alert = false "
    ></app-alert>

    <div class="card">
      <button class="btn primary" @click="toggleAlert">{{ alert ? 'Скрыть' : 'Показать' }} сообщение</button>
    </div>
  </div>
</template>

<script>
import AppAlert from "@/components/AppAlert";
import AlertMixin from "@/AlertMixin";

export default {
  components: {AppAlert},
  mixins: [AlertMixin]

}
</script>

