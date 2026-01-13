import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyBd7QdEKIeoLJqysuzWtrCbmdZinL8bDgg",
  authDomain: "bro-barber-citas.firebaseapp.com",
  projectId: "bro-barber-citas",
  storageBucket: "bro-barber-citas.firebasestorage.app",
  messagingSenderId: "571473656768",
  appId: "1:571473656768:web:6c2ae781d1f1294ef12625",
  measurementId: "G-R0M5YL53VB"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app); // 👈 ESTO FALTABA
