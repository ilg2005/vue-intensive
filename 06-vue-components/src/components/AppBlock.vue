<template>
  <div class="card">
    <slot name="header"></slot>
    <slot>
      No text
    </slot>
    <slot name="footer"></slot>
  </div>
</template>

<script>
export default {
  name: "AppBlock"
}
</script>

<style scoped>

</style>
