// fetchBooks.js
import { db } from "./firebase_config.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

async function fetchBooks() {
  try {
    const booksContainer = document.querySelector(".books-container");
    booksContainer.innerHTML = "";

    const booksSnapshot = await getDocs(collection(db, "books"));
    booksSnapshot.forEach((doc) => {
      const book = doc.data();

      const bookDiv = document.createElement("div");
      bookDiv.classList.add("book");

      const bookImage = document.createElement("img");
      bookImage.classList.add("book-image");

      bookImage.src = book.image ? book.image : "img/default-book.jpg";
      bookImage.alt = `Capa de ${book.name}`;

      const bookTitle = document.createElement("h2");
      bookTitle.classList.add("book-title");
      bookTitle.textContent = book.name;

      const bookAuthor = document.createElement("p");
      bookAuthor.classList.add("book-author");
      bookAuthor.textContent = `Autor: ${book.author}`;

      const bookGenres = document.createElement("p");
      bookGenres.classList.add("book-genres");
      bookGenres.textContent = `Gêneros: ${book.genres.join(", ")}`;

      bookDiv.appendChild(bookImage);
      bookDiv.appendChild(bookTitle);
      bookDiv.appendChild(bookAuthor);
      bookDiv.appendChild(bookGenres);

      booksContainer.appendChild(bookDiv);
    });
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
  }
}

window.addEventListener("DOMContentLoaded", fetchBooks);
