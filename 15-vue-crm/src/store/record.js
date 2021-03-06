import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../firebase.config.js";
import {getDatabase, ref, push, set, onValue, update} from "firebase/database";

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
        async updateBill(context, {total}) {
            try {
                const uid = await context.dispatch('getUid');
                const updates = {};
                updates[`/users/${uid}/info/bill`] = total;
                await update(ref(database), updates);
            } catch (e) {
                context.commit('SET_ERROR', e);
                throw e;
            }
        },
        async fetchRecords(context) {
            try {
                const uid = await context.dispatch('getUid');
                const recordsRef = ref(database, `/users/${uid}/records`);

                let records = [];
                onValue(recordsRef, (snapshot) => {
                    const data = snapshot.val();
                    if(data) {
                        const res =  Object.keys(data).map(key => ({...data[key], id: key}));
                        records.push(...res);
                    }
                });
                return records;
            } catch (e) {
                context.commit('SET_ERROR', e);
                throw e;
            }
        },
        async fetchRecordById(context, id) {
            try {
                const uid = await context.dispatch('getUid');
                const recordRef = ref(database, `/users/${uid}/records/${id}`);

                let record;
                onValue(recordRef, snapshot => {
                        const data = snapshot.val();
                        record = data ? {...data, id} : false;
                });
                return record;
            } catch (e) {
                context.commit('SET_ERROR', e);
                throw e;
            }
        },

    }
}
