<template>
  <form class="card" @submit.prevent="onSubmit">
    <h1>Вход в систему</h1>

    <div :class="['form-control', {invalid: emailError}]">
      <label for="email">Email</label>
      <Field id="email"
             name="email"
             v-model="email"
             @blur="emailBlur"
      />
      <small v-if="emailError">{{ emailError }}</small>
    </div>

    <div :class="['form-control', {invalid: passwordError}]">
      <label for="password">Пароль</label>
      <Field id="password"
             name="password"
             v-model="password"
             @blur="passwordBlur"
      />
      <small v-if="passwordError">{{ passwordError }}</small>
    </div>

    <button class="btn primary mt-1" :disabled="isSubmitting || isTooManyAttempts">Войти</button>
    <div class="mt-1 text-danger" v-if="isTooManyAttempts">Слишком много попыток входа. Попробуйте позже.</div>
  </form>
</template>

<script>
import { Field} from 'vee-validate';
import {useLoginForm} from "@/use/login-form";
import {useRoute} from "vue-router";
import {error} from "@/utils/error";
import {useStore} from "vuex";

export default {
  components: {Field},
  setup() {
    const route = useRoute();
    const store = useStore();
    if (route.query.message) {
      store.dispatch('setMessage', {
        value: error(route.query.message),
        type: 'warning',
      })

    }
    const {...login} = useLoginForm()

    return login;
  }
}
</script>

<style scoped>

</style>
