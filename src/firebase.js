import firebaseConfig from "./firebase-config";
import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore";
import { initializeProjectsAndTasks, toggleSignInSignOut } from "./gui";
import { addData, retrieveData } from "./storage";
import { projects } from "./modules";

const app = initializeApp(firebaseConfig);

// AUTHENTICATION
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
        // Clear tasks before fetching
        projects.length = 0;
        readFromFirestore();
    } else {
        // Signed out
        console.log("Signed out", user);
        // reset & retrieve data from localstorage?
        projects.length = 0;
        // addData(null);
        retrieveData();
        initializeProjectsAndTasks();
    }
});

// FIRESTORE
const db = getFirestore(app);

const writeToFirestore = async (data) => {
    const userStorage = doc(db, "todoProjects", auth.currentUser.email);
    try {
        await setDoc(userStorage, data);
    } catch (error) {
        console.error("Error writing to FireStore:", error);
    }
};

const readFromFirestore = async () => {
    const userStorage = doc(db, "todoProjects", auth.currentUser.email);
    const docSnap = await getDoc(userStorage);
    console.log("docsnap:", docSnap);
    let data;
    if (docSnap.data()?.data) {
        data = JSON.parse(docSnap.data().data);
    } else {
        data = null;
    }

    addData(data);
    initializeProjectsAndTasks();
};

const isUserSignedIn = () => {
    return !!auth.currentUser;
};

export { signInUser, signOutUser, writeToFirestore, isUserSignedIn };
