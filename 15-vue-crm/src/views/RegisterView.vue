<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
            id="register-email"
            type="text"
            :class="{invalid: emailError && emailMeta.touched}"
            v-model.trim="email"
            @blur="emailBlur"
        >
        <label for="register-email">Email</label>
        <small class="helper-text invalid" v-if="emailError && emailMeta.touched">{{ emailError }}</small>
      </div>
      <div class="input-field">
        <input
            id="register-password"
            type="password"
            :class="{invalid: passwordError && passwordMeta.touched}"
            v-model.trim="password"
            @blur="passwordBlur"
        >
        <label for="register-password">Пароль</label>
        <small class="helper-text invalid" v-if="passwordError && passwordMeta.touched">{{ passwordError }}</small>
      </div>
      <div class="input-field">
        <input
            id="register-username"
            type="text"
            :class="{invalid: usernameError && usernameMeta.touched}"
            v-model.trim="username"
            @blur="usernameBlur"
        >
        <label for="register-username">Имя</label>
        <small class="helper-text invalid" v-if="usernameError && usernameMeta.touched">{{ usernameError }}</small>
      </div>
      <p>
        <label>
          <input type="checkbox"
                 v-model="agree"
          />
          <span>С правилами согласен</span>
        </label>
      </p>
      <small class="helper-text invalid" v-if="agreeError">{{ agreeError }}</small>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>

</template>

<script setup>
import {useForm, useField} from 'vee-validate';
import * as yup from 'yup';
import {computed} from "vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {toast} from "@/utils/toast";

const router = useRouter();
const store = useStore();

// Define a validation schema
const MIN_LENGTH = 8;
const schema = computed(() => {
  return yup.object({
    email: yup
        .string()
        .required('Это поле должно быть заполнено')
        .email('Введите валидный email'),
    password: yup
        .string()
        .required('Это поле должно быть заполнено')
        .min(MIN_LENGTH, `Пароль должен содержать не менее ${MIN_LENGTH} символов.`),
    username: yup
        .string()
        .required('Это поле должно быть заполнено'),
    agree: yup
        .bool()
        .required('Выберите для регистрации')
  });
});

// Create a form context with the validation schema
const {handleSubmit} = useForm({
  validationSchema: schema,
});

// No need to define rules for fields
const {value: email, errorMessage: emailError, meta: emailMeta, handleBlur: emailBlur} = useField('email');
const {
  value: password,
  errorMessage: passwordError,
  meta: passwordMeta,
  handleBlur: passwordBlur
} = useField('password');
const {
  value: username,
  errorMessage: usernameError,
  meta: usernameMeta,
  handleBlur: usernameBlur
} = useField('username');
const {value: agree, errorMessage: agreeError,} = useField('agree');

const submitHandler = handleSubmit(async values => {
  try {
    await store.dispatch('register', values);
    await router.push('/');
  } catch (e) {
    toast(e.message, e);
  }

});

</script>

<style scoped>

</style>
