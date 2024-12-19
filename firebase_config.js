import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDi3xI1Gx4s0zezGY-BUa8EUNJkcB1HKHs",
  authDomain: "paper-s-ink.firebaseapp.com",
  projectId: "paper-s-ink",
  storageBucket: "paper-s-ink.firebasestorage.app",
  messagingSenderId: "841014324635",
  appId: "1:841014324635:web:9c8af232bd8ec2f7d0453e",
  measurementId: "G-7S7GF3E4SX"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
