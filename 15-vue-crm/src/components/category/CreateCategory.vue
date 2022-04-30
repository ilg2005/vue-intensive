<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ i18n.create }}</h4>
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
          <label for="create_category_name">{{ i18n.categoryName }}</label>
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
          <label for="create_category_limit" class="active">{{ i18n.limit }}</label>
          <span class="helper-text invalid" v-if="limitError && limitMeta.touched && limit">{{ limitError }}</span>
          <span class="helper-text invalid" v-if="limitError && limitMeta.touched && !limit">{{ i18n.notLess }} {{MIN}} {{ i18n.roubles }}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{ i18n.create }}
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
const locale = computed(() => store.getters.USER.info.locale);
const i18n = computed(() => store.getters.TRANSLATION[locale.value]);
const MIN = 500;
const emit = defineEmits(['created']);
const schema = computed(() => {
  return yup.object({
    name: yup
        .string()
        .required(`${i18n.value.required}`),
    limit: yup
        .number()
        .integer()
        .min(MIN, `${i18n.value.notLess} ${MIN} ${i18n.value.roubles}.`),
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
    toast(`${i18n.value.categoryCreated} "${values.name}"`);
  } catch (e) {
    console.log(e.message);
  }

});

</script>

<style scoped>

</style>
