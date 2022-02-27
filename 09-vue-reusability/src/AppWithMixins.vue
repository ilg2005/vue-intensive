<template>
  <div class="container">
    <app-alert
        v-if="alert"
        text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores, repellat."
        title="Внимание!"
        type="danger"
        closable
        @close="alert = false "
    ></app-alert>

    <div class="card">
      <button class="btn primary" @click="toggleAlert">{{ alert ? 'Скрыть' : 'Показать' }} сообщение</button>
    </div>

    <app-block></app-block>
  </div>
</template>

<script>
import AppAlert from "@/components/AppAlert";
import AppBlock from "@/components/AppBlock";
import AlertMixin from "@/AlertMixin";

export default {
  components: {AppAlert, AppBlock},
  mixins: [AlertMixin]

}
</script>

