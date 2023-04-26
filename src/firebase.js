import firebaseConfig from "./firebase-config";
import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    onAuthStateChanged,
    signInWithPopup,
    signOut
} from "firebase/auth";
import { toggleSignInSignOut } from "./gui";

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInUser = async () => {
    await signInWithPopup(auth, provider);
};

const signOutUser = () => {
    signOut(auth);
};

// On sign in/out
onAuthStateChanged(auth, (user) => {
    toggleSignInSignOut(user);
    if (user) {
        // Signed in
        console.log("Signed in", user);
    } else {
        // Signed out
        console.log("Signed out", user);
    }
});

export { signInUser, signOutUser };
