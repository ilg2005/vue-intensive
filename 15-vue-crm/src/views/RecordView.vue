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
        novalidate
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

      <p class="mt-2">
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="income"
              v-model="picked"
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
              v-model="picked"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field mt-2">
        <input
            id="record_amount"
            type="number"
            :value="MIN"
            @input="amount = $event.target.value"
            :class="{invalid: amountError && amountMeta.touched}"
            @blur="amountBlur"
            :min="MIN"
        >
        <label for="record_amount" class="active">Сумма</label>
        <span class="helper-text invalid"
              v-if="amountError && amountMeta.touched && amount">{{ amountError }}</span>
        <span class="helper-text invalid"
              v-if="amountError && amountMeta.touched && !amount">Не менее {{ MIN }} рубля</span>
      </div>

      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model.trim="description"
            :class="{invalid: descriptionError && descriptionMeta.touched}"
            @blur="descriptionBlur"
        >
        <label for="description">Описание</label>
        <span class="helper-text invalid" v-if="descriptionError && descriptionMeta.touched">{{ descriptionError }}</span>
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
import {ref, computed, onMounted, onUnmounted} from "vue";
import {useStore} from "vuex";
import AppLoader from "@/components/app/AppLoader";
import * as yup from "yup";
import {useField, useForm} from "vee-validate";
import {toast} from "@/utils/toast";

const store = useStore();
const select = ref();
const selectInstance = ref(null);
const current = ref('');
const loading = ref(true);
const picked = ref('income');
const MIN = 1;

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

const schema = computed(() => {
  return yup.object({
    description: yup
        .string()
        .required('Введите описание'),
    amount: yup
        .number()
        .integer()
        .min(MIN, `Не менее ${MIN} рубля.`),
  });
});

// Create a form context with the validation schema
const {handleSubmit} = useForm({
  validationSchema: schema,
});

// No need to define rules for fields
let {value: description, errorMessage: descriptionError, meta: descriptionMeta, handleBlur: descriptionBlur} = useField('description');
let {
  value: amount,
  errorMessage: amountError,
  meta: amountMeta,
  handleBlur: amountBlur,
} = useField('amount');


const submitForm = handleSubmit(async (values, { resetForm }) => {
  if (current.value === '') {
    toast('Выберите категорию', 1);
  } else {
    values.categoryId = current.value;
    values.amount = values.amount ? +values.amount : MIN;
    values.type = picked.value;
    values.created = new Date().toJSON();
    try {
      await store.dispatch('createRecord', values);
      await store.dispatch('updateBill', {amount: 777, username: 'Vladilen'});
      console.log(values);

      resetForm();
      toast('Запись успешно создана!');
    } catch (e) {
      console.log(e.message);
    }
  }
});

</script>

<style scoped>
.mt-2 {
  margin-top: 2rem;
}
</style>
