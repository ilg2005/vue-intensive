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

defineProps(['state'])

const links = [
  {
    title: 'Счет',
    url: '/',
  },
  {
    title: 'История',
    url: '/history',
  },
  {
    title: 'Планирование',
    url: '/planning',
  },
  {
    title: 'Новая запись',
    url: '/record',
  },
  {
    title: 'Категории',
    url: '/categories',
  },
];
</script>

<style scoped>

</style>
