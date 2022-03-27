import axios from "axios";
import {error} from "@/utils/error";

const TOKEN_KEY = 'jwt-token';

export default {
    namespaced: true,
    state() {
        return {
            token: localStorage.getItem(TOKEN_KEY),
        };
    },
    getters: {
        token(state) {
            return state.token;
        },
        isAuthenticated(_, getters) {
            return !!getters.token;
        }
    },
    mutations: {
        SET_TOKEN(state, payload) {
            state.token = payload;
            localStorage.setItem(TOKEN_KEY, payload);
        },
        LOGOUT(state) {
            state.token = null;
            localStorage.removeItem(TOKEN_KEY);
        }
    },
    actions: {
        async login({commit}, payload) {
            try {
                const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`
                const {data} = await axios.post(url, {...payload, returnSecureToken: true});
                commit('SET_TOKEN', data.idToken);
            } catch (e) {
                console.dir(e);
                console.log(error(e.response.data.error.message));
            }

        }
    }

}
