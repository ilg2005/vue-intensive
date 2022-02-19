<template>
  <div class="container pt-1">
    <div class="card">
      <h2>Slots</h2>
    </div>

    <app-list>
      <template #default="{idx, iter}">
        <span style="color: orange;"><strong>{{ ++idx }} - </strong> Item: {{iter}}</span>
      </template>
    </app-list>

    <app-block>
      <template #footer>
        <hr>
        <p>Это футер</p>
      </template>
      <p>Текст для нового блока</p>

      <template v-slot:header>
        <h3>Это заголовок!</h3>
      </template>

    </app-block>


  </div>
</template>

<script>
import AppBlock from "@/components/AppBlock";
import AppList from "@/components/AppList";

export default {
  name: 'App',
  components: {AppBlock, AppList}
}
</script>

<style scoped>

</style>
