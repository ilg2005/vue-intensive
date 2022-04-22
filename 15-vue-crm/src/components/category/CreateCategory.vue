<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="submitHandler" novalidate>
        <div class="input-field">
          <input
              id="create_category_name"
              type="text"
              v-model.trim="name"
              :class="{invalid: nameError && nameMeta.touched}"
              @blur="nameBlur"
          >
          <label for="create_category_name">Название категории</label>
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
          <span class="helper-text invalid" v-if="limitError && limitMeta.touched && !limit">Не менее {{MIN}} рублей</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import {useForm, useField} from 'vee-validate';
import * as yup from 'yup';
import {computed, defineEmits} from "vue";
import {useStore} from "vuex";
import {toast} from "@/utils/toast";

const store = useStore();
const MIN = 500;
const emit = defineEmits(['created']);
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

const submitHandler = handleSubmit(async values => {
  values.limit = values.limit ? +values.limit : MIN;
  try {
    await store.dispatch('createCategory', values);
    emit('created');
    toast(`Создана категория "${values.name}"`);
  } catch (e) {
    console.log(e.message);
  }

});

</script>

<style scoped>

</style>
