<template>
  <the-navbar></the-navbar>
  <div class="container with-nav">
    <div class="card">
      <h1>Про Vuex</h1>
      <h2>Счетчик {{ $store.getters.counter }} ({{ $store.getters.doubleCounter }})</h2>
      <button class="btn primary" @click="add">Добавить</button>
      <button class="btn danger" @click="incrementAsync">Добавить 10</button>
    </div>
  </div>
</template>

<script>
import TheNavbar from './TheNavbar'
export default {
  components: {TheNavbar},
  methods: {
    add() {
      this.$store.commit({
        type: 'add',
        value: 1
      })
    },
    incrementAsync() {
      this.$store.dispatch('incrementAsync', 10)
    }
  }
}
</script>
