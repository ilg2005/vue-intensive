import {createStore, createLogger} from 'vuex';
import auth from "@/store/modules/auth.module";
import request from "@/store/modules/request.module";

const plugins = [];

if (process.env.NODE_ENV === 'development') {
    plugins.push(createLogger());
}

export default createStore({
    plugins,
    state() {
        return {
            message: null,
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
        }
    },
    actions: {
        setMessage({commit}, payload) {
            commit('SET_MESSAGE', payload);
            setTimeout(() => {
                commit('CLEAR_MESSAGE');
            }, 5000);
        }
    },
    modules: {
        auth, request,
    }
})
