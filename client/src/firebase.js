// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ems-auth-31a53.firebaseapp.com",
  projectId: "ems-auth-31a53",
  storageBucket: "ems-auth-31a53.appspot.com",
  messagingSenderId: "958562152213",
  appId: "1:958562152213:web:4672410413ae329953831c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
