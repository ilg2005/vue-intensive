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
            localStorage.setItem(TOKEN_KEY, 'TEST TOKEN');
        },
        LOGOUT(state) {
            state.token = null;
            localStorage.removeItem(TOKEN_KEY);
        }
    },
    actions: {
        async login({ commit }, payload) {
           commit('SET_TOKEN', payload);
        }
    }

}
