<template>
  <ul class="sidenav app-sidenav" :class="{open: state}">
    <router-link
        v-for="link in links"
        :key="link.title"
        :to="link.url"
        custom
        v-slot="{ href, navigate, isActive  }"
    >
      <li
          :class="[isActive && 'active']"
      >
        <a :href="href" @click="navigate" class="waves-effect waves-orange pointer">{{ link.title }}</a>
      </li>

    </router-link>
  </ul>

</template>

<script setup>
import {defineProps} from "vue";
import {useStore} from "vuex";

defineProps(['state']);
const store = useStore();
const i18n = store.getters.TRANSLATION;

const links = [
  {
    title: i18n.account,
    url: '/',
  },
  {
    title: i18n.history,
    url: '/history',
  },
  {
    title: i18n.planning,
    url: '/planning',
  },
  {
    title: i18n.newRecord,
    url: '/record',
  },
  {
    title: i18n.categories,
    url: '/categories',
  },
];
</script>

<style scoped>

</style>
