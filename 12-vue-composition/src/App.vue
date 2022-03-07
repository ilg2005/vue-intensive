<template>
  <div class="container">
    <div class="card">
      <h1> {{ title }}</h1>
      <small>data, methods, computed, watch</small>
      <div class="form-control">
        <input type="text" v-model="firstName">
      </div>
      <hr>

      <button class="btn" @click="change">Изменить</button>
    </div>

    <framework-info
        @changeVersion="changeVer"
        class="temp"
    >
      <template #footer>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa magnam nulla quas quia ut voluptas.</p>
      </template>
    </framework-info>
  </div>
</template>

<script>
import {ref, reactive, watch, provide} from "vue";
import FrameworkInfo from "@/FrameworkInfo";

export default {
  components: {FrameworkInfo},
  setup() {
    const name = ref('VueJS')
    const version = ref(3)
    const title = ref('Vue Composition Api')
    const firstName = ref('')

    const framework = reactive({
      name: 'VueJS',
      version: 3
    })

    provide('name', name)
    provide('version', version)

    watch(firstName, (newValue) => console.log(newValue))

    function changeInfo() {
      name.value = 'Vue JS!'
      version.value = 4
    }

    function changeVer() {
      version.value = 3
    }

    return {
      title,
      framework,
      firstName,
      change: changeInfo,
      changeVer
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
