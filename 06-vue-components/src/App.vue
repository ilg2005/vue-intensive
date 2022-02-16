<template>
  <div class="container pt-1">
    <div class="card">
      <h2>Актуальные новости на {{ now }}</h2>
      <hr>
<!--
      <ul>
        <li
            class="list-item"
            v-for="(event, idx) in news"
            :key="event"
        > {{ ++idx + ') ' + event }}

        </li>
      </ul>
-->
      <app-news></app-news>
      <app-news></app-news>
      <app-news></app-news>
    </div>


  </div>
</template>

<script>

import AppNews from "@/components/AppNews";

export default {

  name: 'App',
  components: {AppNews},
  data() {
    return {
      now: new Date().toLocaleDateString(),
      news: [
        'Силуанов назвал сроки запуска проектов с использованием средств ФНБ',
        'Определился соперник сборной России по хоккею в полуфинале Олимпиады',
        'Vue 3 успешно работает'
      ]
    }
  }
}
</script>

<style>

</style>
