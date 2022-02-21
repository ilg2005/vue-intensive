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
    <hr>
    <div class="card">
      <app-people-list :people="people"
                       @load="loadPeople"
      ></app-people-list>
    </div>
  </div>
</template>

<script>
import AppPeopleList from "@/components/AppPeopleList";
import axios from 'axios'

export default {
  components: {AppPeopleList},
  data() {
    return {
      name: '',
      people: [],
      url: 'https://vue-with-http-c754b-default-rtdb.europe-west1.firebasedatabase.app/people.json',
    }
  },
  methods: {

    async createPerson() {

      const response = await fetch(this.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: this.name
        })
      })

      const firebaseData = await response.json()
      console.log(firebaseData)
      this.name = ''

    },
    async loadPeople() {

      const {data} = await axios.get(this.url)
      this.people = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }))

      console.log(this.people)

    }
  }
}
</script>

<style>

</style>
