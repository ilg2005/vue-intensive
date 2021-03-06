import {createStore} from 'vuex';
import authModule from "@/store/auth";
import categoryModule from "@/store/category";
import recordModule from "@/store/record";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../firebase.config.js";
import {getAuth} from "firebase/auth";
import {getDatabase, ref, onValue, set} from "firebase/database";
import {getStorage, ref as refStorage, getDownloadURL} from "firebase/storage";

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const database = getDatabase(firebase);
const storage = getStorage();

export default createStore({
    state: {
        error: null,
        user: null,
        rates: null,
        currency: null,
        translation: null,
        isRussian: true,
    },
    getters: {
        ERROR: state => state.error,
        USER: state => state.user,
        RATES: state => state.rates,
        CURRENCY: state => state.currency,
        TRANSLATION: state => state.translation,
    },
    mutations: {
        SET_ERROR(state, error) {
            state.error = error;
        },
        CLEAR_ERROR(state) {
            state.error = null;
        },
        SET_USER(state, user) {
            state.user = user;
        },
        SET_RATES(state, rates) {
            state.rates = rates;
        },
        SET_CURRENCY(state, currency) {
            state.currency = currency;
        },
        SET_TRANSLATION(state, translation) {
            state.translation = translation;
        },
        SET_LOCALE(state, isRussian) {
            state.isRussian = isRussian;
        }

    },
    actions: {
        async fetchInfo({commit}) {
            if (auth.currentUser) {
                const userId = auth.currentUser.uid;
                try {
                    await onValue(ref(database, '/users/' + userId), (snapshot) => {
                        const user = snapshot.val();
                        commit('SET_USER', user);
                    }, {
                        onlyOnce: false
                    });
                } catch (e) {
                    commit('SET_ERROR', e);
                    throw e;
                }
            }
        },
        async fetchCurrency(context) {
            try {
                const res = await fetch(`https://cdn.cur.su/api/latest.json`);
                const currency = await res.json();
                context.commit('SET_RATES', currency.rates);
                context.commit('SET_CURRENCY', currency);
            } catch (e) {
                context.commit('SET_ERROR', e);
                throw e;
            }
        },

        async fetchTranslation(context) {
            const translation = {};
            try {
                const urlRU = await getDownloadURL(refStorage(storage, 'ru.json'));
                const urlEN = await getDownloadURL(refStorage(storage, 'en.json'));
                const resRU = await fetch(urlRU);
                const resEN = await fetch(urlEN);
                translation['ru-RU'] = await resRU.json();
                translation['en-US'] = await resEN.json();
                context.commit('SET_TRANSLATION', translation);
                return translation;
            } catch (e) {
                context.commit('SET_ERROR', e);
                throw e;
            }
        },

        async updateInfo(context, payload) {
            try {
                const uid = await context.dispatch('getUid');
                await set(ref(database, `/users/${uid}/info`), {
                    bill: payload.bill,
                    username: payload.username,
                    locale: payload.locale,
                });
            } catch (e) {
                context.commit('SET_ERROR', e);
                throw e;
            }
        },
    },
    modules: {
        authModule,
        categoryModule,
        recordModule,
    }
});
