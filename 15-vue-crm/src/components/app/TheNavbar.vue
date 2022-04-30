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
          <a  ref="dropdown"
              class="dropdown-trigger black-text"
              href="#"
              data-target="dropdown"
          >
            {{ username }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id='dropdown' class='dropdown-content'>
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>{{ i18n.profile }}
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>{{ i18n.logout }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>

</template>

<script setup>
import {onBeforeUnmount, onMounted, ref, defineProps, computed} from "vue";
import {useRouter} from 'vue-router';
import M from 'materialize-css';
import {useStore} from "vuex";

const router = useRouter();
const dropdown = ref();
let dropdownInstance = ref();

const date = ref();
const interval = ref();

defineProps(['username']);

const store = useStore();
const locale = computed(() => store.getters.USER.info.locale);
const i18n = computed(() => store.getters.TRANSLATION[locale.value]);

const logout = async () => {
  await store.dispatch('logout');
  await router.push('/login?message=logout');
}

onMounted( () => {
  dropdownInstance.value = M.Dropdown.init(dropdown.value, {constrainWidth: false});
  const locale = store.getters.USER.info.locale;

  interval.value = setInterval(() => date.value = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).format(new Date()), 1000);
})

onBeforeUnmount(() => {
  clearInterval(interval.value);
  if (dropdownInstance.value && dropdownInstance.value.destroy) {
    dropdownInstance.value.destroy();
  }
})
</script>

<style scoped>

</style>
