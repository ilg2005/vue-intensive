<template>
  <the-navbar></the-navbar>
  <div class="container with-nav">
    <AppMessage/>
    <router-view/>
  </div>
</template>

<script setup>
import TheNavbar from "../components/TheNavbar";
import AppMessage from "../components/ui/AppMessage";


</script>

<style scoped>

</style>
