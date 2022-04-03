import axios from 'axios';

const firebaseUrl = process.env.VUE_APP_FIREBASE_URL;


export default {
    namespaced: true,
    state() {
        return {
            requests: {},
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
        ADD_REQUEST(state, payload) {
            state.requests[payload.id] = payload;
        },
        REMOVE_REQUEST(state, payload) {
            delete state.requests[payload];
        }
    },
    actions: {
        async getRequests({commit}) {
           try {
             const res = await axios.get(`${firebaseUrl}/requests.json`);
             if (res.data) {
                // const resArray = Object.values(res.data);
                 commit('SET_REQUESTS', res.data);
             }
           } catch (e) {
               console.log(e);
           }
        },
        async postRequest(context, payload) {
            try {
                await axios.put(`${firebaseUrl}/requests/${payload.id}.json`, payload);
                context.commit('ADD_REQUEST', payload);
            } catch (e) {
                console.log(e);
            }
        },
        async removeRequest({commit}, name) {
            try {
                await axios.delete(`${firebaseUrl}/requests/${name}.json`);
                commit('REMOVE_REQUEST', name);
            } catch (e) {
                console.log(e);
            }
        }
    }
}
