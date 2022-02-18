<template>
  <h4>{{ title }}</h4>
  <ul class="list">
    <li v-for="item in news"
        :class="list-item"
        :key="item"
    >
      <span :class="item.wasRead ? 'read' : ''">{{ item.title }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: "AppNewsList",
  inject: ['title', 'news']
}
</script>

<style scoped>
.read {
  text-decoration: line-through;
  color: red;
}

</style>
