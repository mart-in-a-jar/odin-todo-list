import firebaseConfig from "./firebase-config";
import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    onAuthStateChanged,
    signInWithPopup,
    signInWithRedirect,
} from "firebase/auth";

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signIn = async () => {
    await signInWithPopup(auth, provider);
};

const signOut = () => {
    signOut(auth);
};

// On sign in/out
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Signed in
        console.log("Signed in", user);
    } else {
        // Signed out
        console.log("Signed out", user);
    }
});

export { signIn, signOut };
