import {createStore, createLogger} from 'vuex'
import counterModule from "@/store/modules/counter";

const store = createStore({
    plugins: [createLogger()],
    modules: {
        count: counterModule
    },
    state() {
        return {
            title: 'This is Vuex!'
        }
    },
    getters: {
        uppercaseTitle(state) {
            return state.title.toUpperCase()
        }
    }
})

export default store
