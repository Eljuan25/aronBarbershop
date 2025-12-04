// src/firebase.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBd7QdEKIeoLJqysuzWtrCbmdZinL8bDgg",
  authDomain: "bro-barber-citas.firebaseapp.com",
  projectId: "bro-barber-citas",
  storageBucket: "bro-barber-citas.firebasestorage.app",
  messagingSenderId: "571473656768",
  appId: "1:571473656768:web:6c2ae781d1f1294ef12625",
  measurementId: "G-R0M5YL53VB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app); 