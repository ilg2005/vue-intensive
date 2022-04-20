import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../firebase.config.js";
import {getDatabase, ref, push, set, onValue} from "firebase/database";

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export default {
    state: {
        categories: [],
    },
    getters: {
        CATEGORIES: state => state.categories,
    },
    mutations: {
        SET_CATEGORIES(state, categories) {
            state.categories = categories;
        },
        ADD_CATEGORY(state, {newCategoryRef, name, limit}) {
            state.categories[state.categories.length] = {'id': newCategoryRef, name, limit};
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
        },
        async fetchCategories(context) {
            try {
                const uid = await context.dispatch('getUid');
                const categoriesRef = ref(database, `/users/${uid}/categories`);

                let categories = [];
                onValue(categoriesRef, (snapshot) => {
                    const data = snapshot.val();
                    if(data) {
                        const res =  Object.keys(data).map(key => ({...data[key], id: key}));
                        categories.push(...res);
                    }
                });
                return categories;
            } catch (e) {
                context.commit('SET_ERROR', e);
                throw e;
            }
        }
    }
}
