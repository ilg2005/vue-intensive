<template>
  <div v-if="people.length">
    <div class="card inline"
         v-for="person in people"
         :key="person.id"
    >
      <h3>{{ person.firstName }}</h3>
      <button class="btn danger" @click="deletePerson(person.id)">Удалить</button>
    </div>
  </div>
  <div class="card center" v-else>
    <h4>Людей пока нет</h4>
    <button class="btn" @click="$emit('load')">Загрузить список</button>
  </div>
</template>

<script>
export default {
  name: "AppPeopleList",
  props: ['people'],
  emits: ['load', 'delete'],
  methods: {
    deletePerson(personID) {
      this.$emit('delete', personID);
    }
  }
}
</script>

<style scoped>

.inline {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>
