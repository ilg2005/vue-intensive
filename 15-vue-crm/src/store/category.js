import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../firebase.config.js";
import {getDatabase, ref, push, set} from "firebase/database";

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
        ADD_CATEGORY(state, {newCategoryRef, name, limit}) {
            state.categories[newCategoryRef] = {name, limit};
        },
    },
    actions: {
        async createCategory(context, {name, limit}) {
            try {
                const uid = await context.dispatch('getUid');
                const categoriesListRef = await ref(database, `/users/${uid}/categories`);
                const newCategoryRef = await push(categoriesListRef);
                await set(newCategoryRef, {name, limit});
                context.commit('ADD_CATEGORY', {newCategoryRef, name, limit});
            } catch (e) {
                context.commit('SET_ERROR', e);
                throw e;
            }

        }
    }
}
