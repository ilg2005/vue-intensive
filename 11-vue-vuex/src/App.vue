<template>
  <the-navbar></the-navbar>
  <div class="container with-nav">
    <div class="card">
      <h1>Про Vuex</h1>
      <h2>Счетчик {{ counter }} ({{ doubleCounter }})</h2>
      <button class="btn primary" @click="add(1)">Добавить</button>
      <button class="btn danger" @click="incrementAsync(10)">Добавить 10</button>
    </div>
  </div>
</template>

<script>
import TheNavbar from './TheNavbar'
import {mapGetters, mapMutations, mapActions} from 'vuex'

export default {
  components: {TheNavbar},
  computed: {
    ...mapGetters(['counter', 'doubleCounter'])
  },
  methods: {
    ...mapMutations(['add']),
    ...mapActions(['incrementAsync'])
  }
}
</script>
