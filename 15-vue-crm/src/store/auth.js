import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../firebase.config.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);

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
    }
}
