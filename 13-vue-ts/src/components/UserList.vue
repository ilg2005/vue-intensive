<template>
<ul class="list">
  <li
    class="list-item"
    v-for="user in users"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
</template>

<script setup lang="ts">
const users = [];
</script>

<style scoped>

</style>
