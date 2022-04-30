<template>
  <Teleport to="head">
    <title>{{ i18n.signUp }} | {{ i18n.homeBanking }}</title>
  </Teleport>

  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <p class="card-title">{{ i18n.homeBanking }}
        <a class="i18n" @click.prevent="changeLocale">{{ isRussian ? 'En' : 'Ru' }}</a>
      </p>
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
        <label for="register-password">{{ i18n.password }}</label>
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
        <label for="register-username">{{ i18n.username }}</label>
        <small class="helper-text invalid" v-if="usernameError && usernameMeta.touched">{{ usernameError }}</small>
      </div>
      <p>
        <label>
          <input type="checkbox"
                 v-model="agree"
          />
          <span>{{ i18n.agree }}</span>
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
          {{ i18n.signUp }}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{ i18n.haveAccount }}?
        <router-link to="/login">{{ i18n.signIn }}!</router-link>
      </p>
    </div>
  </form>

</template>

<script setup>
import {useForm, useField} from 'vee-validate';
import * as yup from 'yup';
import {computed, ref} from "vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

const router = useRouter();
const store = useStore();

const isRussian = ref(true);
const locale = computed(() => isRussian.value ? 'ru-RU' : 'en-US');

const i18n = computed(() => store.getters.TRANSLATION[locale.value]);

const changeLocale = () => {
  isRussian.value = !isRussian.value;
}

// Define a validation schema
const MIN_LENGTH = 8;
const schema = computed(() => {
  return yup.object({
    email: yup
        .string()
        .required(`${i18n.value['required']}`)
        .email(`${i18n.value['invalidEmail']}`),
    password: yup
        .string()
        .required(`${i18n.value['required']}`)
        .min(MIN_LENGTH, `${i18n.value['notLess']} ${MIN_LENGTH} ${i18n.value['chars']}.`),
    username: yup
        .string()
        .required(`${i18n.value['required']}`),
    agree: yup
        .bool()
        .required(`${i18n.value['registrationSelect']}`)
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
  values.locale = locale.value;
  try {
    await store.dispatch('register', values);
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
