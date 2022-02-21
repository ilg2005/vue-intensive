<template>
  <div class="container">
    <form class="card" @submit.prevent="createPerson">
      <h2>Работа с базой данных</h2>
      <div class="form-control">
        <label for="name">Введите имя</label>
        <input type="text" id="name" v-model="name">
      </div>
      <button class="btn primary" :disabled="!name.length">Создать</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
    }
  },
  methods: {
    createPerson() {
      console.log('name: ', this.name)
      // https://vue-with-http-c754b-default-rtdb.europe-west1.firebasedatabase.app/
    }
  }
}
</script>

<style>

</style>
