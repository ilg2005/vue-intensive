<template>
  <div class="container">
    <div class="card">
      <h2> {{ $i18n('app.title') }}</h2>
      <button class="btn" @click="changeLang">{{ $i18n('app.changeBtn')}}</button>
    </div>
    <button class="btn" @click="$alert('Плагин работает!')">Alert</button>
  </div>
</template>

<script>
export default {
  inject: ['changeI18n'],
  data() {
    return {
      isRussian: true
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
