import axios from 'axios';
import store from '../index';
import router from "@/router";

const firebaseUrl = process.env.VUE_APP_FIREBASE_URL;

// Add a response interceptor
axios.interceptors.response.use(null, error => {
    if (error.response.status === 401) {
        router.push('/auth?message=auth');
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default {
    namespaced: true,
    state() {
        return {
            requests: [],
            request: {},
        }
    },
    getters: {
        REQUESTS(state) {
            return state.requests;
        },
        REQUEST(state) {
            return state.request;
        }
    },
    mutations: {
        SET_REQUESTS(state, payload) {
            state.requests = payload;
        },
        ADD_REQUEST(state, payload) {
            state.requests.push(payload);
        },
        REMOVE_REQUEST(state, id) {
            state.requests = state.requests.filter(request => request.id !== id);
        }
    },
    actions: {

        async getRequests({commit}) {
            try {
                const token = store.getters['auth/token'];
                const {data} = await axios.get(`${firebaseUrl}/requests.json?auth=${token}`);
                if (data) {
                    const resArray = Object.values(data);
                    commit('SET_REQUESTS', resArray);
                }
            } catch (e) {
                await store.dispatch('setMessage',
                    {
                        value: e.message,
                        type: 'danger'
                    },
                    {root: true});
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
        async removeRequest({commit}, id) {
            try {
                const token = store.getters['auth/token'];
                await axios.delete(`${firebaseUrl}/requests/${id}.json?auth=${token}`);
                commit('REMOVE_REQUEST', id);
            } catch (e) {
                console.log(e);
            }
        }
    }
}
