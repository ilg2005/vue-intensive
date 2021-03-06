<template>
  <div>
    <div class="page-title">
      <Teleport to="head">
        <title>{{ i18n.profile }} | {{ i18n.homeBanking }}</title>
      </Teleport>

      <h3>{{ i18n.profile }}</h3>
    </div>

    <form @submit.prevent="submitHandler" novalidate>
      <div class="input-field mb-2">
        <input
            id="profile_username"
            type="text"
            name="username"
            v-model.trim="username"
            :class="{invalid: usernameError && usernameMeta.touched}"
            @blur="usernameBlur"
        >
        <label for="profile_username" class="active">{{ i18n.username }}</label>
        <span class="helper-text invalid" v-if="usernameError && usernameMeta.touched">{{ usernameError }}</span>
      </div>

      <div class="switch mb-2">
        <label>
          English
          <input type="checkbox" v-model="isRussian">
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ i18n.update }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>

</template>

<script setup>
import * as yup from "yup";
import {useField, useForm} from "vee-validate";
import {onMounted, ref, computed} from "vue";
import {useStore} from "vuex";

const info = ref();
const store = useStore();
const locale = computed(() => store.getters.USER.info.locale);
const i18n = computed(() => store.getters.TRANSLATION[locale.value]);

let isRussian = ref(true);

onMounted(() => {
  info.value = store.getters.USER.info;
  username.value = info.value.username;
  isRussian.value = info.value.locale === 'ru-RU';
})

const schema = computed(() => {
  return yup.object({
    username: yup
        .string()
        .required(i18n.value.required),
  });
});

// Create a form context with the validation schema
const {handleSubmit} = useForm({
  validationSchema: schema,
});

// No need to define rules for fields
let {value: username, errorMessage: usernameError, meta: usernameMeta, handleBlur: usernameBlur} = useField('username');

const submitHandler = handleSubmit(async values => {
  values.locale = isRussian.value ? 'ru-RU' : 'en-US';
  values.bill = info.value.bill;
  try {
    await store.dispatch('updateInfo', values);
  } catch (e) {
    console.log(e.message);
  }

});
</script>

<style scoped>
.mb-2 {
  margin-bottom: 2rem;
}
</style>
