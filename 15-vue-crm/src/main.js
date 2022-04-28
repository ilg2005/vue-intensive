import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import '@/assets/index.css';

import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../firebase.config.js";
import { getAuth } from "firebase/auth";
import tooltipDirective from "@/utils/tooltip.js";

import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);

let app;

auth.onAuthStateChanged(() => {
    if (!app) {
        app = createApp(App).use(router).use(store).directive('tooltip',tooltipDirective).use(VueChartkick).mount('#app');
    }
})




