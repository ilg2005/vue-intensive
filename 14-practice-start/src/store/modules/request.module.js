import axios from 'axios';

const firebaseUrl = process.env.VUE_APP_FIREBASE_URL;

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
        ADD_REQUEST(state, payload) {
            state.requests.push(payload);
        },
        REMOVE_REQUEST(state, payload) {
            state.requests = state.requests.filter(request => request.id !== payload);
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
                await axios.post(`${firebaseUrl}/requests.json`, payload);
                context.commit('ADD_REQUEST', payload);
            } catch (e) {
                console.log(e);
            }
        },
        async removeRequest({commit}, {id, name}) {
            try {
                console.log(name);
                await axios.delete(`${firebaseUrl}/requests/${name}.json`);
                console.log('id::', id);
                commit('REMOVE_REQUEST', id);
            } catch (e) {
                console.log(e);
            }
        }
    }
}
