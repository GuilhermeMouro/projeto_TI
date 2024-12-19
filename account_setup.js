import { auth } from "./firebase_config.js";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut 
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

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
