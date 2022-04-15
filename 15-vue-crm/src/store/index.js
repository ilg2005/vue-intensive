import { createStore } from 'vuex';
import authModule from "@/store/auth";
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
  },
  getters: {
    ERROR : state => state.error,
    USER : state => state.user
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
    }
  },
  actions: {
    async fetchInfo({commit}) {
      if (auth.currentUser) {
        const userId = auth.currentUser.uid;
        await onValue(ref(database, '/users/' + userId), (snapshot) => {
          commit('SET_USER', snapshot.val());
        }, {
          onlyOnce: true
        });

      }
    }
  },
  modules: {
    authModule
  }
});
