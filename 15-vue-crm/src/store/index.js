import { createStore } from 'vuex';
import auth from "@/store/auth";

export default createStore({
  state: {
    error: null
  },
  getters: {
    ERROR : state => state.error
  },
  mutations: {
    SET_ERROR(state, error) {
      state.error = error;
    },
    CLEAR_ERROR(state) {
      state.error = null;
    }
  },
  actions: {

  },
  modules: {
    auth
  }
});
