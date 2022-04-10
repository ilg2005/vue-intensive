<template>
  <div class="sidebar" v-if="sidebar">
    <span class="sidebar-close" @click="closeSidebar">&times;</span>
    <div class="sidebar-content">
      <p> Добро пожаловать в систему учета заявок! Здесь Вы найдете всю необходимую информацию про систему и заявки</p>
    </div>
  </div>
</template>

<script setup>
import {useStore} from "vuex";
import {computed} from "vue";

const store = useStore();
const sidebar = computed(() => store.state.sidebar);
const closeSidebar = () => store.commit('CLOSE_SIDEBAR');

</script>

<style scoped>

</style>
