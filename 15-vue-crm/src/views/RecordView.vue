<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <AppLoader v-if="loading"/>
    <p v-else-if="!cats.length">Категорий пока нет.
      <router-link to="/categories"> Добавить новую категорию ?</router-link>
    </p>
    <form
        v-else
        class="form"
        @submit.prevent="submitForm"
    >
      <div class="input-field">
        <select ref="select"
                v-model="current"
        >
          <option value="" disabled>Выберите категорию</option>
          <option v-for="category in cats"
                  :key="category.id"
                  :value="category.id"
          >{{ category.name }}
          </option>
        </select>
      </div>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="income"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="outcome"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
            id="amount"
            type="number"
        >
        <label for="amount">Сумма</label>
        <span class="helper-text invalid">amount пароль</span>
      </div>

      <div class="input-field">
        <input
            id="description"
            type="text"
        >
        <label for="description">Описание</label>
        <span
            class="helper-text invalid">description пароль</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>

</template>

<script setup>
import M from "materialize-css";
import {ref, onMounted, onUnmounted} from "vue";
import {useStore} from "vuex";
import AppLoader from "@/components/app/AppLoader";

const store = useStore();
const select = ref();
const selectInstance = ref(null);
const current = ref('');
const loading = ref(true);

let cats = ref([]);


onMounted(() => {
  store.dispatch('fetchCategories')
      .then((response) => {
        cats.value = response;
        loading.value = false;
      })
      .then(() => {
        selectInstance.value = M.FormSelect.init(select.value)
      });
});

onUnmounted(() => {
  if (selectInstance.value && selectInstance.value.destroy) {
    selectInstance.value.destroy();
  }
})

const submitForm = () => {
  //TODO
};

</script>

<style scoped>

</style>
