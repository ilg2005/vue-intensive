import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../firebase.config.js";
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import {getDatabase, ref, set} from "firebase/database";


const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const database = getDatabase(firebase);


export default {
    actions: {
        async login(_, {email, password}) {
            try {
                await signInWithEmailAndPassword(auth, email, password);
            } catch (e) {
                console.log(e);
                throw e;
            }
        },
        async logout() {
            try {
                await auth.signOut();
            } catch (e) {
                console.log(e);
                throw e;
            }
        },
        async register({dispatch}, {email, password, username}) {
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                const uid = await dispatch('getUid');
                await set(ref(database, `/users/${uid}/info`), {
                    bill: 100000,
                    username
                });
            } catch (e) {
                console.log(e);
                throw e;
            }
        },
        getUid() {
                const user = auth.currentUser;
                return user ? user.uid : null;

        }
    }
}
