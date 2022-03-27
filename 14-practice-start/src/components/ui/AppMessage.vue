<template>
  <div v-if="message" :class="['alert', message.type]">
    <p class="alert-title" v-if="title">{{ title }}</p>
    <p>{{ message.value }}</p>
    <span class="alert-close" @click="close">&times;</span>
  </div>

</template>

<script setup>
import {useStore} from "vuex";
import {computed} from "vue";

const store = useStore();
const message = computed(() => store.getters.message);

const TITLE_MAP = {
  primary: 'Успешно!',
  danger: 'Ошибка!',
  warning: 'Внимание!'
}

const title = computed(() => message.value ? TITLE_MAP[message.value.type] : '');

function close() {
  store.commit('CLEAR_MESSAGE');
}

</script>

<style scoped>

</style>
