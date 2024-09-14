// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyoB8v7DiEyWfgUUST8WdhFi7OtPD9ScE",
  authDomain: "recipe-41277.firebaseapp.com",
  projectId: "recipe-41277",
  storageBucket: "recipe-41277.appspot.com",
  messagingSenderId: "565878877397",
  appId: "1:565878877397:web:9962f03b2aced6726fc65c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };