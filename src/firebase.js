import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAt4jAII_2gNASUGTPfhaISnfTR6bURhOk",
  authDomain: "recipe-85a2a.firebaseapp.com",
  projectId: "recipe-85a2a",
  storageBucket: "recipe-85a2a.appspot.com",
  messagingSenderId: "944055927740",
  appId: "1:944055927740:web:397159d4c89b9bbb9421b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
