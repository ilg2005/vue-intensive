import {createApp} from 'vue'
import App from './App.vue'
import './theme.css'
import TranslatePlugin from "@/TranslatePlugin";

const app = createApp(App)

const ru = {
    app: {
        title: 'Как работают плагины во Vue?',
        changeBtn: 'Переключить язык'
    }
}
const en = {
    app: {
        title: 'How do plugins work in Vue?',
        changeBtn: 'Toggle language'
    }
}

app.use(TranslatePlugin, {ru, en})

app.mount('#app')
