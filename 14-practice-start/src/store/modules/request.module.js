import axios from 'axios';

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
        async postRequest(_, payload) {
            const requestsUrl = process.env.VUE_APP_FIREBASE_URL + '/requests.json'
            try {
                const res = await axios.post(requestsUrl, payload);
                console.log(res);
            } catch (e) {
                console.log(e);
            }



        }
    }
}
