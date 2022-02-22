<template>
  <div class="container">
    <app-alert :alert="alert" @close="alert = null"></app-alert>

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
                       @delete="deletePerson"
      ></app-people-list>
    </div>
  </div>
</template>

<script>
import AppPeopleList from "@/components/AppPeopleList";
import AppAlert from "@/components/AppAlert";
import axios from 'axios'

export default {
  components: {AppPeopleList, AppAlert},

  mounted() {
    this.loadPeople()
  },

  data() {
    return {
      name: '',
      people: [],
      url: 'https://vue-with-http-c754b-default-rtdb.europe-west1.firebasedatabase.app/people.json',
      alert: null,
    }
  },
  methods: {
    async deletePerson(personID) {

      await axios.delete(`https://vue-with-http-c754b-default-rtdb.europe-west1.firebasedatabase.app/people/${personID}.json`)
      this.people = this.people.filter(objPerson => objPerson.id !== personID)

    },

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
      this.people.push({
        firstName: this.name,
        id: firebaseData.name
      })
      this.name = ''
    },

    async loadPeople() {
      try {
        const {data} = await axios.get(this.url)
        if (!data) {
          throw new Error('Список людей пуст')
        }
        this.people = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }))
      } catch (e) {
        this.alert = {
          type: 'danger',
          title: 'Ошибка!',
          text: e.message
        }
      }

    }
  }
}
</script>

<style>

</style>
