import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCFJo_E3W7E0EYvwA_-pr_24-FD16qfA6s",
  authDomain: "mental-math-app-82de7.firebaseapp.com",
  projectId: "mental-math-app-82de7",
  storageBucket: "mental-math-app-82de7.firebasestorage.app",
  messagingSenderId: "890571182838",
  appId: "1:890571182838:web:bd2c85e1893b5e8f7f12d7",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);