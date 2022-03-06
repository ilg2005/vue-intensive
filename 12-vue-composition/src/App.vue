<template>
  <div class="container">
    <div class="card">
      <h1> {{ title }}</h1>
      <small>data, methods, computed, watch</small>
      <div class="form-control">
<!--        <input type="text" ref="textInput">-->
        <input type="text" v-model="firstName">
      </div>
      <hr>
      <p>Название: <strong>{{ name }}</strong></p>
      <p>Версия: <strong>{{ version }} ({{ doubleVersion }})</strong></p>

      <button class="btn" @click="change">Изменить</button>
    </div>
  </div>
</template>

<script>
import {ref, reactive, computed, watch} from "vue";

export default {
  setup() {
    const name = ref('VueJS')
    const version = ref(3)
    const title = ref('Vue Composition Api')
    // const textInput = ref(null)
    const firstName = ref('')

    const framework = reactive({
      name: 'VueJS',
      version: 3
    })

    const doubleVersion = computed(() => version.value * 2)

    watch([doubleVersion, name], (newValues, oldValues) => {
      console.log('new: 1)', newValues[0], '2)', newValues[1])
      console.log('old: 1)', oldValues[0], '2)', oldValues[1])
    })

    watch(firstName, (newValue) => console.log(newValue))

    function changeInfo() {
      name.value = 'Vue JS!'
      version.value = 4
      // console.log('textInput.value.value: ', textInput.value.value)
    }

    return {
      title,
      name,
      version,
      framework,
      doubleVersion,
      // textInput,
      firstName,
      change: changeInfo
    }
  }
  /*data() {
    return {
      name: 'VueJS',
      version: 3
    }
  },
  methods: {
    changeInfo() {
      this.name = 'Vue JS!'
      this.version = 4
    }
  }*/
}
</script>
