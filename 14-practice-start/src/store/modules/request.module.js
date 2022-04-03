import axios from 'axios';
import store from '../index';

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
                const token = store.getters['auth/token'];
                const {data} = await axios.get(`${firebaseUrl}/requests.json?auth=${token}`);
                if (data) {
                    // const resArray = Object.values(data);
                    commit('SET_REQUESTS', data);
                }
            } catch (e) {
                console.log(e);
            }
        },
        async postRequest(context, payload) {
            try {
                const token = store.getters['auth/token'];
                await axios.put(`${firebaseUrl}/requests/${payload.id}.json?auth=${token}`, payload);
                context.commit('ADD_REQUEST', payload);
                await store.dispatch('setMessage',
                    {
                        value: 'Заявка успешно создана!',
                        type: 'primary'
                    },
                    {root: true})
            } catch (e) {
                await store.dispatch('setMessage',
                    {
                        value: e.message,
                        type: 'danger'
                    },
                    {root: true});
            }
        },
        async removeRequest({commit}, name) {
            try {
                const token = store.getters['auth/token'];
                await axios.delete(`${firebaseUrl}/requests/${name}.json?auth=${token}`);
                commit('REMOVE_REQUEST', name);
            } catch (e) {
                console.log(e);
            }
        }
    }
}
