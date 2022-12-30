// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7m2XPnY2BNSVVUC4toQP2Wp4CLKAQnnM",
  authDomain: "chatyuk-6cd94.firebaseapp.com",
  projectId: "chatyuk-6cd94",
  storageBucket: "chatyuk-6cd94.appspot.com",
  messagingSenderId: "214535286852",
  appId: "1:214535286852:web:432e00e6f191c651264c11"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();