<template>
  <div class="col s12 m6" v-if="cats.length">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="updateHandler" ref="updateForm">
        <AppLoader v-show="loading"/>
        <div class="input-field" v-show="!loading">
          <select ref="select"
                  v-model="current"
                  @change="updateFields"
          >
            <option value="" disabled>Выберите категорию</option>
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
              v-model.trim="editName"
              :class="{invalid: editNameError && editNameMeta.touched}"
              @blur="editNameBlur"
          >
          <label for="create_category_name" class="active">Название категории</label>
          <span class="helper-text invalid" v-if="editNameError && editNameMeta.touched">{{ editNameError }}</span>
        </div>

        <div class="input-field">
          <input
              id="create_category_limit"
              type="number"
              v-model="editLimit"
              :class="{invalid: editLimitError && editLimitMeta.touched}"
              @blur="editLimitBlur"
              :min="MIN"
          >
          <label for="create_category_limit" class="active">Лимит</label>
          <span class="helper-text invalid"
                v-if="editLimitError && editLimitMeta.touched && editLimit">{{ editLimitError }}</span>
          <span class="helper-text invalid"
                v-if="editLimitError && editLimitMeta.touched && !editLimit">Не менее {{ MIN }} рублей</span>
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
const current = ref('');

const fetchCategories = () => {
  store.dispatch('fetchCategories')
      .then((response) => {
        cats.value = response;
        loading.value = false;
      })
      .then(() => {
        selectInstance.value = M.FormSelect.init(select.value)
      });
}

onMounted(() => {
  fetchCategories();
})

onUnmounted(() => {
  if (selectInstance.value && selectInstance.value.destroy) {
    selectInstance.value.destroy();
  }
})

const updateFields = () => {
  if (current.value) {
    const category = cats.value.find(el => el.id === current.value);
    editName.value = category.name;
    editLimit.value = category.limit;
  }
}

const schema = computed(() => {
  return yup.object({
    editName: yup
        .string()
        .required('Введите новое название'),
    editLimit: yup
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
let {value: editName, errorMessage: editNameError, meta: editNameMeta, handleBlur: editNameBlur} = useField('editName');
let {
  value: editLimit,
  errorMessage: editLimitError,
  meta: editLimitMeta,
  handleBlur: editLimitBlur,
} = useField('editLimit');

const updateHandler = handleSubmit(async values => {
  try {
    values.id = current.value;
    await store.dispatch('updateCategory', values);
    fetchCategories();
    toast(`Изменена категория "${values.editName}"`);
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
