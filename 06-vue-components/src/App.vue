<template>
  <div class="container pt-1">
    <div class="card">
      <h2>Актуальные новости на {{ now }}</h2>
      <span>Открыто: {{ openRate }}</span>
      <hr>
      <app-news v-for="event in news"
                :key="event.id"
                :title="event.title"
                :id="event.id"
                :content="event.content"
                :isOpen="event.isOpen"
                @open="openRate++"
      ></app-news>
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
      openRate: 0,
      news: [
        {
          title: 'Силуанов назвал сроки запуска проектов с использованием средств ФНБ',
          id: 1,
          isOpen: false,
          content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta, dolore?'
        },
        {
          title: 'Определился соперник сборной России по хоккею в полуфинале Олимпиады',
          id: 2,
          isOpen: false,
          content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta, dolore?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta, dolore?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta, dolore?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta, dolore?'
        },
        {
          title: 'Vue 3 успешно работает',
          id: 3,
          isOpen: false,
          content: 'Lorem ipsum'
        },

      ]
    }
  }
}
</script>

<style>

</style>
