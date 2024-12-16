import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut 
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

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
const auth = getAuth(app);

const accountMenu = document.getElementById('account-menu');
const accountOptions = document.getElementById('account-options');

onAuthStateChanged(auth, (user) => {
  accountOptions.innerHTML = "";

  if (user) {
    const logoutOption = document.createElement('li');
    logoutOption.innerHTML = '<a href="#" id="logout">Terminar Sessão</a>';
    accountOptions.appendChild(logoutOption);

    document.getElementById('logout').addEventListener('click', (event) => {
      event.preventDefault();
      signOut(auth)
        .then(() => {
          alert("Sessão Terminada");
          window.location.href = "sign_up.html";
        })
        .catch((error) => {
          alert(`Erro ao sair: ${error.message}`);
        });
    });
  } else {
    const signInOption = document.createElement('li');
    signInOption.innerHTML = '<a href="sign_in.html">Iniciar Sessão</a>';
    accountOptions.appendChild(signInOption);
  }
});

const signUpForm = document.getElementById('sign-up-form');
if (signUpForm) {
  signUpForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
      alert("Palavras Passe Não São Iguais");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("Conta Criada Com Sucesso");
        window.location.href = "index.html";
      })
      .catch((error) => {
        alert(`Erro ao Criar Conta: ${error.message}`);
      });
  });
}

const signInForm = document.getElementById('sign-in-form');
if (signInForm) {
  signInForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("Sessão Iniciada Com Sucesso");
        window.location.href = "index.html";
      })
      .catch((error) => {
        alert(`Erro ao Iniciar Sessão: ${error.message}`);
      });
  });
}
