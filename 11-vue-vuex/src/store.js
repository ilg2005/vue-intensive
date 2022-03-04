import {createStore} from 'vuex'

const store = createStore({
    state() {
        return {
            counter: 1
        }
    }
})

export default store
