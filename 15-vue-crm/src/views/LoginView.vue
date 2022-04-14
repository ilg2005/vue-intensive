<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
            id="login-email"
            type="text"
            :class="{invalid: emailError && emailMeta.touched}"
            v-model.trim="email"
            @blur="emailBlur"
        >
        <label for="login-email">Email</label>
        <small class="helper-text invalid" v-if="emailError && emailMeta.touched">{{ emailError }}</small>
      </div>
      <div class="input-field">
        <input
            id="login-password"
            type="password"
            :class="{invalid: passwordError && passwordMeta.touched}"
            v-model.trim="password"
            @blur="passwordBlur"
        >
        <label for="login-password">Пароль</label>
        <small class="helper-text invalid" v-if="passwordError && passwordMeta.touched">{{ passwordError }}</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script setup>
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import {computed, onMounted} from "vue";
import {useRouter, useRoute} from "vue-router";
import {toast} from "@/utils/toast";
import {useStore} from "vuex";

onMounted(() => {
  if (route.query.message === 'logout') {
    toast('Вы вышли из системы');
  }
});

const route = useRoute();
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
  });
});

// Create a form context with the validation schema
const {handleSubmit} = useForm({
  validationSchema: schema,
});

// No need to define rules for fields
const { value: email, errorMessage: emailError, meta: emailMeta, handleBlur: emailBlur } = useField('email');
const { value: password, errorMessage: passwordError, meta: passwordMeta, handleBlur: passwordBlur } = useField('password');

const submitHandler = handleSubmit(async values => {
  try {
    await store.dispatch('login', values);
    await router.push('/');
  } catch (e) {
    toast(e.message, e);
  }

});

</script>

