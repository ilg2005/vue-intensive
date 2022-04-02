<template>
  <form @submit.prevent="submitting">
    <div :class="['form-control', {invalid: fullNameError}]">
      <label for="fullName">ФИО</label>
      <input
          type="text"
          id="fullName"
          name="fullName"
          v-model="fullName"
          @blur="fullNameBlur"
      >
      <small class="danger" v-if="fullNameError">{{ fullNameError }}</small>
    </div>

    <div :class="['form-control', {invalid: telError}]">
      <label for="tel">Телефон</label>
      <input
          type="text"
          id="tel"
          name="tel"
          v-model="tel"
          @blur="telBlur"
      >
      <small class="danger" v-if="telError">{{ telError }}</small>
    </div>

    <div :class="['form-control', {invalid: sumError}]">
      <label for="sum">Сумма заявки</label>
      <input
          type="number"
          id="sum"
          name="sum"
          v-model.number="sum"
          @blur="sumBlur"
      >
      <small class="danger" v-if="sumError">{{ sumError }}</small>
    </div>

    <div :class="['form-control']">
      <label for="state">Статус</label>
      <select
          id="state"
          name="state"
          v-model="state"

      >
        <option v-for="(status, item) in StateMap"
                :key="item"
                :value=item>{{ status }}
        </option>
      </select>
    </div>

    <button class="btn primary mt-2" :disabled="isSubmitting">Создать</button>
  </form>
</template>

<script setup>
import {useField, useForm} from "vee-validate";
import * as yup from "yup";
import {defineEmits} from "vue";
import {useStore} from "vuex";

const store = useStore();

const StateMap = store.getters['request/STATE_MAP'];

const {handleSubmit, isSubmitting,} = useForm({
  initialValues: {
    state: 'active',
  }
})


const {value: fullName, errorMessage: fullNameError, handleBlur: fullNameBlur} = useField('fullName', yup
    .string()
    .trim()
    .required('Это поле должно быть заполнено')
);

const {value: tel, errorMessage: telError, handleBlur: telBlur} = useField('tel', yup
    .string()
    .trim()
    .required('Это поле должно быть заполнено')
);

const {value: sum, errorMessage: sumError, handleBlur: sumBlur} = useField('sum', yup
    .number()
    .min(0, 'Сумма должна быть положительным числом')
    .required('Это поле должно быть заполнено')
);

const {value: state} = useField('state');

const emit = defineEmits(['close']);

const submitting = handleSubmit(values => {
  console.log(values);
  store.commit('request/SET_GETTERS', values);


  emit('close');

});


</script>

<style scoped>

</style>
