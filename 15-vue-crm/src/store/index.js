import { createStore } from 'vuex';
import authModule from "@/store/auth";
import categoryModule from "@/store/category";
import recordModule from "@/store/record";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../firebase.config.js";
import {getAuth} from "firebase/auth";
import {getDatabase, ref, onValue } from "firebase/database";


const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const database = getDatabase(firebase);


export default createStore({
  state: {
    error: null,
    user: null,
    rates: null,
    currency: null,
  },
  getters: {
    ERROR: state => state.error,
    USER: state => state.user,
    RATES: state => state.rates,
    CURRENCY: state => state.currency,
  },
  mutations: {
    SET_ERROR(state, error) {
      state.error = error;
    },
    CLEAR_ERROR(state) {
      state.error = null;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SET_RATES(state, rates) {
      state.rates = rates;
    },
    SET_CURRENCY(state, currency) {
      state.currency = currency;
    }
  },
  actions: {
    async fetchInfo({commit}) {
      if (auth.currentUser) {
        const userId = auth.currentUser.uid;
        await onValue(ref(database, '/users/' + userId), (snapshot) => {
          commit('SET_USER', snapshot.val());
          return snapshot.val();
        }, {
          onlyOnce: false
        });

      }
    },
    async fetchCurrency(context) {
        const res = await fetch(`https://cdn.cur.su/api/latest.json`);
        const currency = await res.json();
        context.commit('SET_RATES', currency.rates);
        context.commit('SET_CURRENCY', currency);
    }
  },
  modules: {
    authModule,
    categoryModule,
    recordModule,
  }
});
