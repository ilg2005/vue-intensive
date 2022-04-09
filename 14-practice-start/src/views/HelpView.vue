<template>
  <app-page title="Помощь">
    <template #header>
      <router-link class="btn primary" to="/">Назад</router-link>
    </template>

    <QuestionView
        v-for="question in questions"
        :key="question.title"
        :question="question"
    />

  </app-page>
</template>

<script setup>
import AppPage from "@/components/ui/AppPage";
import QuestionView from "@/components/question/QuestionView";

const questions = [
  {title: 'Что есть в данной системе?', text: 'Тут есть все для того, чтобы смотреть, какие заявки добавлял пользователь'},
  {title: 'Как тут работает авторизация?', text: 'Все реализовано через Firebase'}
];

</script>

<style scoped>
.btn {
  font-size: 1rem;
}
</style>
