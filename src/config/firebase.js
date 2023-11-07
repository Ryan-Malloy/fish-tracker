import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithEmailAndPassword as signIn,
	signOut as logout,
} from "firebase/auth";
import { getDatabase } from "firebase/database";
import {
	getStorage,
	ref as storageRef,
	uploadBytes,
	getDownloadURL,
} from "firebase/storage";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);

export const signInWithEmailAndPassword = async (email, password) => {
	return await signIn(auth, email, password);
};

export const signOut = async () => {
	return await logout(auth);
};

export const uploadImage = async (file, filePath) => {
	const storageReference = storageRef(storage, filePath);
	await uploadBytes(storageReference, file);
	return getDownloadURL(storageReference);
};

export const getImageUrl = async (filePath) => {
	const storageReference = storageRef(storage, filePath);
	return getDownloadURL(storageReference);
};

export {
    auth,
    database as db,
    storage
};
