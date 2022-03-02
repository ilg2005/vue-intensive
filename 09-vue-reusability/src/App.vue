<template>
  <div class="container">
    <div class="card">
      <h2> {{ $i18n('app.title') }}</h2>
      <button class="btn" @click="changeLang">{{ $i18n('app.changeBtn') }}</button>
    </div>
    <button class="btn" @click="$alert('Плагин работает!')">Alert</button>
    <button class="btn primary" @click="modal = true">Открыть модалку</button>
    <teleport to="#modal">
      <app-modal
          v-if="modal"
          @close-modal="modal = false"
      ></app-modal>
    </teleport>
  </div>
</template>

<script>
import AppModal from "@/components/AppModal";

export default {
  inject: ['changeI18n'],
  components: {AppModal},
  data() {
    return {
      isRussian: true,
      modal: false
    }
  },

  methods: {
    changeLang() {
      let locale = this.isRussian ? 'en' : 'ru'
      this.changeI18n(locale)
      this.isRussian = !this.isRussian
      this.$forceUpdate()
    }
  }

}
</script>

<style scoped>

</style>
