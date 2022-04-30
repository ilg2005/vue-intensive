<template>
  <Teleport to="head">
    <title>{{ i18n.signIn }} | {{ i18n.homeBanking }}</title>
  </Teleport>

  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <p class="card-title">{{ i18n.homeBanking }}
        <a class="i18n" @click.prevent="changeLocale">{{ isRussian ? 'En' : 'Ru' }}</a>
      </p>
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
        <label for="login-password">{{ i18n.password }}</label>
        <small class="helper-text invalid" v-if="passwordError && passwordMeta.touched">{{ passwordError }}</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          {{ i18n.signIn }}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{ i18n.noAccount }}?
        <router-link to="/register">{{ i18n.signUp }}</router-link>
      </p>
    </div>
  </form>

</template>

<script setup>
import {useForm, useField} from 'vee-validate';
import * as yup from 'yup';
import {computed, onMounted, ref} from "vue";
import {useRouter, useRoute} from "vue-router";
import {toast} from "@/utils/toast";
import {useStore} from "vuex";


const route = useRoute();
const router = useRouter();

const store = useStore();


const isRussian = ref(true);
const locale = computed(() => isRussian.value ? 'ru-RU' : 'en-US');

const i18n = computed(() => store.getters.TRANSLATION[locale.value]);

onMounted(() => {
  if (route.query.message === 'logout') {
    toast(i18n.value['loggedOut']);
  }
});


const changeLocale = () => {
  isRussian.value = !isRussian.value;
}

// Define a validation schema
const schema = computed(() => {
  return yup.object({
    email: yup
        .string()
        .required(`${i18n.value['required']}`)
        .email(`${i18n.value['invalidEmail']}`),
    password: yup
        .string()
        .required(`${i18n.value['required']}`),
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

const submitHandler = handleSubmit(async values => {
  try {
    await store.dispatch('login', values);
    await router.push('/');
  } catch (e) {
    console.log(e.message);
  }

});

</script>

<style scoped>
.i18n {
  float: right;
  font-size: 1.2rem;
  cursor: pointer;
}
</style>

