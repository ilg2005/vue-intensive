<template>
  <div class="container pt-1">
    <div class="card">
      <h2>Актуальные новости на {{ now }}</h2>
      <span>Открыто: <strong>{{ openRate }}</strong> | Прочитано: <strong>{{ readRate }}</strong></span>
      <hr>
      <app-news v-for="event in news"
                :key="event.id"
                :title="event.title"
                :id="event.id"
                :content="event.content"
                :isOpen="event.isOpen"
                :was-read="event.wasRead"
                @open="openRate++"
                @read-news="readNews"
                @unmark="unreadNews"
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
      readRate: 0,
      news: [
        {
          title: 'Силуанов назвал сроки запуска проектов с использованием средств ФНБ',
          id: 1,
          isOpen: false,
          wasRead: false,
          content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta, dolore?'
        },
        {
          title: 'Определился соперник сборной России по хоккею в полуфинале Олимпиады',
          id: 2,
          isOpen: false,
          wasRead: false,
          content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta, dolore?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta, dolore?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta, dolore?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta, dolore?'
        },
        {
          title: 'Vue 3 успешно работает',
          id: 3,
          isOpen: false,
          wasRead: false,
          content: 'Lorem ipsum'
        },

      ]
    }
  },
  provide() {
    return {
      title: 'Список всех новостей: ',
      news: this.news
    }
  },
  methods: {
    readNews(id) {
      const idx = this.news.findIndex(news => news.id === id)
      this.news[idx].wasRead = true
      this.readRate++
    },
    unreadNews(id) {
      const idx = this.news.findIndex(news => news.id === id)
      this.news[idx].wasRead = false
      this.readRate--

    }
  }
}
</script>

<style>

</style>
