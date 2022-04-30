import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../firebase.config.js";
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import {getDatabase, ref, set} from "firebase/database";


const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const database = getDatabase(firebase);


export default {
    actions: {
        async login({commit}, {email, password}) {
            try {
                await signInWithEmailAndPassword(auth, email, password);
            } catch (e) {
                commit('SET_ERROR', e);
                throw e;
            }
        },
        async logout(context) {
            try {
                await auth.signOut();
                context.commit('SET_USER', null);
            } catch (e) {
                console.log(e);
                throw e;
            }
        },
        async register({commit, dispatch}, {email, password, username, locale}) {
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                const uid = await dispatch('getUid');
                await set(ref(database, `/users/${uid}/info`), {
                    bill: 0,
                    username,
                    locale
                });
            } catch (e) {
                commit('SET_ERROR', e);
                throw e;
            }
        },
        getUid() {
                const user = auth.currentUser;
                return user ? user.uid : null;

        }
    }
}
