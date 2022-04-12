<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#">
          <i class="material-icons black-text" @click="$emit('sidebar-state')">dehaze</i>
        </a>
        <span class="black-text">{{ date }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
              class="dropdown-trigger black-text"
              href="#"
              data-target="dropdown"
          >
            USER NAME
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id='dropdown' class='dropdown-content'>
            <li>
              <a href="#" class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </a>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>

</template>

<script setup>
import {onBeforeUnmount, ref} from "vue";

const date = ref();
const interval = ref();
interval.value = setInterval(() => date.value = new Intl.DateTimeFormat('ru-RU', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
}).format(new Date()), 1000);

onBeforeUnmount(() => {
  interval.value = null;
})
</script>

<style scoped>

</style>
