<template>
  <div class="container pt-1">
    <div class="card">
      <h2>Динамические и асинхронные компоненты</h2>

      <app-button
          :color="active === 'one' ? 'primary' : ''"
          @action="active = 'one'"
      >One</app-button>
      <app-button
          :color="active === 'two' ? 'primary' : ''"
          @action="active = 'two'"
      >Two</app-button>
    </div>
    <component :is="componentName"></component>
  </div>
</template>

<script>
import AppButton from "@/components/AppButton";
import AppTextOne from "@/components/AppTextOne";
import AppTextTwo from "@/components/AppTextTwo";
export default {
  components: {AppButton, AppTextOne, AppTextTwo},
  data() {
    return {
      active: 'one',
    }
  },
  computed: {
    componentName() {
      return 'app-text-' + this.active
    }
  }
}
</script>

<style scoped>

</style>
