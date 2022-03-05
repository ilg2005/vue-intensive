<template>
  <header class="navbar">
    <strong>Счетчик: {{ counter }}</strong>
    <button class="btn primary" @click="addFive">Добавить 5</button>
  </header>
</template>

<script>
import {mapGetters, mapMutations} from'vuex'
export default {
  computed: {
    ...mapGetters(['counter'])
  },
  methods: {
    ...mapMutations(['add']),
    addFive() {
      this.add(5)
    }

  }

}
</script>
