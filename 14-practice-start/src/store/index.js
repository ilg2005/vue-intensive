import {createStore} from 'vuex';
import auth from "@/store/modules/auth.module";
import request from "@/store/modules/request.module";

const plugins = [];


export default createStore({
    plugins,
    state() {
        return {
            message: null,
            sidebar: false,
        }
    },
    getters: {
        message(state) {
            return state.message;
        }
    },
    mutations: {
        SET_MESSAGE(state, payload) {
            state.message = payload;
        },
        CLEAR_MESSAGE(state) {
            state.message = null;
        },
        OPEN_SIDEBAR(state) {
            state.sidebar = true;
        },
        CLOSE_SIDEBAR(state) {
            state.sidebar = false;
        },
    },
    actions: {
        setMessage({commit}, payload) {
            commit('SET_MESSAGE', payload);
            setTimeout(() => {
                commit('CLEAR_MESSAGE');
            }, 2000);
        }
    },
    modules: {
        auth, request,
    }
})
