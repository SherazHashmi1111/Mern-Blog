// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getEnv } from "./getEnv";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: getEnv("VITE_FIREBASE_API"),
  authDomain: "mern-blog-86118.firebaseapp.com",
  projectId: "mern-blog-86118",
  storageBucket: "mern-blog-86118.firebasestorage.app",
  messagingSenderId: "902956242734",
  appId: "1:902956242734:web:e939e8af87e7e3bdf70cbf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const  provider = new GoogleAuthProvider();

export { auth, provider };