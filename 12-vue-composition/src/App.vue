<template>
  <header class="navbar">
    <strong>{{ title }}</strong>
    <ul class="navbar-menu">
      <li>
        <router-link to="/">Главная</router-link>
      </li>
      <li>
        <router-link to="/reusable">Переиспользование</router-link>
      </li>
      <li>
        <router-link to="/vuex">Vuex</router-link>
      </li>
    </ul>
  </header>
  <div class="container with-nav">
    <router-view></router-view>
  </div>
</template>

<script>
import {ref, provide} from 'vue'

export default {

  setup() {
    const title = ref('Vue Composition Api')
    provide('title', title)
    return {
      title
    }
  }

}
</script>
