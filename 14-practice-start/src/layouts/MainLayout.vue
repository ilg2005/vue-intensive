<template>
  <the-navbar/>
  <the-sidebar/>
  <div class="container with-nav">
    <AppMessage/>
    <router-view/>
  </div>
</template>

<script setup>
import TheNavbar from "../components/TheNavbar";
import TheSidebar from "../components/TheSidebar";
import AppMessage from "../components/ui/AppMessage";

</script>

<style scoped>

</style>
