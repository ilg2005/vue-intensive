<template>
  <div class="card">
    <h1> {{ title }}</h1>

    <button class="btn" @click="navigate">Открыть пользователей</button>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useRouter} from 'vue-router'

export default defineComponent({
  /*
    data() {
      return {
        title: 'Как Vue работает с TypeScript?'
      };
    }
  */
  setup() {
    const router = useRouter();
    const navigate = (): void => {
      router.push('/users');
    }
    return {
      title: 'Как Vue работает с TypeScript?',
      navigate,
    }
  }
})

</script>
