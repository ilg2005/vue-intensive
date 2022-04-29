<template>
  <AppLoader v-if="isLoading"/>
  <div class="app-main-layout" v-else>

    <TheNavbar @sidebar-state="isOpen = !isOpen" :username="username"/>
    <TheSidebar :state="isOpen"/>

    <main :class="['app-content', {full: !isOpen}]">
      <div class="app-page">
        <router-view/>
      </div>
    </main>

    <div class="fixed-action-btn" v-tooltip="`${translation.createRecord}`">
      <router-link class="btn-floating btn-large blue" to="/record">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import TheNavbar from "@/components/app/TheNavbar";
import TheSidebar from "@/components/app/TheSidebar";
import {computed, onMounted, ref, watch} from "vue";
import {useStore} from "vuex";
import AppLoader from "@/components/app/AppLoader";
import messages from "@/utils/messages";
import {toast} from "@/utils/toast";

const isOpen = ref(true);

const store = useStore();

const isLoading = ref(true);

const user = computed(() => store.getters.USER);
const translation = computed(() => store.getters.TRANSLATION);

const username = computed(() => user.value ? user.value.info.username : '');


const error = computed(() => store.getters.ERROR);
watch(error, (newError) => {
  if (messages[newError.code]) {
    return toast(messages[newError.code], newError);
  } else {
    return toast(newError.message, newError);
  }
});

watch(translation,  () => {
    isLoading.value = false;
});

onMounted(async () => {
  try {
    await store.dispatch('fetchInfo');
  } catch (e) {
    toast(e.message, 1);
  }
});

</script>

<style scoped>

</style>
