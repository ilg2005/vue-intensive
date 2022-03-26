<template>
  <form class="card" @submit.prevent="onSubmit">
    <h1>Вход в систему</h1>

    <div :class="['form-control', {'invalid': emailError}]">
      <label for="email">Email</label>
      <Field id="email"
             type="email"
             name="email"
             v-model="email"
             @blur="emailBlur"
      />
      <small v-if="emailError || emailBlur">{{ emailError }}</small>
    </div>

    <div class="form-control">
      <label for="password">Пароль</label>
      <Field id="password"
             type="password"
             name="password"
             v-model="password"
             @blur="passwordBlur"
      />
      <small v-if="passwordError || passwordBlur">{{ passwordError }}</small>
    </div>

    <button class="btn primary mt-1">Войти</button>
  </form>
</template>

<script>
import {useField, Field, useForm} from 'vee-validate';
import * as yup from 'yup';

export default {
  components: {Field},
  setup() {
    /*const schema = {
      email: yup.string().required().email(),
      password: yup.string().required().min(8),
    };*/

    const {handleSubmit} = useForm()

    const {value: email, errorMessage: emailError, handleBlur: emailBlur} = useField('email', yup.string().required().email());

    const {value: password, errorMessage: passwordError, handleBlur: passwordBlur} = useField('password', yup.string().required().min(8));

    const onSubmit = handleSubmit((values) => console.log(values));

    return {
      email, emailError, emailBlur,
      password, passwordError, passwordBlur,
      onSubmit
    }
  }
}
</script>

<style scoped>

</style>