<template>
  <component :is="view">
    <router-view/>
  </component>

</template>

<script setup>
import EmptyLayout from "@/layouts/EmptyLayout";
import MainLayout from "@/layouts/MainLayout";

import {useRoute} from 'vue-router';
import {computed} from "vue";

const route = useRoute();

const view = computed(() => route.meta.layout === 'main' ? MainLayout : EmptyLayout);
</script>

<style>
</style>
