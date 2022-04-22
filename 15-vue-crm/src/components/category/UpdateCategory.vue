<template>
  <div class="col s12 m6" v-if="cats.length">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="updateHandler" ref="updateForm">
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

        <div class="input-field cat-name">
          <input
              id="create_category_name"
              type="text"
              v-model.trim="name"
              :class="{invalid: nameError && nameMeta.touched}"
              @blur="nameBlur"
          >
          <label for="create_category_name"  class="active">Название категории</label>
          <span class="helper-text invalid" v-if="nameError && nameMeta.touched">{{ nameError }}</span>
        </div>

        <div class="input-field">
          <input
              id="create_category_limit"
              type="number"
              :value="MIN"
              @input="limit = $event.target.value"
              :class="{invalid: limitError && limitMeta.touched}"
              @blur="limitBlur"
              :min="MIN"
          >
          <label for="create_category_limit" class="active">Лимит</label>
          <span class="helper-text invalid" v-if="limitError && limitMeta.touched && limit">{{ limitError }}</span>
          <span class="helper-text invalid"
                v-if="limitError && limitMeta.touched && !limit">Не менее {{ MIN }} рублей</span>
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
import {onMounted, ref, computed, onUnmounted} from 'vue';
import M from 'materialize-css';
import {useStore} from "vuex";
import AppLoader from "@/components/app/AppLoader";
import * as yup from "yup";
import {useField, useForm} from "vee-validate";
import {toast} from "@/utils/toast";

const store = useStore();
const select = ref();
const loading = ref(true);

const updateForm = ref(null);

let cats = ref([]);
const MIN = 500;

const selectInstance = ref(null);

onMounted(() => {
  store.dispatch('fetchCategories')
      .then((response) => {
        cats.value = response;
        console.log('response: ', response);
        loading.value = false;
      })
      .then(() => {
        selectInstance.value = M.FormSelect.init(select.value)
      });
})

onUnmounted( () => {
  if(selectInstance.value && selectInstance.value.destroy) {
    selectInstance.value.destroy();
  }
})

const schema = computed(() => {
  return yup.object({
    name: yup
        .string()
        .required('Введите название категории'),
    limit: yup
        .number()
        .integer()
        .min(MIN, `Не менее ${MIN} рублей.`),
  });
});

// Create a form context with the validation schema
const {handleSubmit} = useForm({
  validationSchema: schema,
});

// No need to define rules for fields
let {value: name, errorMessage: nameError, meta: nameMeta, handleBlur: nameBlur} = useField('name');
let {
  value: limit,
  errorMessage: limitError,
  meta: limitMeta,
  handleBlur: limitBlur,
} = useField('limit');

const updateHandler = handleSubmit(async values => {
  values.limit = values.limit ? +values.limit : MIN;
  try {
    await store.dispatch('updateCategory', values);
    // defineEmits(['created']);
    toast(`Изменена категория "${values.name}"`);
    updateForm.value.reset();
  } catch (e) {
    console.log(e.message);
  }

});
</script>

<style scoped>
.cat-name {
  margin-top: 23px;
}
</style>
