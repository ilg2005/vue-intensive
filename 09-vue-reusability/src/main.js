import {createApp} from 'vue'
import App from './App.vue'
import './theme.css'
import TranslatePlugin from "@/TranslatePlugin";

const app = createApp(App)

app.use(TranslatePlugin)

app.mount('#app')
