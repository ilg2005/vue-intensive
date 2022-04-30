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
import {computed, defineProps} from "vue";
import {useStore} from "vuex";

defineProps(['state']);
const store = useStore();
const locale = computed(() => store.getters.USER.info.locale);
const i18n = computed(() => store.getters.TRANSLATION[locale.value]);

const links = [
  {
    title: i18n.value.account,
    url: '/',
  },
  {
    title: i18n.value.history,
    url: '/history',
  },
  {
    title: i18n.value.planning,
    url: '/planning',
  },
  {
    title: i18n.value.newRecord,
    url: '/record',
  },
  {
    title: i18n.value.categories,
    url: '/categories',
  },
];
</script>

<style scoped>

</style>
