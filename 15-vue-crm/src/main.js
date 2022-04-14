import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import '@/assets/index.css';



createApp(App).use(router).use(store).mount('#app');



