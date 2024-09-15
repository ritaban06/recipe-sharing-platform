// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAN2mXRvXiFMe_i8_vsv1UCp9HL8UZKEzU",
  authDomain: "cook-book-b9e75.firebaseapp.com",
  projectId: "cook-book-b9e75",
  storageBucket: "cook-book-b9e75.appspot.com",
  messagingSenderId: "43389357181",
  appId: "1:43389357181:web:94b9aae5f47175574d3514",
  measurementId: "G-Y52X75CEE4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };