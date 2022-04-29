import {createStore} from 'vuex';
import authModule from "@/store/auth";
import categoryModule from "@/store/category";
import recordModule from "@/store/record";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../firebase.config.js";
import {getAuth} from "firebase/auth";
import {getDatabase, ref, onValue, set} from "firebase/database";


const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const database = getDatabase(firebase);


export default createStore({
    state: {
        error: null,
        user: null,
        rates: null,
        currency: null,
        translation: null,
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

    },
    actions: {
        async fetchInfo({commit, dispatch}) {
            if (auth.currentUser) {
                const userId = auth.currentUser.uid;
                try {
                    await onValue(ref(database, '/users/' + userId), (snapshot) => {
                        const user = snapshot.val();
                        commit('SET_USER', user);
                        dispatch('fetchTranslation', user.info.locale);
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

        async fetchTranslation(context, locale) {
            const url = locale === 'ru-RU' ? process.env.VUE_APP_RU_TRANSLATION : process.env.VUE_APP_EN_TRANSLATION;
            try {
                const res = await fetch(url);
                const translation = await res.json();
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
