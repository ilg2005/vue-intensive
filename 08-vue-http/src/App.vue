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
   async createPerson() {
      const url = 'https://vue-with-http-c754b-default-rtdb.europe-west1.firebasedatabase.app/people.json'
     const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: this.name
        })
      })

     const firebaseData =await response.json()
     console.log(firebaseData)
     this.name = ''

    }
  }
}
</script>

<style>

</style>
