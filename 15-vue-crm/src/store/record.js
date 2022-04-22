import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../firebase.config.js";
import {getDatabase, ref, push, set} from "firebase/database";

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export default {
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
        async createRecord(context, payload) {
            try {
                const uid = await context.dispatch('getUid');
                const recordsListRef = await ref(database, `/users/${uid}/records`);
                const newRecordRef = await push(recordsListRef);
                await set(newRecordRef, payload);
            } catch (e) {
                context.commit('SET_ERROR', e);
                throw e;
            }
        },
        async updateBill(context, payload) {
            try {
                const uid = await context.dispatch('getUid');
                await set(ref(database, `/users/${uid}/info`), {
                    bill: payload.amount,
                    username: payload.username,
                });
            } catch (e) {
                context.commit('SET_ERROR', e);
                throw e;
            }
        }
    }
}
