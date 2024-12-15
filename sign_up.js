// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDi3xI1Gx4s0zezGY-BUa8EUNJkcB1HKHs",
  authDomain: "paper-s-ink.firebaseapp.com",
  projectId: "paper-s-ink",
  storageBucket: "paper-s-ink.firebasestorage.app",
  messagingSenderId: "841014324635",
  appId: "1:841014324635:web:9c8af232bd8ec2f7d0453e",
  measurementId: "G-7S7GF3E4SX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Inicializa o Auth

// Form submission
const submit = document.getElementById('submit');
submit.addEventListener("click", function (event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Validação adicional
  const confirmPassword = document.getElementById('confirm-password').value;
  if (password !== confirmPassword) {
    alert("As senhas não correspondem!");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("Conta criada com sucesso!");
      window.location.href = "index.html"; // Substitua pelo link desejado
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`Erro: ${errorMessage}`);
    });
});
