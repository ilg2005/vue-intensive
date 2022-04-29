<template>
  <div>
    <div class="page-title">
      <h3>{{ i18n.newRecord }}</h3>
    </div>

    <AppLoader v-if="loading"/>
    <p v-else-if="!cats.length">{{ i18n.noCategories }}
      <router-link to="/categories"> {{ i18n.addNewCategory }} ?</router-link>
    </p>
    <form
        v-else
        class="form"
        @submit.prevent="submitForm"
        novalidate
    >
      <div class="input-field">
        <select ref="select"
                v-model="current"
        >
          <option value="" disabled>{{ i18n.selectCategory }}</option>
          <option v-for="category in cats"
                  :key="category.id"
                  :value="category.id"
          >{{ category.name }}
          </option>
        </select>
      </div>

      <p class="mt-2">
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="income"
              v-model="picked"
          />
          <span>{{ i18n.income }}</span>
        </label>
      </p>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="outcome"
              v-model="picked"
          />
          <span>{{ i18n.outcome }}</span>
        </label>
      </p>

      <div class="input-field mt-2">
        <input
            id="record_amount"
            name="amount"
            type="number"
            :value="MIN"
            @input="amount = $event.target.value"
            :class="{invalid: amountError && amountMeta.touched}"
            @blur="amountBlur"
            :min="MIN"
        >
        <label for="record_amount" class="active">{{ i18n.amount }}</label>
        <span class="helper-text invalid"
              v-if="amountError && amountMeta.touched && amount">{{ amountError }}</span>
        <span class="helper-text invalid"
              v-if="amountError && amountMeta.touched && !amount">{{ i18n.notLess }} {{ MIN }} {{i18n.rouble}}</span>
      </div>

      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model.trim="description"
            :class="{invalid: descriptionError && descriptionMeta.touched}"
            @blur="descriptionBlur"
        >
        <label for="description">{{ i18n.description }}</label>
        <span class="helper-text invalid" v-if="descriptionError && descriptionMeta.touched">{{
            descriptionError
          }}</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ i18n.create }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>

</template>

<script setup>
import M from "materialize-css";
import {ref, computed, onMounted, onUnmounted} from "vue";
import {useStore} from "vuex";
import AppLoader from "@/components/app/AppLoader";
import * as yup from "yup";
import {useField, useForm} from "vee-validate";
import {toast} from "@/utils/toast";

const store = useStore();
const i18n = store.getters.TRANSLATION;
const select = ref();
const selectInstance = ref(null);
const current = ref('');
const loading = ref(true);
const picked = ref('income');
const MIN = 1;

let cats = ref([]);

onMounted(() => {
  store.dispatch('fetchCategories')
      .then((response) => {
        cats.value = response;
        loading.value = false;
      })
      .then(() => {
        selectInstance.value = M.FormSelect.init(select.value)
      });
});

onUnmounted(() => {
  if (selectInstance.value && selectInstance.value.destroy) {
    selectInstance.value.destroy();
  }
})

const schema = computed(() => {
  return yup.object({
    description: yup
        .string()
        .required(`${i18n.enterDescription}`),
    amount: yup
        .number()
        .integer()
        .min(MIN, `${i18n.notLess} ${MIN} ${i18n.rouble}.`),
  });
});

// Create a form context with the validation schema
const {handleSubmit} = useForm({
  validationSchema: schema,
});

// No need to define rules for fields
let {
  value: description,
  errorMessage: descriptionError,
  meta: descriptionMeta,
  handleBlur: descriptionBlur
} = useField('description');
let {
  value: amount,
  errorMessage: amountError,
  meta: amountMeta,
  handleBlur: amountBlur,
} = useField('amount');

const makeTransaction = (type, sum) => {
  const bill = store.getters.USER.info.bill;
  if (type === 'income') {
    return bill + sum;
  }
  if (type === 'outcome' && sum <= bill) {
    return bill - sum;
  }
  return false;
};

const submitForm = handleSubmit(async (values, {resetForm}) => {
  if (current.value === '') {
    toast(`${i18n.selectCategory}`, 1);
  } else {
    values.categoryId = current.value;
    values.amount = values.amount ? +values.amount : MIN;
    values.type = picked.value;
    values.created = new Date().toJSON();
    try {
      const updatedBill = makeTransaction(values.type, values.amount);
      if (updatedBill !== false) {
        await store.dispatch('createRecord', values);
        const username = store.getters.USER.info.username;
        await store.dispatch('updateBill', {total: updatedBill, username});
        resetForm();
        toast(`${i18n.recordSuccessfullyCreated}!`);
      } else {
        toast(`${i18n.notEnoughMoney}`, 1);
      }
    } catch (e) {
      console.log(e.message);
    }
  }
});

</script>

<style scoped>
.mt-2 {
  margin-top: 2rem;
}
</style>
