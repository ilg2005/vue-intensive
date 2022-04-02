import axios from 'axios';

const requestsUrl = process.env.VUE_APP_FIREBASE_URL;

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
        SET_REQUESTS(state, payload) {
             state.requests = payload;
        },
    },
    actions: {
        async getRequests({commit}) {
           try {
             const res = await axios.get(`${requestsUrl}/requests.json`);
             commit('SET_REQUESTS', res.data);
           } catch (e) {
               console.log(e);
           }
        },
        async postRequest({commit}, payload) {
            try {
                await axios.post(`${requestsUrl}/requests.json`, payload);
                const res = await axios.get(`${requestsUrl}/requests.json`);
                commit('SET_REQUESTS', res.data);
            } catch (e) {
                console.log(e);
            }
        },
        async removeRequest({commit}, id) {
            try {
                await axios.delete(`${requestsUrl}/requests/${id}.json`);
                const res = await axios.get(`${requestsUrl}/requests.json`);
                commit('SET_REQUESTS', res.data);
            } catch (e) {
                console.log(e);
            }
        }
    }
}
