<template>
  <div class="container">
    <form class="card" @submit.prevent="submitHandler">
      <h1>Анкета на Vue разработчика!</h1>

      <app-input label="Как тебя зовут?"
                 placeholder="Введи имя"
                 :error="errors.nameInput"
                 v-model.trim="nameInput"
      ></app-input>

      <div class="form-control">
        <label for="name">Как тебя зовут?</label>
        <input
            type="text"
            id="name"
            v-model.trim="name"
            placeholder="Введи имя"
            :class="errors.name && !this.name.length ? 'invalid' : ''"
        >
        <small v-if="errors.name && !this.name.length">{{ errors.name }}</small>
      </div>

      <div class="form-control">
        <label for="age">Выбери возраст</label>
        <input
            type="number"
            id="age"
            v-model.number="age"
        >
      </div>

      <div class="form-control">
        <label for="city">Твой город</label>
        <select id="city"
                v-model="city"
        >
          <option value="spb">Санкт-Петербург</option>
          <option value="msk">Москва</option>
          <option value="kzn">Казань</option>
          <option value="nsk">Новосибирск</option>
        </select>
      </div>

      <div class="form-checkbox">
        <span class="label">Готов к переезду в Токио?</span>
        <div class="checkbox">
          <label><input type="radio" name="trip" v-model="relocate" value="yes"/> Да</label>
        </div>

        <div class="checkbox">
          <label><input type="radio" name="trip" v-model="relocate" value="no"/> Нет</label>
        </div>
      </div>

      <div class="form-checkbox">
        <span class="label">Что знаешь во Vue?</span>
        <div class="checkbox">
          <label><input type="checkbox" v-model="skills" value="vuex" name="skills"/> Vuex</label>
        </div>
        <div class="checkbox">
          <label><input type="checkbox" v-model="skills" value="cli" name="skills"/> Vue CLI</label>
        </div>
        <div class="checkbox">
          <label><input type="checkbox" v-model="skills" value="router" name="skills"/> Vue Router</label>
        </div>
      </div>
      <div class="form-checkbox">
        <span class="label">Правила компании</span>
        <div class="checkbox">
          <label><input type="checkbox" v-model="agree"/> Согласен с правилами компании</label>
        </div>
      </div>

      <button type="submit" class="btn primary">Отправить</button>
    </form>
  </div>
</template>

<script>
import AppInput from "./AppInput";

export default {
  components: {AppInput},
  data() {
    return {
      name: '',
      nameInput: '',
      age: 23,
      city: 'msk',
      relocate: 'yes',
      skills: [],
      agree: false,
      errors: {
        name: null,
        nameInput: null,
      }
    }
  },
  methods: {
    isFormValid() {
      let isValid = true
      if (this.name.length === 0) {
        this.errors.name = 'Имя должно быть заполнено'
        isValid = false;
      } else {
        this.errors.name = null
      }

      if (this.nameInput.length === 0) {
        this.errors.nameInput = 'Имя должно быть заполнено'
        isValid = false;
      } else {
        this.errors.nameInput = null
      }

      return isValid
    },
    submitHandler() {
      if (this.isFormValid()) {
        console.group('Form Data:')
        console.log('name from AppInput: ', this.nameInput)
        console.log('name: ', this.name)
        console.log('age: ', this.age)
        console.log('city: ', this.city)
        console.log('Relocation: ', this.relocate)
        console.log('skills: ', this.skills)
        console.log('agree: ', this.agree)
        console.groupEnd()
      }
    }
  }
}
</script>

<style>
small {
  color: red;
}

.form-control input.invalid {
  border-color: #e53935;
}
</style>
