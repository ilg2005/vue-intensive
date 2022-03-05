<template>
  <header class="navbar">
    <strong>Счетчик: {{ counter }}</strong>
    <button class="btn primary" @click="$store.commit('add', 5)">Добавить</button>
  </header>
</template>

<script>
  export default {
computed: {
  counter() {
    return this.$store.getters.counter
  }
}

  }
</script>
