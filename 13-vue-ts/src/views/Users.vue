<template>
  <div class="card">
    <h1>Пользователи</h1>
    <UsersList/>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import UsersList from "@/components/UsersList.vue";

export default defineComponent({
  components: {UsersList,}
});

</script>
