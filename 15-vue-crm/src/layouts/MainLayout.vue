<template>
  <div class="app-main-layout">

    <TheNavbar @sidebar-state="isOpen = !isOpen"/>

    <TheSidebar :state="isOpen"/>

    <main :class="['app-content', {full: !isOpen}]">
      <div class="app-page">

        <router-view/>

      </div>
    </main>

    <div class="fixed-action-btn">
      <a class="btn-floating btn-large blue" href="#">
        <i class="large material-icons">add</i>
      </a>
    </div>
  </div>

</template>

<script setup>
import TheNavbar from "@/components/app/TheNavbar";
import TheSidebar from "@/components/app/TheSidebar";
import {ref} from "vue";

const isOpen = ref(true);

</script>

<style scoped>

</style>
