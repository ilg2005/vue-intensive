<template>
  <div v-if="email">
    <h2>{{ email.theme }}</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias beatae consectetur dicta id incidunt omnis
      placeat tenetur ullam unde vitae.</p>
    <div style="margin-bottom: 1rem">
      <button class="btn" @click="$router.push('/dashboard')">Закрыть</button>
    </div>
  </div>
  <div v-else>
    <h4>Выберите письмо</h4>
  </div>
</template>

<script>
export default {
  inject: ['emails'],
  props: ['mailId'],
  computed: {
    email() {
      return this.emails.find((e) => e.id === +this.mailId)
    }
  }
}
</script>

<style scoped>

</style>
