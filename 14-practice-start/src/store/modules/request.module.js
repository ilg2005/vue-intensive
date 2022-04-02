export default {
    namespaced: true,
    state() {
        return {
            requests: [],
            stateMap: {
                active: 'активна',
                cancelled: 'отменена',
                pending: 'выполняется',
                done: 'завершена',
            }
        }
    },
    getters: {
        REQUESTS(state) {
            return state.requests;
        },
        STATE_MAP(state) {
            return state.stateMap;
        }
    },
    mutations: {
        SET_GETTERS(state, payload) {
            state.requests.push(payload);
        }
    },
    actions: {

    }
}
