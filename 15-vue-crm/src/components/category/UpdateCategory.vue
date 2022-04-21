<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form>
        <AppLoader v-show="loading"/>
        <div class="input-field" v-show="!loading">
          <select ref="select">
            <option value="" disabled selected>Выберите категорию</option>
            <option v-for="category in cats"
                    :key="category.id"
                    :value="category.id"
            >{{ category.name }}
            </option>
          </select>
        </div>

        <div class="input-field">
          <input type="text" id="name">
          <label for="name">Название</label>
          <span class="helper-text invalid">TITLE</span>
        </div>

        <div class="input-field">
          <input
              id="limit"
              type="number"
          >
          <label for="limit">Лимит</label>
          <span class="helper-text invalid">LIMIT</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref} from 'vue';
import M from 'materialize-css';
import {useStore} from "vuex";
import AppLoader from "@/components/app/AppLoader";

const store = useStore();
const select = ref();
const loading = ref(true);

let cats = ref();


onMounted(() => {
    store.dispatch('fetchCategories')
    .then((response) => {
      cats.value = response;
      console.log('response: ', response);
      loading.value = false;
    })
    .then(() => M.FormSelect.init(select.value));
})


</script>

<style scoped>

</style>
