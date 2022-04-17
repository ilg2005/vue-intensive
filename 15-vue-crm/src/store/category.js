import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../firebase.config.js";
import {getDatabase, } from "firebase/database";

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export default {
    state() {
        return {
            categories: {},
        }
    },
    getters: {
        CATEGORIES: state => state.categories,
    },
    mutations: {
        SET_CATEGORIES(state, categories) {
            state.categories = categories;
        },
        ADD_CATEGORY(state, category) {
            state.categories[category.key] = category;
        },
    },
    actions: {
        async createCategory(context, {name, limit}) {
            try {
                const uid = await context.dispatch('getUid');
                const category = await database.ref(`/users/${uid}/categories`).push({name, limit});
                context.commit('ADD_CATEGORY', category);
                console.log(category);
            } catch (e) {
                context.commit('SET_ERROR', e);
                throw e;
            }

        }
    }
}