<template>
  <div class="app-loader">
    <div class="preloader-wrapper active"
         :class="size"
    >
      <div :class="['spinner-layer', color]">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div>
        <div class="gap-patch">
          <div class="circle"></div>
        </div>
        <div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, defineProps} from "vue";

const props = defineProps(['spinner', 'size']);

const colors = [
  'spinner-red-only',
  'spinner-blue-only',
  'spinner-green-only'
];

const color = props.spinner ?? computed(() => colors[Math.floor(Math.random() * 3)]);


</script>

<style scoped>

</style>
