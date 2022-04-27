<template>
  <div class="app-main-layout">


    <TheNavbar @sidebar-state="isOpen = !isOpen" :username="username"/>

    <TheSidebar :state="isOpen"/>


    <main :class="['app-content', {full: !isOpen}]">
      <AppLoader v-if="isLoading"/>
      <div class="app-page" v-else>
        <router-view/>
      </div>
    </main>

    <div class="fixed-action-btn" v-tooltip="'Создать запись'">
      <router-link class="btn-floating btn-large blue" to="/record">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import TheNavbar from "@/components/app/TheNavbar";
import TheSidebar from "@/components/app/TheSidebar";
import {computed, onMounted, ref, watch,} from "vue";
import {useStore} from "vuex";
import AppLoader from "@/components/app/AppLoader";
import messages from "@/utils/messages";
import {toast} from "@/utils/toast";

const isOpen = ref(true);

const store = useStore();

const isLoading = ref(true);

const user = computed(() => store.getters.USER);

const username = computed(() => user.value ? user.value.info.username : '');

const error = computed(() => store.getters.ERROR);
watch(error, (newError) => {
  if (messages[newError.code]) {
    return toast(messages[newError.code], newError);
  } else {
    return toast(newError.message, newError);
  }
});

watch(username, () => {
  isLoading.value = false;
});

onMounted(async () => {
  await store.dispatch('fetchInfo');
});

</script>

<style scoped>

</style>
