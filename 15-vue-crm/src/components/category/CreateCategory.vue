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
import {computed} from "vue";
import {useStore} from "vuex";


const store = useStore();
const MIN = 500;
const schema = computed(() => {
  return yup.object({
    name: yup
        .string()
        .required('Введите название категории'),
    limit: yup
        .number()
        .integer()
        .required('Это поле должно быть заполнено')
        .min(499, `Не менее ${MIN} рублей.`),
  });
});
// Create a form context with the validation schema
const {handleSubmit} = useForm({
  validationSchema: schema,
});

// No need to define rules for fields
const {value: name, errorMessage: nameError, meta: nameMeta, handleBlur: nameBlur} = useField('name');
const {
  value: limit,
  errorMessage: limitError,
  meta: limitMeta,
  handleBlur: limitBlur,
} = useField('limit');

const submitHandler = handleSubmit(async values => {
  try {
    await store.dispatch('createCategory', values);
    await store.dispatch('setMessage', `Создана категория "${values.name}"`)
    values = null;
  } catch (e) {
    console.log(e.message);
  }

});

</script>

<style scoped>

</style>