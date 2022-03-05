import {createStore} from 'vuex'

const store = createStore({
    state() {
        return {
            counter: 1
        }
    },
    mutations: {
        add(state, payload) {
            state.counter += payload.value ? payload.value : payload
        }
    },
    getters: {
        counter(state) {
/*
            if (state.counter > 50) {
                return 0
            }
*/
            return state.counter
        },
        doubleCounter(_, getters) {
            return getters.counter * 2
        }
    }
})

export default store
