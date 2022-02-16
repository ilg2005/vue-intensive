<template>
  <div class="header">
    <h1>{{ title }}</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex labore nemo nobis, odio perspiciatis provident totam
      vitae? Nihil, officia, ullam!</p>
  </div>
</template>

<script>
export default {
  name: "TheHeader",
  data() {
    return {
      title: 'Заголовок хэдера'
    }
  }

}
</script>

<style scoped>
.header {
  background-color: #9e9106;
}
</style>
