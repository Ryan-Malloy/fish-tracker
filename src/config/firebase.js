import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword as signIn, signOut as logout } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBSMrzxmFom89rD6XZj9jTObYKiaCAYLjw",
    authDomain: "fish-tracker-f7b65.firebaseapp.com",
    projectId: "fish-tracker-f7b65",
    storageBucket: "fish-tracker-f7b65.appspot.com",
    messagingSenderId: "1058507014154",
    appId: "1:1058507014154:web:223b5e3a3f89d9f9bd9ff3",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export const signInWithEmailAndPassword = async (email, password) => {
    return await signIn(auth, email, password);
};

export const signOut = async () => {
    return await logout(auth);
};

export {
    auth,
    database as db
};
