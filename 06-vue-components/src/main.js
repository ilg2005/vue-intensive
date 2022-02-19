import {createApp, defineAsyncComponent} from 'vue'
import App from './App.vue'
import './theme.css'

const app = createApp(App)

//global
app.component('async-component', defineAsyncComponent(() => {
    return import('@/components/AppAsyncComponent')
}))

app.mount('#app')
