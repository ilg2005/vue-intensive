<template>
  <div class="card">
    <h1>Как Vue работает с TypeScript?</h1>

    <button class="btn"
            @click="navigate"
    >Открыть пользователей
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const navigate = () => router.push('/users');

</script>
