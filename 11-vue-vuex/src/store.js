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
    }
})

export default store
