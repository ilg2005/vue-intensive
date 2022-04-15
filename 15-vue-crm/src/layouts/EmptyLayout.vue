<template>
  <div class="grey darken-1 empty-layout">
    <router-view/>
  </div>
</template>

<script setup>
import messages from "@/utils/messages";
import {computed, watch} from "vue";
import {useStore} from "vuex";
import {toast} from "@/utils/toast";

const store = useStore();
const error = computed(() => store.getters.ERROR);
watch(error, (newError) => {
  if (messages[newError.code]) {
    return toast(messages[newError.code], newError);
  } else {
    return toast(newError.message, newError);
  }
});
</script>

<style scoped>

</style>
